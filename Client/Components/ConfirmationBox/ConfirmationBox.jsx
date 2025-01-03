import React from 'react'
import '../CreationBox/CreationBox.css'
import { useTheme } from '../../Utility/ThemeContext';
import axios from 'axios';

function ConfirmationBox({refer, setConfirmBoxVisible,fetchWorkspace, mySpace, token, folderId, formId, creationType}) {
    const {theme} = useTheme();

    async function handleDelete(){
        if(creationType === 'folder'){
            deleteFolder();
        }
        else if(creationType === 'form'){
            deleteForm();
        }
        else{}
          setConfirmBoxVisible(false);
      }

      async function deleteFolder(){
        const { data } = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/deletefolder`,
            {
              data: { accountId: mySpace, folderId: folderId }, 
              headers: {
                Authorization: token,
              },
            }
          );
            if(data.success){
              fetchWorkspace();
            }
            else{
              console.log(data.msg);
            }
      }

      async function deleteForm(){
        const { data } = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/deleteform`,
            {
              data: { accountId: mySpace, formId: formId }, 
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(data);
            if(data.success){
                console.log("reached");
              fetchWorkspace();
            }
            else{
              console.log(data.msg);
            }
      }
   
  return (
    <div  style={{
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
      className={`${theme}`}>
        <h1 className="heading">Are you sure you want to 
        delete this {creationType} ?</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            color: "#1A5FFF",
            borderRight: "solid grey thin",
          }}
          className={`${theme} boxbutton`}
          onClick={handleDelete}
        >
          Confirm
        </button>
        <button className={`${theme} boxbutton`} onClick={()=> setConfirmBoxVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default ConfirmationBox