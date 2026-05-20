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

  const runCommand = (command: string, valueArg?: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    execCommand(command, valueArg);
    onChange(sanitizeRichTextHtml(editorRef.current.innerHTML));
  };

  const applyLink = () => {
    const raw = window.prompt("Nhập URL liên kết (ví dụ: https://example.com)");
    if (raw === null) return;
    const url = raw.trim();
    if (!url) {
      runCommand("unlink");
      return;
    }
    const hasScheme = /^https?:\/\//i.test(url);
    runCommand("createLink", hasScheme ? url : `https://${url}`);
  };

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-1 rounded-t-lg border border-slate-300 bg-slate-50 p-2">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("undo")} className="rounded border border-slate-300 px-2 py-1 text-xs">Undo</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("redo")} className="rounded border border-slate-300 px-2 py-1 text-xs">Redo</button>
        <span className="mx-1 h-7 w-px bg-slate-300" />
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("bold")} className="rounded border border-slate-300 px-2 py-1 text-xs font-bold">B</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("italic")} className="rounded border border-slate-300 px-2 py-1 text-xs italic">I</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("underline")} className="rounded border border-slate-300 px-2 py-1 text-xs underline">U</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("strikeThrough")} className="rounded border border-slate-300 px-2 py-1 text-xs line-through">S</button>
        <span className="mx-1 h-7 w-px bg-slate-300" />
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "<p>")} className="rounded border border-slate-300 px-2 py-1 text-xs">P</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "<h2>")} className="rounded border border-slate-300 px-2 py-1 text-xs">H2</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "<h3>")} className="rounded border border-slate-300 px-2 py-1 text-xs">H3</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("formatBlock", "<blockquote>")} className="rounded border border-slate-300 px-2 py-1 text-xs">Quote</button>
        <span className="mx-1 h-7 w-px bg-slate-300" />
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertUnorderedList")} className="rounded border border-slate-300 px-2 py-1 text-xs">Bullets</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("insertOrderedList")} className="rounded border border-slate-300 px-2 py-1 text-xs">1.</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("outdent")} className="rounded border border-slate-300 px-2 py-1 text-xs">Outdent</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("indent")} className="rounded border border-slate-300 px-2 py-1 text-xs">Indent</button>
        <span className="mx-1 h-7 w-px bg-slate-300" />
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("justifyLeft")} className="rounded border border-slate-300 px-2 py-1 text-xs">Trái</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("justifyCenter")} className="rounded border border-slate-300 px-2 py-1 text-xs">Giữa</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("justifyRight")} className="rounded border border-slate-300 px-2 py-1 text-xs">Phải</button>
        <span className="mx-1 h-7 w-px bg-slate-300" />
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={applyLink} className="rounded border border-slate-300 px-2 py-1 text-xs">Link</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("unlink")} className="rounded border border-slate-300 px-2 py-1 text-xs">Unlink</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => runCommand("removeFormat")} className="rounded border border-slate-300 px-2 py-1 text-xs">Xóa format</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={(event) => onChange(sanitizeRichTextHtml(event.currentTarget.innerHTML))}
        className="rich-text-editor min-h-56 rounded-b-lg border border-t-0 border-slate-300 bg-white px-3 py-3"
      />
    </div>
  );
}
