import React from 'react'
import appIcon from '../Assets/FormBotIcon.png'
import linkIcon from '../Assets/link.png'

function Footer() {
  return (
    <div style={{display:'flex', alignItems:'start', justifyContent:'space-around', padding:'80px 0px 40px 0px'}}>
        <div>
            <div style={{display:'flex', alignItems:'center', gap:'8px'}} className='Footer-title'>
                <img src={appIcon} style={{height:'18px', width:'18px', objectFit:'cover'}}/>
                <span >FormBot</span>
            </div>
            <span className='Footer-text' style={{textDecoration:'none'}}>Made with love &#10084;&#65039; by <br></br> @Cuvette</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
            <span className='Footer-title'>Product</span>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>Status</span>
                <img src={linkIcon} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>Documentation</span>
                <img src={linkIcon} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>Roadmap</span>
                <img src={linkIcon} />
            </div>
            <span className='Footer-text'>Pricing</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
            <span className='Footer-title'>Community</span>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>Discord</span>
                <img src={linkIcon} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>GitHub Repository</span>
                <img src={linkIcon} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>Twitter</span>
                <img src={linkIcon} />
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'4px'}}>
                <span className='Footer-text'>LinkedIn</span>
                <img src={linkIcon} />
            </div>
            <span className='Footer-text'>OSS Friends</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
            <span className='Footer-title'>Company</span>       
            <span className='Footer-text'>About</span>
            <span className='Footer-text'>Contact</span>
            <span className='Footer-text'>Terms of Service</span>
            <span className='Footer-text'>Privacy Policy</span>
        </div>
    </div>
  )
}

export default Footer