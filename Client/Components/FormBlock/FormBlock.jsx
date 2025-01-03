import React, {useState} from 'react'
import { useTheme } from '../../Utility/ThemeContext'
import './FormBlock.css'
import trashIcon from '../../Assets/delete.png'

function FormBlock({icon, type, category, val, ind, setFormElements, formElements, setHasSubmit}) {
    const[value, setValue] = useState(val);
    const {theme} = useTheme();

    if(type === "Buttons"){
        setHasSubmit(true);
    }

    function handleChange(e){ 
        setValue(e.target.value);
        formElements[ind].Value = e.target.value;
    }
    function handleRemove(){
        if(type === "Buttons"){
            setHasSubmit(false);
        }
        const arr = formElements.filter((element, index) => index !== ind);
        setFormElements(arr);
    }
  return (
    <div className={`FormBlockContainer ${theme}`} style={theme === "Dark" ? {border:'solid #27272A thin'}:{border:'solid #D6D6D6 thin'}}>
        <div className='DeleteContainer' style={theme === "Dark" ? {background:'#444444'}:{background:'white', border:'solid #D6D6D6 thin'}} onClick={handleRemove}>
            <img src={trashIcon} style={{height:'14px'}}/>
        </div>
        <span className='word'>{category === 'Bubble'? type :`Input ${type}`}</span>
        {
            category === 'Bubble' ? (
                <div  style={
                    theme === "Dark"
                      ? {
                          background: "#1F1F23",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "0.5rem",
                          border:'solid #27272A thin'
                        }
                      : {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 12px",
                          borderRadius: "0.5rem",
                          border:'solid #D6D6D6 thin'
                        }
                  }>
                    <img src={icon} style={{height:'18px'}}/>
                    <input className='word' type='text' placeholder={type ==='Text'? 'Click here to edit' : 'Click to add link'} 
                     value={value} onChange={handleChange}
                     style={
                            theme === "Dark"
                            ? {
                                background: "#1F1F23",
                                color : 'white',
                                border:'none'
                                }
                            : {
                                display: "flex",
                                color:'black', 
                                border:'none'
                                }
                        }/>
                </div>
                
            ):(<></>)
        }
    </div>
  )
}

export default FormBlock