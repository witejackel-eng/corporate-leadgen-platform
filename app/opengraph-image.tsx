import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE_CONFIG.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #fbfaf8 0%, #f2ede5 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#16150f",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#16150f" }}>{SITE_CONFIG.name}</span>
        </div>
        <div style={{ display: "flex", marginTop: 48 }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#16150f", lineHeight: 1.2, maxWidth: 900 }}>
            {SITE_CONFIG.tagline}
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 32 }}>
          <span style={{ fontSize: 24, color: "#4a473e" }}>meridian.io</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
