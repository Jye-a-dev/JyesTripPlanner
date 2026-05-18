import { useEffect, useRef } from "react";
import { sanitizeRichTextHtml } from "../utils/richText";

function execCommand(command: string, value?: string) {
  document.execCommand(command, false, value);
}

export default function RichTextEditor({
  value,
  placeholder = "Nhập nội dung...",
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-1 rounded-t-lg border border-slate-300 bg-slate-50 p-2">
        <button type="button" onClick={() => execCommand("bold")} className="rounded border border-slate-300 px-2 py-1 text-xs">B</button>
        <button type="button" onClick={() => execCommand("italic")} className="rounded border border-slate-300 px-2 py-1 text-xs italic">I</button>
        <button type="button" onClick={() => execCommand("underline")} className="rounded border border-slate-300 px-2 py-1 text-xs underline">U</button>
        <button type="button" onClick={() => execCommand("insertUnorderedList")} className="rounded border border-slate-300 px-2 py-1 text-xs">List</button>
        <button type="button" onClick={() => execCommand("insertOrderedList")} className="rounded border border-slate-300 px-2 py-1 text-xs">1.</button>
        <button type="button" onClick={() => execCommand("justifyLeft")} className="rounded border border-slate-300 px-2 py-1 text-xs">Trai</button>
        <button type="button" onClick={() => execCommand("justifyCenter")} className="rounded border border-slate-300 px-2 py-1 text-xs">Giua</button>
        <button type="button" onClick={() => execCommand("justifyRight")} className="rounded border border-slate-300 px-2 py-1 text-xs">Phai</button>
        <button type="button" onClick={() => execCommand("formatBlock", "<h2>")} className="rounded border border-slate-300 px-2 py-1 text-xs">H2</button>
        <button type="button" onClick={() => execCommand("removeFormat")} className="rounded border border-slate-300 px-2 py-1 text-xs">Xoa format</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={(event) => onChange(sanitizeRichTextHtml(event.currentTarget.innerHTML))}
        className="rich-text-editor min-h-40 rounded-b-lg border border-t-0 border-slate-300 bg-white px-3 py-2"
      />
    </div>
  );
}
