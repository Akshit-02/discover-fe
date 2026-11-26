import Link from "next/link";
import type { BlogBlock, InlineLink } from "@/content/blog";
import BlogCta from "./BlogCta";
import CopyButton from "./CopyButton";

const linkClass =
  "font-medium text-charcoal underline decoration-coral decoration-2 underline-offset-[3px] transition-colors hover:text-coral-700";

/** Turns the first occurrence of each link's text into an anchor. Internal hrefs use next/link. */
function withLinks(text: string, links: InlineLink[] = []) {
  const parts: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  const ordered = links
    .map((l) => ({ ...l, at: text.indexOf(l.text) }))
    .filter((l) => l.at >= 0)
    .sort((a, b) => a.at - b.at);

  for (const l of ordered) {
    const i = rest.indexOf(l.text);
    if (i < 0) continue;
    parts.push(rest.slice(0, i));
    parts.push(
      l.href.startsWith("/") ? (
        <Link key={key++} href={l.href} className={linkClass} data-cta={l.href === "/signup" ? "signup-blog-inline" : undefined}>
          {l.text}
        </Link>
      ) : (
        <a key={key++} href={l.href} target="_blank" rel="noopener" className={linkClass}>
          {l.text}
        </a>
      ),
    );
    rest = rest.slice(i + l.text.length);
  }
  parts.push(rest);
  return parts;
}

const ArticleBody = ({ blocks, slug }: { blocks: BlogBlock[]; slug: string }) => (
  <div className="space-y-6 text-[17px] leading-[1.75] text-charcoal-700">
    {blocks.map((b, i) => {
      switch (b.type) {
        case "paragraph":
          return <p key={i}>{withLinks(b.text, b.links)}</p>;
        case "heading":
          return (
            <h2
              key={i}
              id={b.id}
              className="scroll-mt-24 pt-6 font-display text-[28px] font-medium leading-[1.15] tracking-[-0.015em] text-charcoal sm:text-[32px]"
            >
              {b.text}
            </h2>
          );
        case "subheading":
          return (
            <h3 key={i} className="pt-2 text-[19px] font-bold leading-snug text-charcoal">
              {b.text}
            </h3>
          );
        case "list": {
          const Tag = b.ordered ? "ol" : "ul";
          return (
            <Tag key={i} className={b.ordered ? "list-decimal space-y-2.5 pl-6 marker:font-semibold marker:text-coral-700" : "list-disc space-y-2.5 pl-6 marker:text-coral-500"}>
              {b.items.map((item, j) => (
                <li key={j} className="pl-1">
                  {item}
                </li>
              ))}
            </Tag>
          );
        }
        case "table":
          return (
            <div key={i} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl text-left text-[14.5px] leading-relaxed shadow-soft">
                <thead className="bg-charcoal text-white">
                  <tr>
                    {b.headers.map((h, j) => (
                      <th key={j} scope="col" className="px-4 py-3 font-semibold">
                        {h || <span className="sr-only">Item</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {b.rows.map((row, j) => (
                    <tr key={j} className="border-t border-sand-200 align-top">
                      {row.map((cell, k) =>
                        k === 0 ? (
                          <th key={k} scope="row" className="px-4 py-3 font-semibold text-charcoal">
                            {cell}
                          </th>
                        ) : (
                          <td key={k} className="px-4 py-3 text-charcoal-600">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        case "template":
          return (
            <figure key={i} className="overflow-hidden rounded-2xl border border-sand-300 bg-sand-50">
              <figcaption className="flex items-center justify-between gap-3 border-b border-sand-300 bg-white px-4 py-2.5">
                <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-charcoal-500">{b.label ?? "Template"}</span>
                <CopyButton text={b.text} />
              </figcaption>
              <pre className="max-h-[640px] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[13.5px] leading-relaxed text-charcoal-700">
                {b.text}
              </pre>
            </figure>
          );
        case "cta":
          return (
            <div key={i} className="py-2">
              <BlogCta headline={b.headline} body={b.body} ctaLabel={b.ctaLabel} cta={`signup-blog-mid-${slug}`} />
            </div>
          );
      }
    })}
  </div>
);

export default ArticleBody;
