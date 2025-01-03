import React ,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Navbar.css'
import { useTheme } from '../Utility/ThemeContext'
import {Link} from 'react-router-dom'
import { useUser } from '../Utility/UserContext'
import axios from 'axios'

function Navbar({setShareBoxVisible, token, currentWorkSpace, setCurrentWorkSpace, activeWorkSpaceName, setActiveWorkSpaceName }) {
    const navigate = useNavigate();
    const param = useParams();
    const {user, logout} = useUser();
    const {theme, toggleTheme} = useTheme();
    const [visible, setVisible] = useState(false);
    const [sharedWorkSpace, setSharedWorkSpace] = useState([]);

  useEffect(()=>{
    if(user !== null){
      fetchSharedSpaces();
    }
  }, [user])

  async function fetchSharedSpaces() {
    if(user.sharedSpaces.length === 0) {
      return;
    }
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/sharedSpace`, {
      headers: {
          Authorization: token
      }
  })
    
    if (data.success) {
      setSharedWorkSpace(data.user.sharedSpaces);
    } else {
      alert(data.msg);
    }
  }

  function handleLogOut(){
    logout();
    navigate('/signin');
  }

  function handleDropClick(value){
    setCurrentWorkSpace(value._id);
    setActiveWorkSpaceName(value.name);
    setVisible(false);
  }

  return (
    <div className={`navbar ${theme}`} >
        <div className={`dropdownContainer ${theme}`} >
          <div  className='dropdown' style={ visible? { borderRadius:'6px 6px 0 0', display:'flex', alignItems:'center', justifyContent:'space-between'} : {display:'flex', alignItems:'center',justifyContent:'space-between'}} onClick={()=>setVisible(!visible)}>
            <span className={` ${theme} word`} >{`${activeWorkSpaceName}`}</span>
            {
              visible ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-1" style={{height:'12px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-1" style={{height:'12px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

            }
          </div>
          <div className={`dropdownContent ${theme}`} style={ visible ? {display: 'flex', flexDirection:'column', borderTop:'none'} : {display: 'none'} }>
            {
              user ? (<Link to={`/dashboard/`} key={user.mySpace._id}  className={`word ${theme} link`} style={{textDecoration:'none', borderBottom:'grey solid thin'}} onClick={()=>handleDropClick(user.mySpace)}>{user.mySpace.name}</Link>):(<></>)
            }
            { 
              
              sharedWorkSpace ? 
              (
                sharedWorkSpace.map((sharedObject)=>  <Link to={`/dashboard/${sharedObject.sharedSpace._id}`} key={sharedObject.sharedSpace._id}  className={`word ${theme} link`} style={{textDecoration:'none', borderBottom:'grey solid thin'}} onClick={()=> handleDropClick(sharedObject.sharedSpace)}>{sharedObject.sharedSpace.name}</Link> )
              ): (<></>)
            }
              <span className='word link ' style={{color:'#FFA54C'}} onClick={handleLogOut}>Log Out</span>
          </div>
        </div>
        
        <div className='switch'>
            <label className='word'>Light</label>
            <input type='checkbox' id='check' defaultChecked={true} onChange={toggleTheme}></input>
            <label htmlFor='check' className='slider'></label>
            <label className='word'>Dark</label>
        </div>
        <button className='share word' onClick={()=> setShareBoxVisible(true)}>Share</button>
    </div>
  )
}

export default Navbar