import React, { useEffect, useState } from 'react'
import { useTheme } from '../../Utility/ThemeContext'
import { useUser } from '../../Utility/UserContext';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Para, Rating, Date, Number, Email, Phone, Bubble, Submit, PostBubble, Image } from '../../Components/FormStates/FormStates';
import '../../Components/Navbar.css'
import FormNavbar from '../../Components/FormNavbar/FormNavbar';

const inputComponents = {
  Text: Para,
  Number: Number,
  Email: Email,
  Phone: Phone,
  Date: Date,
  Rating: Rating, 
  Buttons : Submit
};

function FillForm() {
    const {theme, toggleTheme} = useTheme();
    const {user, localToken} = useUser();
    const [visitCount, setVisitCount] = useState(0);
    const param = useParams();
    const formToken = param.formToken;
    const [formElements, setFormElements] = useState([]);
    const [start, setStart] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(localToken){
            fetchForm();
            handleVisitCount();
        }
    }, [localToken])


    async function handleVisitCount(){
        setVisitCount(visitCount + 1);
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/updatevisit`, {formToken: formToken, visitCount: visitCount}, {
          headers : {
            Authorization : localToken
          }
        })
    }

    async function fetchForm(){
      try {
        setLoading(true);
        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/fillform/${formToken}`, {
          headers: {
            Authorization : localToken
          }
        });
          if(data.success){
            if(data.form[0].content.length > 0){
              setFormElements(data.form[0].content);
              setVisitCount(data.form[0].visitCount);
            }
          }
          else{
            console.log(data.msg);
          }
      } catch (error) {
          console.log("Eror in fetching form");
      }
      finally{
        setLoading(false);
      }
    }

    function handleStart(){
      if(start === 0){
        setStart(1);
        handleSaveStart();
      }
    }

    async function handleSaveStart(){
      const {data} = axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/savestart`, {formToken: formToken, start:start}, {
        headers : { Authorization : localToken }
      })
    }

    const handleInputChange = (value, category) => {
      handleStart();
      const updatedResponses = [...responses];
      value = String(value);
      updatedResponses[currentStep] = {value, category};
      setResponses(updatedResponses);
    };
  
    const handleNextStep = () => {
      setCurrentStep(currentStep + 1);
    };

    const handleResponseSubmit = async () => {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/workspace/submitresponse`, {formToken: formToken, responses: responses}, {
          headers : {
            Authorization : localToken
          }
        })
        alert(data.msg); 
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
  
    const content = formElements || [];
    if (currentStep >= content.length) {
      return <div>Conversation complete!</div>;
    }
  
    const currentContent = content[currentStep];
    const InputComponent = inputComponents[currentContent.Type];

  return (
    <div style={{ display: "flex", flexDirection: "column",minHeight:"100vh",  height: "100%", padding : "20px 80px", gap:"22px" }} className={`${theme}`}>

          {
            responses && responses.length !== 0 ? (
              responses.map((response, index) => (
                <div key={index} style={response.category === "Bubble" ? {display:'flex', alignItems:'center', justifyContent:'start'} : {display:'flex', alignItems:'center', justifyContent:'end'}}>
                  <PostBubble key={index} value={response.value} category={response.category} />
                </div>
              ))
            ) : (
              <></>
            )
          }

         {currentContent.Category === "Bubble" ? (
          <div style={{display:'flex', alignItems:'center', justifyContent:'start'}}>
            {currentContent.Value.includes("http") ? (
              <Image value={currentContent.Value} handleNextStep={handleNextStep} onChange={handleInputChange}/>
          ) : (
            <Bubble value={currentContent.Value} handleNextStep={handleNextStep} onChange={handleInputChange} category={currentContent.Category}/>
          )}
            
          </div>
          ):
          (
            InputComponent && (
              <div style={{display:'flex', alignItems:'center', justifyContent:'end'}}>
                <InputComponent
                  key={currentStep} 
                  value={responses[currentStep]?.value || ""} 
                  onChange={handleInputChange} 
                  handleNextStep={handleNextStep} 
                  handleResponseSubmit={handleResponseSubmit} 
                />
              </div>
            )
        )
        }  
    </div>
  )
}

export default FillForm