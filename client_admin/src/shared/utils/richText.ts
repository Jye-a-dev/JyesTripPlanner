const RICH_TEXT_FIELDS = new Set(["description", "note", "content", "reason", "setting_value"]);

export function isRichTextField(fieldName: string) {
  return RICH_TEXT_FIELDS.has(fieldName);
}

export function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function sanitizeRichTextHtml(html: string) {
  let safe = html;
  safe = safe.replace(/<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, "");
  safe = safe.replace(/\son\w+="[^"]*"/gi, "");
  safe = safe.replace(/\son\w+='[^']*'/gi, "");
  safe = safe.replace(/\son\w+=\S+/gi, "");
  safe = safe.replace(/javascript:/gi, "");
  return safe.trim();
}

export function toEditorValue(raw: string, fieldName: string) {
  if (!isRichTextField(fieldName)) return raw;
  if (looksLikeHtml(raw)) return raw;
  const trimmed = raw.trim();
  if (!trimmed) return "";
  return trimmed
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .map((line) => `<p>${line}</p>`)
    .join("");
}

export function toPlainText(raw: string) {
  return raw
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
