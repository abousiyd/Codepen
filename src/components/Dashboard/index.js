import React, { useState, useEffect } from "react";
import Split from "react-split-grid";
import Editor from "@monaco-editor/react";
import { decode } from "js-base64";
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import JSZip from "jszip";
import useDebounce from "../../hooks/useDebounce";
import { FILE_NAME, EXTENSIONS, DEFAULT_VALUES } from "../../constants";

import "../../App.css";
import "./SplitGrid.css";

const Dashboard = ({ editorOptions, download, setDownload }) => {
  // const [_, setIsEditorReady] = useState(false);
  const [editorValues, setEditorValues] = useState({
    html: DEFAULT_VALUES.html,
    js: DEFAULT_VALUES.js,
    css: DEFAULT_VALUES.css,
  });

  useDebounce(editorValues, 5000);

  useEffect(() => {
    if (download) {
      downloadFiles();
      setDownload(false);
    }
  }, [download]);

  useEffect(() => {
    const { pathname } = window.location;

    if (pathname && pathname.trim() !== "/") {
      const [html, css, js] = pathname.slice(1).split("%7C");

      setEditorValues({
        html: decode(html),
        css: decode(css),
        js: decode(js),
      });
    }
  }, []);

  const handleHtmlChange = (html) => {
    setEditorValues({
      ...editorValues,
      html,
    });
  };

  const handleCsslChange = (css) => {
    setEditorValues({
      ...editorValues,
      css,
    });
  };
  const handleJslChange = (js) => {
    setEditorValues({
      ...editorValues,
      js,
    });
  };

  const handleEditorDidMount = () => {
    emmetHTML(window.monaco);
    emmetCSS(window.monaco);
    // setIsEditorReady(true);
  };

  const createCodeFile = (content, extension) => {
    const name = `${FILE_NAME[extension]}.${extension}`;
    return new window.File([content], name);
  };

  const getZip = (files) => {
    const zip = new JSZip();

    for (const file of files) {
      const filename = file.name;
      zip.file(filename, file);
    }

    return zip;
  };

  const downloadZip = (zip) => {
    zip.generateAsync({ type: "blob" }).then((blobdata) => {
      const zipblob = new window.Blob([blobdata]);
      const elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(zipblob);
      elem.download = "codi-link.zip";
      elem.click();
    });
  };

  const downloadFiles = () => {
    const files = EXTENSIONS.map((extension) => {
      let content = editorValues[extension];

      if (extension === "html") {
        content = `
        <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <link rel="stylesheet" href="styles.css">
            <title>Codepen</title>
          </head>
          <body>${editorValues.html}</body>
          <script src="main.js"></script>
        </html>
        `;
      }

      return createCodeFile(content, extension);
    });

    const zip = getZip(files);
    downloadZip(zip);
  };

  const renderPreview = `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>JS Bin</title>
        <style>${editorValues.css}</style>
        
      </head>
      <body>${editorValues.html}</body>
      <script>${editorValues.js}</script>

    </html>
    `;

  return (
    <div className="dashboard">
      <Split
        render={({ getGridProps, getGutterProps }) => (
          <div className="grid" {...getGridProps()}>
            <div>
              <Editor
                className="editor html"
                height="100%"
                defaultValue={editorValues.html}
                defaultLanguage="html"
                onMount={handleEditorDidMount}
                language="html"
                theme="vs-dark"
                onChange={handleHtmlChange}
                options={editorOptions}
              />
            </div>

            <div>
              <Editor
                className="editor js"
                height="100%"
                defaultValue={editorValues.js}
                defaultLanguage="javascript"
                theme="vs-dark"
                onChange={handleJslChange}
                options={editorOptions}
              />
            </div>
            <div>
              <Editor
                className="editor css"
                height="100%"
                defaultValue={editorValues.css}
                defaultLanguage="css"
                theme="vs-dark"
                onChange={handleCsslChange}
                options={editorOptions}
              />
            </div>

            <div className="vertical-gutter" {...getGutterProps("column", 1)} />

            <div className="horizontal-gutter" {...getGutterProps("row", 1)} />
            <div>
              <iframe id="iframe" className="download" srcdoc={renderPreview} />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Dashboard;
