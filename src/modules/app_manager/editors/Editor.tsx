import React, { useState } from "react";
import JoditEditor from "jodit-react";
import "jodit/build/jodit.min.js";
import { Box, Typography } from "@material-ui/core";

interface Props {
  // fetchData: () => void;
  value: string;
  updateContent(content: string): void;
  data: string;
}

const Editor: React.FC<Props> = (props) => {
  const { value, data, updateContent } = props;
  const editor = React.useRef(null);
  const [content, setContent] = useState(data);

  const config: any = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    triggerChangeEvent: true,
    height: 220,
    direction: "ltr",
    language: "en",
    debugLanguage: false,
    i18n: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colorPickerDefaultTab: "background",
    imageDefaultWidth: 100,
    removeButtons: [
      "source",
      "fullsize",
      "about",
      "outdent",
      "indent",
      "video",
      "print",
      "table",
      "fontsize",
      "superscript",
      "subscript",
      "file",
      "cut",
      "selectall",
    ],
    disablePlugins: ["paste", "stat"],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "",
    showXPathInStatusbar: false,
  };
  return (
    <>
      <Box style={{ marginBottom: 20 }}>
        <Typography variant="body2" style={{ marginBottom: 8 }}>
          {value}
        </Typography>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          onBlur={(newContent) => {
            setContent(newContent);
            updateContent(newContent);
          }} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </Box>
    </>
  );
};

export default Editor;
function updateContent(newContent: string) {
  throw new Error("Function not implemented.");
}
