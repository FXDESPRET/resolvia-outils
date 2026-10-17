"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  COOKIE_SESSION,
  COOKIE_VUE,
  OPTIONS_COOKIE,
  jetonSession,
  trouverAcces,
  utilisateurCourant,
} from "./acces";
import { PROFILS_FICTIFS } from "./profils";

export type EtatConnexion = { erreur?: string };

export async function seConnecter(_: EtatConnexion, form: FormData): Promise<EtatConnexion> {
  const code = String(form.get("code") ?? "");
  const acces = trouverAcces(code);
  if (!acces) {
    // Petite temporisation pour décourager les essais en série.
    await new Promise((r) => setTimeout(r, 800));
    return { erreur: "Ce code d'accès n'est pas reconnu ou n'est plus valable." };
  }
  const jar = await cookies();
  jar.set(COOKIE_SESSION, jetonSession(acces.code), OPTIONS_COOKIE);
  jar.delete(COOKIE_VUE);
  redirect("/");
}

export async function seDeconnecter() {
  const jar = await cookies();
  jar.delete(COOKIE_SESSION);
  jar.delete(COOKIE_VUE);
  redirect("/connexion");
}

export async function voirEnTantQue(form: FormData) {
  const utilisateur = await utilisateurCourant();
  if (utilisateur?.role !== "admin") redirect("/");
  const id = String(form.get("profil") ?? "");
  const jar = await cookies();
  if (PROFILS_FICTIFS.some((p) => p.id === id)) {
    jar.set(COOKIE_VUE, id, OPTIONS_COOKIE);
    redirect("/");
  }
  jar.delete(COOKIE_VUE);
  redirect("/admin");
}
