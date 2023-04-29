import { xml } from "@codemirror/lang-xml";
import { getSVGAndColorsState } from "~/svg_checkers_transformers";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

const styleTheme = EditorView.baseTheme({
  ".cm-content": {
    flexShrink: 1,
    whiteSpace: "pre-wrap",
  },
  "&.cm-editor.cm-focused": {
    outline: "0px"
  }
});

const bbedit = createTheme({
  theme: 'light',
  settings: {
    background: '#FFFFFF',
    foreground: '#000000',
    // caret: '#FBAC52',
    caret: '#228be6',
    selection: '#FFD420',
    selectionMatch: '#FFD420',
    // gutterBackground: '#f5f5f5',
    gutterBackground: 'rgb(234, 238, 240)',
    gutterForeground: '#313131',
    lineHighlight: '#00000012',
    gutterActiveForeground: 'rgb(0,0,224)',
  },
  styles: [
    { tag: [t.meta, t.comment], color: '#804000' },
    { tag: [t.keyword, t.strong], color: '#0000FF' },
    { tag: [t.number], color: '#FF0080' },
    { tag: [t.string], color: '#FF0080' },
    { tag: [t.variableName], color: '#006600' },
    { tag: [t.escape], color: '#33CC33' },
    // { tag: [t.tagName], color: '#1C02FF' },
    { tag: [t.tagName], color: '#0074e5' },
    { tag: [t.heading], color: '#0C07FF' },
    { tag: [t.quote], color: '#000000' },
    { tag: [t.list], color: '#B90690' },
    { tag: [t.documentMeta], color: '#888888' },
    { tag: [t.function(t.variableName)], color: '#0000A2' },
    { tag: [t.definition(t.typeName), t.typeName], color: '#6D79DE' },
  ],
});

export default function CodeMirrorEditorTabPanel({ state, setState, isColorFindingEnabled }) {
  return (
    <>
      <CodeMirror
        autoFocus={true} // TODO: doesn't work
        placeholder='Write SVG...'
        height={'70vh'}
        width={'45vw'}
        extensions={[styleTheme, xml()]}
        value={state.svg}
        onChange={(value, viewUpdate) => {
          // TODO: updates SVG with /r/n -> /n. Causes new history pointer!
          if (viewUpdate.flags !== 0) {
            setState(getSVGAndColorsState(value, isColorFindingEnabled))
          }
        }}
        theme={bbedit}
      />
    </>)
}
