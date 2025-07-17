import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { EditorState, LexicalEditor } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot } from "lexical";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function parseHtmlToEditor(html: string, editor: LexicalEditor) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");

  editor.update(() => {
    const nodes = $generateNodesFromDOM(editor, dom);
    $getRoot().clear().append(...nodes);
  });
}


export function convertEditorStateToHtml(editorState: EditorState, editor: LexicalEditor): string {
  let html = "";
  editorState.read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });
  return html;
}
