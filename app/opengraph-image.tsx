import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Legal Growth System, système de croissance digitale pour cabinets d'avocats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#F3EEE3",
          background: "linear-gradient(135deg, #07090D 0%, #0A1424 60%, #102039 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, letterSpacing: 6, color: "#C6A86C" }}>
          <div style={{ display: "flex", width: 44, height: 1, background: "#C6A86C" }} />
          LEGAL GROWTH SYSTEM
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.04, fontFamily: "serif" }}>
          <span>Le prochain dossier commence</span>
          <span style={{ color: "#E2CE9E" }}>bien avant le premier appel.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8E97A8" }}>
          Développer la visibilité et l&apos;acquisition des cabinets d&apos;avocats
        </div>
      </div>
    ),
    size,
  );
}
