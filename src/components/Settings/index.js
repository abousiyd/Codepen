import React, { useState,useEffect } from 'react'


const Settings = ({editorOptions: options, handleOnOptionsChanged}) => {

  const [editorOptions, setEditorOptions] = useState(options)

  useEffect(() => {
    handleOnOptionsChanged(editorOptions)
    }, [editorOptions])

  const handleOnchange = (e) => {
    if(e.target.name === 'minimap') {
      setEditorOptions({
        ...editorOptions,
        minimap: {
          enabled: e.target.checked
        } 
      })} 
      if(e.target.name === 'fontSize') {
        setEditorOptions({
          ...editorOptions,
          [e.target.name] : e.target.value
        })}
      if(e.target.name === 'lineNumbers') {
        setEditorOptions({
          ...editorOptions,
          lineNumbers: e.target.checked ? 'on' : 'off'
        })}
      if(e.target.name === 'theme') {
        setEditorOptions({
          ...editorOptions,
          theme: e.target.value
        })}
    }

  return (
    <form className="app">
          <h3>Settings </h3>
          <div>
            <label>Font Size </label>
            <input type="number" onChange={handleOnchange} name="fontSize" />
            <br />

            <label>Minimap </label>
            <input onChange={handleOnchange} type="checkbox" name="minimap" checked={editorOptions.minimap.enabled === true } />
            <br />

            <label>Line number </label>
            <input onChange={handleOnchange} type="checkbox" name="lineNumbers" checked={editorOptions.lineNumbers === 'on' } />
            <br />
            
            <label>Themes </label>
            <select name="theme"  onChange={handleOnchange} value={editorOptions.theme}>
              <option selected value="vs-dark">Visual Studio Dark</option>
              <option value="light">Visual Studio Light</option>
            </select>
          </div>
    </form>
  );
};

export default Settings;
