import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OUTILS, type Outil } from "./outils";
import { PROFILS_FICTIFS } from "./profils";

export type Acces = {
  code: string;
  nom: string;
  role: "admin" | "testeur";
  profession?: string;
  outils?: string[];
  expire?: string;
};

/** Ce que l'on affiche : soi-même, ou un profil fictif (« voir en tant que »). */
export type Vue = {
  utilisateur: Acces;
  role: "admin" | "testeur";
  profession?: string;
  outils: string[];
  simulation?: string; // libellé du profil simulé
};

const COOKIE_SESSION = "resolvia_session";
export const COOKIE_VUE = "resolvia_vue";

function secret() {
  const s = process.env.RESOLVIA_SECRET;
  if (!s || s.length < 16) throw new Error("RESOLVIA_SECRET manquant ou trop court.");
  return s;
}

export function listeAcces(): Acces[] {
  try {
    const brut = JSON.parse(process.env.RESOLVIA_ACCES || "[]");
    return Array.isArray(brut) ? (brut as Acces[]) : [];
  } catch {
    console.error("RESOLVIA_ACCES n'est pas un JSON valide.");
    return [];
  }
}

function estExpire(a: Acces) {
  if (!a.expire) return false;
  return new Date(a.expire + "T23:59:59") < new Date();
}

export function trouverAcces(code: string): Acces | undefined {
  const propre = code.trim();
  if (!propre) return undefined;
  return listeAcces().find((a) => a.code === propre && !estExpire(a));
}

function signer(valeur: string) {
  return createHmac("sha256", secret()).update(valeur).digest("base64url");
}

export function jetonSession(code: string) {
  const v = Buffer.from(code).toString("base64url");
  return `${v}.${signer(v)}`;
}

function lireJeton(jeton: string | undefined): string | undefined {
  if (!jeton) return undefined;
  const [v, sig] = jeton.split(".");
  if (!v || !sig) return undefined;
  const attendu = Buffer.from(signer(v));
  const recu = Buffer.from(sig);
  if (attendu.length !== recu.length || !timingSafeEqual(attendu, recu)) return undefined;
  return Buffer.from(v, "base64url").toString();
}

export const OPTIONS_COOKIE = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 14, // 14 jours
};

export { COOKIE_SESSION };

/** Utilisateur connecté (le code est revérifié à chaque visite : supprimer un code révoque l'accès). */
export async function utilisateurCourant(): Promise<Acces | undefined> {
  const jar = await cookies();
  const code = lireJeton(jar.get(COOKIE_SESSION)?.value);
  return code ? trouverAcces(code) : undefined;
}

export async function exigerVue(): Promise<Vue> {
  const utilisateur = await utilisateurCourant();
  if (!utilisateur) redirect("/connexion");

  if (utilisateur.role === "admin") {
    const jar = await cookies();
    const profil = PROFILS_FICTIFS.find((p) => p.id === jar.get(COOKIE_VUE)?.value);
    if (profil) {
      return {
        utilisateur,
        role: "testeur",
        profession: profil.profession,
        outils: ["*"],
        simulation: profil.libelle,
      };
    }
    return { utilisateur, role: "admin", outils: ["*"] };
  }

  return {
    utilisateur,
    role: "testeur",
    profession: utilisateur.profession,
    outils: utilisateur.outils ?? [],
  };
}

export async function exigerAdmin() {
  const vue = await exigerVue();
  if (vue.utilisateur.role !== "admin") redirect("/");
  return vue;
}

/** Règle de visibilité : l'admin voit tout ; un testeur voit les outils ouverts qui lui sont attribués. */
export function peutVoir(vue: Vue, outil: Outil) {
  if (vue.role === "admin") return true;
  if (outil.rubrique === "pilotage") return false; // toujours privé
  const ouvert = outil.statut === "testeurs" || outil.statut === "public";
  const attribue = vue.outils.includes("*") || vue.outils.includes(outil.id);
  return ouvert && attribue;
}

export function outilsVisibles(vue: Vue) {
  return OUTILS.filter((o) => peutVoir(vue, o));
}
