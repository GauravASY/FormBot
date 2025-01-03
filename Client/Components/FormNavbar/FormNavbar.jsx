import React ,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../Navbar.css'
import { useTheme } from '../../Utility/ThemeContext'
import axios from 'axios'

function FormNavbar({ token, hasSubmit, saveForm, formName, setFormName, shareForm, setShowStats, showStats}) {
    const navigate = useNavigate();
    const {theme, toggleTheme} = useTheme();


  return (
    <div className={`FormNavbar ${theme}`} >
        <input type="text" className='navInput word' placeholder='Enter form name'  value={formName} onChange={(e)=> setFormName(e.target.value)} style={theme ==='Dark' ? {background:'#37373E', color:'white', border:'none'}:{background:'white', color:'black', border:'solid grey thin'} }/>
        
        <div style={{display:'flex', alignItems:'center', gap:'12px', justifyContent:'space-between', position:'absolute', left:'40%', padding:'0 6px'}}>
          <button className={`formNavButton word ${theme}`} style={showStats ? {} : {border:'solid #7EA6FF 2px', color:'#7EA6FF'}} onClick={()=> setShowStats(false)}> Flow </button>
          <button className={`formNavButton word ${theme}`} style={showStats ? {border:'solid #7EA6FF 2px', color:'#7EA6FF'}:{} } onClick={()=> setShowStats(true)}> Response </button>
        </div>
         
        

        <div style={{display:'flex', alignItems:'center', gap:'12px', justifyContent:'space-between'}}>
        <div className='switch' style={{right:'20%'}}>
            <label className='word'>Light</label>
            <input type='checkbox' id='check' defaultChecked={true} onChange={toggleTheme}></input>
            <label htmlFor='check' className='slider'></label>
            <label className='word'>Dark</label>
        </div>
          <button className='formNavButton word' style={hasSubmit ? { background: '#1A5FFF', color:'white'}:{background:'#848890', color:'white'}} disabled={!hasSubmit} onClick={()=> shareForm()}>Share</button>
          <button className='formNavButton word' style={{ background: '#4ADE80CC', color:'white'}} disabled={!hasSubmit} onClick={()=> saveForm()}>Save</button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F55050" className="size-2" style={{ height:"24px", cursor:'pointer'}} onClick={()=>navigate('/dashboard')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
    </div>
  )
}

export default FormNavbar