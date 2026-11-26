import { ImageResponse } from "next/og";

export const alt = "Kudozz Influencer Discovery — search Instagram creators in India by niche, followers, location, language and engagement";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["Niche", "Followers", "City & state", "Language", "Engagement rate"];

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
          padding: "64px 72px",
          background: "linear-gradient(135deg, #FFF7F1 0%, #FDE2D9 100%)",
          color: "#202124",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#202124" />
            <rect x="8.5" y="7" width="3.75" height="18" rx="0.75" fill="#FFF7F1" />
            <polygon points="13.75,15.25 21.25,7.75 23.5,7.75 16,15.25" fill="#F36B4A" />
            <polygon points="13.75,16.75 21.25,24.25 23.5,24.25 16,16.75" fill="#F36B4A" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 36, fontWeight: 700 }}>Kudozz</span>
            <span style={{ fontSize: 20, color: "#55565C" }}>Influencer Discovery</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>
            India&apos;s No. 1 Influencer Discovery Tool
          </span>
          <span style={{ fontSize: 30, color: "#55565C" }}>Search Instagram creators for your brand.</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {chips.map((c) => (
            <span
              key={c}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                background: "#FFFFFF",
                border: "2px solid #FAC3B2",
                fontSize: 22,
                fontWeight: 600,
                color: "#B93B1D",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
