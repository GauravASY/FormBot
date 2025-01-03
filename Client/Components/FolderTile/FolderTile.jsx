import React from "react";
import trash from '../../Assets/delete.png'

function FolderTile({name, folderId, setConfirmBoxVisible, setFolderId, setCreationType}) {

  function handleDeleteIcon(){
    setConfirmBoxVisible(true);
    setFolderId(folderId);
    setCreationType("folder");
  }

  return (
    <div className="titleTile" style={{cursor:'pointer'}}>
      <span className="text1">{name}</span>
      <img src={trash} onClick={handleDeleteIcon}/>
    </div>
  );
}

export default FolderTile;
