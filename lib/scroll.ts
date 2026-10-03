/**
 * Fait défiler jusqu'à une ancre en respectant `scroll-margin-top` (défini dans globals.css)
 * et la préférence de mouvement réduit. Retourne false si la cible n'existe pas.
 */
export function scrollToHash(hash: string): boolean {
  const id = hash.replace(/^#/, "");
  const target = document.getElementById(id);
  if (!target) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}
