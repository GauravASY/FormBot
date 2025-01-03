import React,{useState} from 'react'
import '../CreationBox/CreationBox.css'
import axios from 'axios'
import { useTheme } from '../../Utility/ThemeContext';

function ShareBox({shareBoxRef, setShareBoxVisible, token}) {
    const {theme} = useTheme();
    const [visible, setVisible] = useState(false); 
    const [permission, setPermission] = useState("Edit");
    const [email, setEmail] = useState("");

    function handlePermissionSelection(e){
        setPermission(e.target.innerHTML);
    }

    async function handleInviteByEmail(){
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/sharebyemail`, {email, permission}, {
            headers:{
                Authorization : token
            }
        })
        setShareBoxVisible(false);
        console.log(data);
    }

    async function handleInviteByLink(){
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/generatelink`,{permission}, {
            headers : {
                Authorization : token
            }
        })
        if(data.success){
            navigator.clipboard.writeText(data.link);
            alert("Copied to clipboard");
        }
    }

  return (
    <div style={{
        display: "flex",
        gap:'15px',
        flexDirection: "column",
        padding: "55px 40px",
        border: "grey solid thin",
        borderRadius: "1.5rem",
        position: "absolute",
        width: "40%",
        justifyContent: "space-between",
        left: "25%",
      }} ref={shareBoxRef}
      className={`${theme}`}>

        <div style={{display:'flex', alignItems:'center', position:'relative', justifyContent:'end'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F55050" className="size-2" style={{position:'absolute', height:"24px", right:'-20px', bottom:'14px', cursor:'pointer'}} onClick={()=> setShareBoxVisible(false)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>

        <div style={{display:'flex', alignItems:'center', justifyContent:"space-between"}} >
            <span className='heading' style={{fontSize:'1.7rem'}}>Invite by Email</span>
            <div className='DropDownContainer' onClick={()=>setVisible(!visible)}>
                <div className='DropDown'>
                    <span style={{fontFamily:'Open sans', fontSize:'1.1rem', fontWeight:'600'}}>{permission}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-1" style={{height:'12px'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div className={`DropDownContent ${theme}`} style={visible ? {} : {display:'none'}}>
                    <span  style={
                                theme === "Dark"
                                    ? { fontSize: "1.1rem", backgroundColor: "#1F1F23", fontFamily:'Open sans', fontWeight:'600', cursor:'pointer'}
                                    : { fontSize: "1.1rem", fontFamily:'Open sans', fontWeight:'600', boxShadow:'1px 1px 2px 1px #1F1F23', cursor:'pointer'}
                                } className={`${theme}`} onClick={handlePermissionSelection}
                    >Edit</span>
                    <span style={
                                theme === "Dark"
                                    ? { fontSize: "1.1rem", backgroundColor: "#1F1F23", fontFamily:'Open sans', fontWeight:'600', cursor:'pointer'}
                                    : { fontSize: "1.1rem", fontFamily:'Open sans', fontWeight:'600', boxShadow:'1px 1px 2px 1px #1F1F23', cursor:'pointer'}
                                } className={`${theme}`} onClick={handlePermissionSelection}>View</span>
                </div>
            </div>
        </div>

        <input type="text" placeholder='Enter email' className={`input ${theme}`} style={
          theme === "Dark"
            ? { fontSize: "1.1rem", backgroundColor: "#1F1F23" }
            : { fontSize: "1.1rem" }
        } value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <button className='button2 ' onClick={handleInviteByEmail}>Send Invite</button>
        <h1 className='heading'>Invite by link</h1>
        <button className='button2' onClick={handleInviteByLink}>Copy link</button>
    </div>
  )
}

export default ShareBox