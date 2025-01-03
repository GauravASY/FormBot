import React,{useState, useEffect} from 'react'
import sendIcon from '../../Assets/sendIcon.png'
import './FormStates.css'
import { useTheme } from '../../Utility/ThemeContext'
import { use } from 'react';


export function Para({onChange, handleNextStep, value}){
    const {theme} = useTheme();
    const [text, setText] = useState(value);

    function handleChange(e){
        setText(e.target.value);
    }
    function handleClick(){
        onChange(text, "Input");
        handleNextStep();
    }
    return (
        <div className={`InputContainer ${theme}`}>
            <input type="text" className='text inputBox' value={text} placeholder='Enter your text' style={theme === "Dark"? {background:"grey", boxShadow:"1px 1px 2px 1px #00000040", color:'white'}:{color:'black'}} onChange={handleChange}/>
            <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleClick()} >
                <img src={sendIcon} style={{height:'18px'}}/>
            </div>
        </div>
    )
}

export function Rating({onChange, handleNextStep}){
    const [selected, setSelected] = useState(1);
    const {theme} = useTheme();

    function handleChange(e){
        setSelected(e.target.value);
    }

    function handleClick(){
        onChange(selected, "Input");
        handleNextStep();
    }

    return (
        <div className={`InputContainer ${theme}`}>
            <div className={`text ${theme} leftContainer`} style={theme === "Dark"? {background:"grey"}:{}} >
                {[1,2,3,4,5].map((item, index)=>(
                    <label key={index} className={`radioInput ${selected == item ? 'selected': ''}`} >
                        <input type="radio" name ="rating " value={item} checked={selected === item} onChange={handleChange}/>
                        {item}
                    </label>
                ))}
            </div>
            <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleClick()} >
                <img src={sendIcon} style={{height:'18px'}}/>
            </div>
        </div>
    )
}

export function Date({onChange, handleNextStep, value}){
    const {theme} = useTheme();
    const [date, setDate] = useState(value);

    function handleChange(e){
        setDate(e.target.value);
    }
    function handleClick(){
        onChange(date, "Input");
        handleNextStep();
    }
    return (
        <div className={`InputContainer ${theme}`}>
            <input type="text" placeholder="Select a date" value={date} onFocus={(e) => (e.target.type = 'date')}  onBlur={(e) => (e.target.type = 'text')}  className='date inputBox text' style={theme === "Dark"? {background:"grey", boxShadow:"1px 1px 2px 1px #00000040", color:'white'}:{color:'black'}} onChange={handleChange}/>
            <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleClick()} >
                <img src={sendIcon} style={{height:'18px'}}/>
            </div>
        </div>
    )
}
export function Number({onChange, handleNextStep, value}){
    const {theme} = useTheme();
    const [number, setNumber] = useState(value);

    function handleChange(e){
        setNumber(e.target.value);
    }

    function handleClick(){
        onChange(number, "Input");
        handleNextStep();
    }
    return (
        <div className={`InputContainer ${theme}`}>
            <input type="number" className='text inputBox' value={number} placeholder='Enter a number' style={theme === "Dark"? {background:"grey", boxShadow:"1px 1px 2px 1px #00000040", color:'white'}:{color:'black'}} onChange={handleChange}/>
            <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleClick()} >
                <img src={sendIcon} style={{height:'18px'}}/>
            </div>
        </div>
    )
}

export function Email({onChange, handleNextStep, value}){
    const {theme} = useTheme();
    const[email, setEmail] = useState(value);

    function handleChange(e){
        setEmail(e.target.value);
    }
    function handleClick(){
        onChange(email, "Input");
        handleNextStep();
    }
    return (
        <div className={`InputContainer ${theme}`}>
            <input type="email" className='text inputBox' value={email} placeholder='Enter your email' style={theme === "Dark"? {background:"grey", boxShadow:"1px 1px 2px 1px #00000040", color:'white'}:{color:'black'}} onChange={handleChange}/>
            <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleClick()} >
                <img src={sendIcon} style={{height:'18px'}}/>
            </div>
        </div>
    )
}

export function Phone({onChange, handleNextStep, value}){
    const {theme} = useTheme();
    const [phone, setPhone] = useState(value);

    function handleChange(e){
        setPhone(e.target.value);
    }

    function handleClick(){
        onChange(phone, "Input");
        handleNextStep();
    }
    return (
        <div className={`InputContainer ${theme}`}>
            <input type="tel" className='text inputBox' value={phone} placeholder='Enter your phone number' style={theme === "Dark"? {background:"grey", boxShadow:"1px 1px 2px 1px #00000040", color:'white'}:{color:'black'}} onChange={handleChange}/>
            <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleClick()} >
                <img src={sendIcon} style={{height:'18px'}}/>
            </div>
        </div>
    )
}

export function Submit({handleResponseSubmit}){
    const {theme} = useTheme();
    return (
        <div className='sendButton' style={theme === "Dark"? {background:"grey"}:{background:"#1A5FFF"}} onClick={()=> handleResponseSubmit()}>
                <img src={sendIcon} style={{height:'18px'}}/>
        </div>
    )
}

export function Bubble({value, handleNextStep, onChange}, ){
    const {theme} = useTheme();
    

    useEffect(() => {
        onChange(value, "Bubble");
        handleNextStep();
    }, []); 

    return (
        <p className={`text ${theme} BubbleBox`} >{value}</p>
    )
}

export function PostBubble({value, category}){
    const {theme} = useTheme();
    return (
    
            typeof(value) === 'string' && value.includes("https") ? (
                <img src={value} alt="bubble-content" style={{height: "240px", objectFit:"cover", borderRadius:'0.7rem'}} />
            ) : (
                <p className={`text ${theme} BubbleBox`} style={category === "Input"? {background : "#FF8E21"}:{}}> {value}</p>
            )

        
    )
}

export function Image({value, handleNextStep, onChange}){
    handleNextStep();
    onChange(value, "Bubble");
    return(
        <img src={value} alt="bubble-content" style={{height: "240px", objectFit:"cover", borderRadius:'0.7rem'}} />
    )
}
