import { useEffect, useRef } from "react";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ParagraphNode, TextNode } from "lexical";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { convertEditorStateToHtml, parseHtmlToEditor } from "@/lib/utils";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [HeadingNode, ParagraphNode, TextNode, QuoteNode],
  onError: (error: Error) => {
    console.error(error);
  },
};

export function ProductEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="bg-background w-full overflow-hidden rounded-lg border">
      <LexicalComposer initialConfig={editorConfig}>
        <TooltipProvider>
          <Plugins initValue={value} onChange={onChange} />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

const placeholder = "Nhập mô tả sản phẩm...";

export function Plugins({
  initValue,
  onChange,
}: {
  initValue?: string;
  onChange?: (value: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (initValue && !isInitialized.current) {
      try {
        parseHtmlToEditor(initValue, editor);
        isInitialized.current = true;
      } catch (e) {
        console.error("parse error", e);
      }
    } 
    if(!initValue) {
     parseHtmlToEditor("", editor);
    }
  }, [initValue, editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const html = convertEditorStateToHtml(editorState, editor);
      if (html !== initValue) {
        onChange?.(html);
      }
    });
  }, [editor, onChange, initValue]);

  return (
    <div className="relative">
      {/* Toolbar plugins */}
      <ToolbarPlugin>
        {() => (
          <div className="vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1">
            <HistoryToolbarPlugin />
            <FontFormatToolbarPlugin format="bold" />
            <FontFormatToolbarPlugin format="italic" />
            <FontFormatToolbarPlugin format="underline" />
          </div>
        )}
      </ToolbarPlugin>

      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="">
                <ContentEditable
                  placeholder={placeholder}
                  className="ContentEditable__root relative block h-72 min-h-72 overflow-auto px-8 py-4 focus:outline-none"
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </div>
    </div>
  );
}
