import React from "react";
import { useTheme } from "../../Utility/ThemeContext";

function FormBuilderButton({ icon, type, category, setFormElements, formElements }) {
  const { theme } = useTheme();

  function handleClick(){
    setFormElements([...formElements, {Icon: icon, Type: type, Category:category, Value: ""}]);
  }
  return (
    <div
      className={`${theme}`}
      onClick={handleClick}
      style={
        theme === "Dark"
          ? {
              background: "#1F1F23",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "0.5rem",
              border:'solid #27272A thin',
              cursor:'pointer'
            }
          : {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "0.5rem",
              border:'solid #D6D6D6 thin',
              cursor:'pointer'
            }
      }
    >
      <img src={icon} style={{height:'18px'}} />
      <span className="word">{type}</span>
    </div>
  );
}

export default FormBuilderButton;
