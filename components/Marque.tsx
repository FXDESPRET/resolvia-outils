import Link from "next/link";

export default function Marque({ lien = true }: { lien?: boolean }) {
  const contenu = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" width={40} height={40} />
      <span>
        Resolvia
        <small>Espace outils</small>
      </span>
    </>
  );
  return lien ? (
    <Link href="/" className="marque">{contenu}</Link>
  ) : (
    <span className="marque">{contenu}</span>
  );
}
