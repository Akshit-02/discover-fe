import { ImageResponse } from "next/og";
import { blogPosts, getPost } from "@/content/blog";

export const alt = "Kudozz Influencer Discovery blog article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default function BlogOgImage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const title = post?.title ?? "Kudozz Influencer Discovery";

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
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#202124" />
            <rect x="8.5" y="7" width="3.75" height="18" rx="0.75" fill="#FFF7F1" />
            <polygon points="13.75,15.25 21.25,7.75 23.5,7.75 16,15.25" fill="#F36B4A" />
            <polygon points="13.75,16.75 21.25,24.25 23.5,24.25 16,16.75" fill="#F36B4A" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 700 }}>Kudozz</span>
            <span style={{ fontSize: 18, color: "#55565C" }}>Influencer Discovery · Blog</span>
          </div>
        </div>
        <span style={{ fontSize: title.length > 70 ? 54 : 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</span>
        <span style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#B93B1D" }}>{post?.category ?? "Guides"} · discover.kudozz.in/blog</span>
      </div>
    ),
    size,
  );
}
