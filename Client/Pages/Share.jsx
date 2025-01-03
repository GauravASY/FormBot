import React, {useEffect} from 'react'
import { useUser } from '../Utility/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import shape1 from '../Assets/LandPageTriangle.png'
import mainImage from '../Assets/HomeImage.png'
import shape2 from '../Assets/LandPageSemiCircle.png'
import appIcon from '../Assets/FormBotIcon.png'
import Footer from '../Components/Footer'
import axios from 'axios'
import './LandingPage.css'

function Share() {
  const {user, localToken} = useUser();
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(user !== null){
      addWorkSpaceByLink();
    }
  }, [user])

  async function addWorkSpaceByLink(){
    const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/sharebylink`, {linkToken: param.linktoken}, {
        headers : {
            Authorization : localToken
        }
    })
    alert(data.msg);
    navigate('/dashboard');
  }



  return (
    <div style={{display:'flex', flexDirection:'column', gap:'1rem', background:'#18181B',height:'100%'}}>
        <div style={{display:'flex', padding:'0px 80px', alignItems:'center', marginTop:'40px', marginBottom:'40px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'start', width:'50%', marginBottom:'0px'}} className='Footer-title'>
                <img src={appIcon} style={{height:'32px', width:'32px', objectFit:'cover'}}/>
                <span className='Footer-title' style={{display:'flex', alignItems:'center', fontSize:'1.3rem', marginBottom:'0px'}}>FormBot</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'end', width:'50%'}}>
            <button className='navButton' onClick={()=>navigate('/signin')}>Sign In</button>
            <button className='navButton' style={{background:'#1A5FFF', border:'none', color:'white'}} onClick={()=> navigate('/signin')}>Create a FormBot</button>
          </div>
        </div>
        <div style={{display:'flex',position:'relative', justifyContent:'center', height:'40%'}}>
            <img src={shape1} style={{position:'absolute', left :'5%', top:'6%', height:'270px'}}/>
            <img src={shape2} style={{position:'absolute', right :'5%', top:'-5%', height:'270px'}}/>
            <div style={{display:'flex', flexDirection:'column',gap:'1rem', width:'50%', textAlign:'center', alignItems:'center'}}>
                <h1 className='title'>Redirecting, Please Wait...</h1>
                <button className='button'  onClick={()=> navigate('/signin')}> Create a FormBot for free</button>
            </div>
        </div>
        <div>
            <img src={mainImage} className='Image'/>
        </div>
        <Footer/>
    </div>
  )
}

export default Share