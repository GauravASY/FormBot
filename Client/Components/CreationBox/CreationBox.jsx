import React, { useState } from "react";
import axios from 'axios'
import "./CreationBox.css";
import { useTheme } from "../../Utility/ThemeContext";

function CreationBox({ refer, boxType, fetchWorkspace, setBoxVisible, mySpace, token }) {
  const { theme } = useTheme();
  const [name, setName] = useState("");

  async function handleCreateFolder() {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/createfolder`,
      { accountId: mySpace, name: name },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data.success) {
      fetchWorkspace();
    }
    else{
      console.log(data);
    }
  }

  async function handleCreateForm(){
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/createform`,
      { accountId: mySpace, name: name },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data.success) {
      fetchWorkspace();
    }
  }

  function handleDone(){
        if(boxType === 'Folder'){
            handleCreateFolder();
            setBoxVisible(false);
        }
        else if(boxType === 'Form'){
            handleCreateForm();
            setBoxVisible(false);
        }
        else{
            //
        }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px 20px",
        border: "grey solid thin",
        borderRadius: "1.5rem",
        position: "absolute",
        height: "170px",
        width: "400px",
        justifyContent: "space-between",
        left: "33%",
      }}
      ref={refer}
      className={`${theme}`}
    >
      <h1 className="heading">Create New {boxType}</h1>
      <input
        className={`input ${theme}`}
        type="text"
        placeholder={`Enter ${boxType} Name`}
        style={
          theme === "Dark"
            ? { fontSize: "1.1rem", backgroundColor: "#1F1F23" }
            : { fontSize: "1.1rem" }
        }
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            color: "#1A5FFF",
            borderRight: "solid grey thin",
          }}
          className={`${theme} boxbutton`}
          onClick={handleDone}
        >
          Done
        </button>
        <button className={`${theme} boxbutton`} onClick={()=> setBoxVisible(false)}>Cancel</button>
      </div>
    </div>
  );
}

export default CreationBox;
