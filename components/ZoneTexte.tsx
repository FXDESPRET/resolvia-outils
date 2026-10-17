"use client";

import { useLayoutEffect, useRef } from "react";

/** Zone de texte qui s'agrandit avec son contenu (et s'imprime en entier). */
export default function ZoneTexte({
  value,
  onChange,
  placeholder,
  lignes = 3,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  lignes?: number;
  id?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return (
    <textarea
      id={id}
      ref={ref}
      className="zone-texte"
      rows={lignes}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
