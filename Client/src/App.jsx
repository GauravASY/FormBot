import Navbar from "../Components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { useTheme } from "../Utility/ThemeContext";
import folder from "../Assets/folder.png";
import FolderTile from "../Components/FolderTile/FolderTile";
import ContentIcon from "../Components/ContentIcon/ContentIcon.jsx";
import { useUser } from "../Utility/UserContext";
import CreationBox from "../Components/CreationBox/CreationBox.jsx";
import ConfirmationBox from "../Components/ConfirmationBox/ConfirmationBox.jsx";
import ShareBox from "../Components/ShareBox/ShareBox.jsx";
import { useWorkSpace } from "../Utility/WorkSpaceContext.jsx";

function App() {
  const currentWorkSpaceId = useParams();
  const { theme } = useTheme();
  const { user, localToken } = useUser();
  const confirmationBoxRef = useRef();

  const creationBoxRef = useRef();
  const createfolderRef = useRef();
  const createFormRef = useRef();
  const shareBoxRef = useRef();
  const token = localStorage.getItem("token");
  const [folderId, setFolderId] = useState("");
  const [formId, setFormId] = useState("");
  const [workspace, setWorkspace] = useState({
    name: "",
    folders: [],
    forms: [],
  });
  const [boxVisible, setBoxVisible] = useState(false);
  const [confirmBoxVisible, setConfirmBoxVisible] = useState(false);
  const [shareBoxVisible, setShareBoxVisible] = useState(false);
  const [boxType, setBoxType] = useState("");
  const [creationType, setCreationType] = useState("");
   const {currentWorkSpace, activeWorkSpaceName, setActiveWorkSpaceName, setCurrentWorkSpace} = useWorkSpace();

  useEffect(() => {
    if (user !== null) {
      fetchWorkspace();
    }
  }, [user, currentWorkSpaceId.id]);

  useEffect(() => {
    if(user !== null){
      if(currentWorkSpaceId.id === undefined){
          setCurrentWorkSpace(user.mySpace);
      }
      else{
        setCurrentWorkSpace(currentWorkSpaceId.id);
      }
    }
  }, [user, currentWorkSpaceId.id]);

  async function fetchWorkspace() {
    let accountId;
    if(currentWorkSpaceId.id === undefined){
      accountId = user.mySpace;
    }
    else{
      accountId = currentWorkSpaceId.id;
    }
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace`,
      { accountId },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (data.success) {
      setWorkspace(data.workspace);
      setActiveWorkSpaceName(data.workspace.name);
    } else {
      alert(data.msg);
    }
  }

  function handleBoxVisibleToggle(e) {
    if (
      boxVisible &&
      creationBoxRef.current &&
      !creationBoxRef.current.contains(e.target)
    ) {
      setBoxVisible(false);
    }
    if (
      confirmBoxVisible &&
      confirmationBoxRef.current &&
      !confirmationBoxRef.current.contains(e.target)
    ) {
      setConfirmBoxVisible(false);
    }
    if(shareBoxVisible && shareBoxRef.current && !shareBoxRef.current.contains(e.target)){
      setShareBoxVisible(false);
    }
  }

  function handleBoxTypenVisible(e) {
    setBoxVisible(true);
    if (createFormRef.current && createFormRef.current.contains(e.target)) {
      setBoxType("Form");
    } else {
      setBoxType("Folder");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar setShareBoxVisible={setShareBoxVisible} token={token} currentWorkSpace={currentWorkSpace} setCurrentWorkSpace={setCurrentWorkSpace} 
        activeWorkSpaceName={activeWorkSpaceName} setActiveWorkSpaceName={setActiveWorkSpaceName}
      />
      <div
        className={`MainContainer  ${theme}`}
        onClick={handleBoxVisibleToggle}
      >
        <div className="folderContainer">
          <div
            className="titleTile"
            onClick={handleBoxTypenVisible}
            ref={createfolderRef}
            style={{ cursor: "pointer" }}
          >
            <img src={folder} />
            <span className="text1">Create a folder</span>
          </div>
          {workspace !== undefined && workspace?.folders.length !== 0 ? (
            workspace.folders.map((folder) => (
              <FolderTile
                key={folder._id}
                folderId={folder._id}
                name={folder.name}
                setConfirmBoxVisible={setConfirmBoxVisible}
                setFolderId={setFolderId}
                setCreationType={setCreationType}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="contentContainer">
          <div
            className="CreateForm"
            ref={createFormRef}
            onClick={handleBoxTypenVisible}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
              style={{ height: "40px", marginTop: "-28px" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span
              className="text1"
              style={{ position: "absolute", bottom: "25%" }}
            >
              Create a typebot
            </span>
          </div>
          {workspace !== undefined && workspace?.forms.length !== 0 ? (
            workspace.forms.map((form) => (
              <ContentIcon
                key={form._id}
                name={form.name}
                formID={form._id}
                setFormId={setFormId}
                setConfirmBoxVisible={setConfirmBoxVisible}
                setCreationType={setCreationType}
              />
            ))
          ) : (
            <></>
          )}
          {boxVisible ? (
            <CreationBox
              refer={creationBoxRef}
              boxType={boxType}
              fetchWorkspace={fetchWorkspace}
              setBoxVisible={setBoxVisible}
              mySpace={currentWorkSpace}
              token={localToken}
            />
          ) : (
            <></>
          )}
          {confirmBoxVisible ? (
            <ConfirmationBox
              refer={confirmationBoxRef}
              fetchWorkspace={fetchWorkspace}
              mySpace={user.mySpace}
              token={token}
              folderId={folderId}
              formId={formId}
              setConfirmBoxVisible={setConfirmBoxVisible}
              creationType={creationType}
            />
          ) : (
            <></>
          )}
          {
            shareBoxVisible ? (
            <ShareBox shareBoxRef={shareBoxRef} setShareBoxVisible={setShareBoxVisible} token={token}/>
          ) : (<></>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
