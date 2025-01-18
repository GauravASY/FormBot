import React, { useEffect, useState } from "react";
import FormNavbar from "../../Components/FormNavbar/FormNavbar";
import { useUser } from "../../Utility/UserContext";
import { useTheme } from "../../Utility/ThemeContext";
import "./FormPage.css";
import FormBuilderButton from "../../Components/FormBuilderButtons/FormBuilderButton";
import FormBlock from "../../Components/FormBlock/FormBlock";
import startIcon from "../../Assets/StartBubble.png";
import startIconLight from "../../Assets/StartBubbleLight.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useWorkSpace } from "../../Utility/WorkSpaceContext";
import ResponseStats from "../../Components/ResponseStats/ResponseStats";
import textBubble from "../../Assets/TextBubble.png";
import imageBubble from "../../Assets/imageBubble.png";
import videoBubble from "../../Assets/VideoBubble.png";
import gifBubble from "../../Assets/GIFBubble3.png";
import textInput from "../../Assets/TextInput.png";
import numberInput from "../../Assets/NumberInput.png";
import emailInput from "../../Assets/EmailInput.png";
import phoneInput from "../../Assets/PhoneInput.png";
import dateInput from "../../Assets/DateInput.png";
import ratingInput from "../../Assets/RatingInput.png";
import buttonsInput from "../../Assets/ButtonsInput.png";


function FormPage() {
  const { user, localToken } = useUser();
  const [formName, setFormName] = useState("");
  const { currentWorkSpace, setCurrentWorkSpace } = useWorkSpace();
  const [showStats, setShowStats] = useState(false);
  const param = useParams();
  const formId = param.id;
  const { theme } = useTheme();
  const [formElements, setFormElements] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [formResponses, setFormResponses] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const [start, setStart] = useState(0);

  useEffect(() => {
    if (localToken) {
      fetchFormDetails();
    }
  }, [localToken, showStats]);

  async function fetchFormDetails() {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/getform/${formId}`,
      { currentWorkSpace },
      {
        headers: {
          Authorization: localToken,
        },
      }
    );
    if (data.success) {
      if (data.form[0].content.length > 0) {
        setFormElements(data.form[0].content);
        setFormResponses(data.form[0].responses);
        setVisitCount(data.form[0].visitCount);
        setStart(data.form[0].start);
      }
      setFormName(data.form[0].name);
    } else {
      console.log(data.msg);
    }
  }

  async function shareForm() {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/shareform`,
      { formId: formId, workspaceId: user.mySpace },
      {
        headers: {
          Authorization: localToken,
        },
      }
    );
    if (data.success) {
      navigator.clipboard.writeText(data.link);
      alert("Copied to clipboard");
    }
    else{
      alert(data.msg);
    }
  }

  async function saveForm() {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/saveform`,
      {
        form: formElements,
        formId: formId,
        workspaceId: user.mySpace,
        name: formName,
      },
      {
        headers: {
          Authorization: localToken,
        },
      }
    );
    console.log(data);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <FormNavbar
        token={localToken}
        hasSubmit={hasSubmit}
        saveForm={saveForm}
        formName={formName}
        setFormName={setFormName}
        shareForm={shareForm}
        setShowStats={setShowStats}
        showStats={showStats}
      />
      {showStats ? (
        <ResponseStats formResponses={formResponses} formElements={formElements} visitCount={visitCount} start={start}/>
      ) : (
        <div
          className={`OuterContainer ${theme}`}
          style={theme === "Dark" ? { background: "#1F1F23" } : {}}
        >
          <div
            className={`ButtonContainer ${theme}`}
            style={
              theme === "Dark"
                ? { boxShadow: "0.5px 0.5px 3px 0.5px grey" }
                : { boxShadow: "1px 1px 3px 1px #0000000A" }
            }
          >
            <span
              className="word"
              style={{
                padding: "0px 12px",
                marginTop: "20%",
                marginBottom: "12px",
              }}
            >
              Bubbles
            </span>
            <div className="BubbleContainer">
              <FormBuilderButton
                icon={textBubble}
                type="Text"
                category="Bubble"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={imageBubble}
                type="Image"
                category="Bubble"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={videoBubble}
                type="Video"
                category="Bubble"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={gifBubble}
                type="GIF"
                category="Bubble"
                setFormElements={setFormElements}
                formElements={formElements}
              />
            </div>
            <span
              className="word"
              style={{ padding: "0px 12px", margin: "12px 0px" }}
            >
              Inputs
            </span>
            <div className="BubbleContainer">
              <FormBuilderButton
                icon={textInput}
                type="Text"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={numberInput}
                type="Number"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={emailInput}
                type="Email"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={phoneInput}
                type="Phone"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={dateInput}
                type="Date"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={ratingInput}
                type="Rating"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
              <FormBuilderButton
                icon={buttonsInput}
                type="Buttons"
                category="Input"
                setFormElements={setFormElements}
                formElements={formElements}
              />
            </div>
          </div>
          <div
            className={`FormContainer ${theme}`}
            style={
              theme === "Dark" ? { background: "#1F1F23", color: "white" } : {}
            }
          >
            <div
              className={`${theme}`}
              style={
                theme === "Dark"
                  ? {
                      marginTop: "5%",
                      width: "32%",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "0.5rem",
                      border: "solid #27272A thin",
                    }
                  : {
                      marginTop: "5%",
                      width: "32%",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "0.5rem",
                      border: "solid #D6D6D6 thin",
                    }
              }
            >
              <img
                src={theme === "Dark" ? startIcon : startIconLight}
                style={{ height: "18px" }}
              />
              <span className="word">Start</span>
            </div>
            {formElements && formElements.length !== 0 ? (
              formElements.map((formElement, index) => (
                <FormBlock
                  key={index}
                  ind={index}
                  val={formElement.Value}
                  icon={formElement.Icon}
                  type={formElement.Type}
                  category={formElement.Category}
                  setFormElements={setFormElements}
                  formElements={formElements}
                  setHasSubmit={setHasSubmit}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormPage;
