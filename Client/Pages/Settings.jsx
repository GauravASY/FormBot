import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useTheme } from "../Utility/ThemeContext";
import { useUser } from "../Utility/UserContext";
import axios from "axios";

function Settings() {
  const {user, localToken} =useUser();
  const [emailVisible, setemailVisible] = useState(false);
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [newPassVisible, setnewPassVisible] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  })
  const { theme } = useTheme();
  const navigate = useNavigate();

  function handleLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  async function handleUpdate(){
    if(updateData.name === "" && updateData.email === "" && updateData.password === "" && updateData.newPassword === ""){
      return;
    }
    if(updateData.password !== "" && updateData.newPassword === ""){
      alert('Please enter new password');
      return;
    }
    if(updateData.password === "" && updateData.newPassword !== ""){
      alert('Please enter old password');
      return;
    }
    const updateObject ={
      name: "",
      email: "",
      password: "",
      newPassword: ""
    };
    if(updateData.name !== ""){
      updateObject.name = updateData.name;
    }
    if(updateData.email !== ""){
      updateObject.email = updateData.email;
    }
    if(updateData.password !== "" && updateData.newPassword !== ""){
      updateObject.password = updateData.password;
      updateObject.newPassword = updateData.newPassword;
    }

    try {
      const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update`, updateObject, {
        headers: {
          Authorization: localToken
        } 
      })
      if(data.success){
        alert(data.msg);
        setUpdateData({
          name: "",
          email: "",
          password: "",
          newPassword: ""
        });
      }
      else{
        console.log(data.msg);
      }
    } catch (error) {
        console.log("Error updating user data", error);
    }

  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
      className={`${theme}`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          width: "25%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Open Sans",
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "40px",
            marginTop: "60px",
          }}
        >
          Settings
        </span>

        <div style={{display:'flex', alignItems:'center', position:'relative'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', left:'10px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            <input
              className="inputArea input-text"
              type="text"
              id="username"
              name="Username"
              placeholder="Name"
              value={updateData.name}
              style={{width:'100%', paddingLeft:'40px'}}
              onChange={(e)=>setUpdateData({...updateData, name:e.target.value})}
            />
        </div>

        <div  style={{display:'flex', alignItems:'center', position:'relative'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', left:'10px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input
                className="inputArea input-text"
                type={emailVisible ? "email" : "password"}
                id="email"
                name="email"
                placeholder="Update email"
                value={updateData.email}
                style={{width:'100%', paddingLeft:'40px'}}
                onChange={(e)=>setUpdateData({...updateData, email:e.target.value})}
              />
              {
                emailVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', right:'10px'}} onClick={()=>setemailVisible(!emailVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', right:'10px'}} onClick={()=>setemailVisible(!emailVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            
              }
        </div>
        <div  style={{display:'flex', alignItems:'center', position:'relative'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', left:'10px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <input
                className="inputArea input-text"
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Old Password"
                value={updateData.password}
                style={{width:'100%', paddingLeft:'40px'}}
                onChange={(e)=>setUpdateData({...updateData, password:e.target.value})}
              />
               {
                passwordVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', right:'10px'}} onClick={()=>setpasswordVisible(!passwordVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', right:'10px'}} onClick={()=>setpasswordVisible(!passwordVisible)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            
              }
        </div>
        <div  style={{display:'flex', alignItems:'center', position:'relative'}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', left:'10px'}} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              
              <input
                className="inputArea input-text"
                type={newPassVisible ? "text" : "password"}
                id="confirm password"
                name="confirm password"
                placeholder="New Password"
                style={{width:'100%', paddingLeft:'40px'}}
                value={updateData.newPassword}
                onChange={(e)=>setUpdateData({...updateData, newPassword:e.target.value})}
              />
               {
                newPassVisible ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', right:'10px'}} onClick={()=>setnewPassVisible(!newPassVisible)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="grey" className="size-6" style={{height:'20px', position:'absolute', right:'10px'}} onClick={()=>setnewPassVisible(!newPassVisible)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            
              }
        </div>
        <button
          className="button"
          style={{
            width: "100%",
            borderRadius: "2rem",
            padding: "8px 0px",
            marginTop: "30px",
          }}
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:'10px', position:'absolute', left:'80px', bottom:'40px', cursor:'pointer'}} onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#CF3636" className="size-6" style={{height:'20px'}}> 
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        <div style={{
            fontFamily: "Open Sans",
            fontSize: "1rem",
            fontWeight: "500",
            color: "#CF3636",
            display:'flex',
            alignItems:'center',
            width:'fit-content',
          }}>
          Log Out
        </div>
      </div>

    </div>
  );
}

export default Settings;
