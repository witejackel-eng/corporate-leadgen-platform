import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes rich-text HTML (blog posts, case study bodies) before it is
 * persisted or rendered with `dangerouslySetInnerHTML`. The Tiptap editor's
 * own UI only ever produces a safe subset of HTML, but the server action
 * receives a plain string over the wire — this is the actual trust
 * boundary, not the editor UI, so it must be enforced here regardless of
 * what produced the string.
 */
export function sanitizeRichText(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "u", "s", "code", "pre",
      "h1", "h2", "h3", "h4",
      "ul", "ol", "li",
      "blockquote", "a", "img", "hr", "span",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel", "class"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });
}

/** Escapes plain text for safe interpolation into an HTML email template. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
