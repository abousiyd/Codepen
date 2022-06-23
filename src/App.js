import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import Settings from "./components/Settings";
import Skypack from "./components/Skypack";

const App = () => {
  const [active, setActive] = useState(false);
  const [activeSkypack, setActiveSkypack] = useState(false);
  const [download, setDownload] = useState(false);

  const [editorOptions, setEditorOptions] = useState({
    fontSize: 14,
    minimap: {
      enabled: true,
    },
    lineNumbers: "on",
    theme: "vs-dark",
  });

  const handleOnOptionsChanged = (options) => {
    setEditorOptions(options);
  };

  const toggle = () => {
    setActive(!active);
  };

  const toggleSkypack = () => {
    setActiveSkypack(!activeSkypack);
  };

  const handleDownload = () => {
    setDownload(true);
  };

  return (
    <div className="app">
      <Sidebar
        toggle={toggle}
        toggleSkypack={toggleSkypack}
        download={handleDownload}
      />

      <Modal active={active} toggle={toggle}>
        <Settings
          editorOptions={editorOptions}
          handleOnOptionsChanged={handleOnOptionsChanged}
        />
      </Modal>

      <Dashboard
        editorOptions={editorOptions}
        download={download}
        setDownload={setDownload}
      />
    </div>
  );
};

export default App;
