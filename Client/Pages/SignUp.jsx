import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import googleIcon from '../Assets/GoogleIcon.png'
import triangle from '../Assets/triangle.png'
import semiCircle1 from '../Assets/semiCircle.png'
import backArrow from '../Assets/arrow_back.png'
import semiCircle2 from '../Assets/semiCircle2.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './SignUp.css'


function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email :"",
        password:"",
        confirmPassword:""
    })
    const [matchError, setMatchError] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setMatchError(true);
            return;
        }
        setMatchError(false);
        if(formData.username==="" || formData.email==="" || !formData.password==="" || !formData.confirmPassword===""){
            alert('Please fill all the fields');
            return;
        }

        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, formData);
            if(data.success){
                navigate("/signin");
            }
            else{
                console.log(data);
            }
        } catch (error) {
            alert("Unexpected Error Occured");
        }
    }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background:"#18181B", position:'relative'}} > 
        <img src={backArrow} style={{position:'absolute', left:'8%', top:'10%', height:'35px', objectFit:'contain', cursor:'pointer'}} onClick={()=>navigate(-1)}/>
        <img src={triangle} style={{position:'absolute', left :'10%', top:'40%', height:'170px'}}/>
        <img src={triangle} style={{position:'absolute', left :'9%', top:'43%', height:'170px', opacity:'80%'}}/>
        <img src={semiCircle1} style={{position:'absolute', right :'0px', top:'20%', height:'170px'}} />
        <img src={semiCircle2} style={{position:'absolute', left :'65%', bottom:'0px', height:'100px'}} />
        <div style={{width:'20%', zIndex:'10'}}>
            <form style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
                <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    <label className="text" htmlFor="name">Username</label>
                    <input className="inputArea input-text" type="text" id="name" name="name" required placeholder='Enter Username' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    <label className="text" htmlFor="email">Email</label>
                    <input className="inputArea input-text" type="email" id="email" name="email" required placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    <label className="text" htmlFor="password">Password</label>
                    <input className="inputArea input-text" type="password" id="password" name="password" required placeholder="Enter Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    <label className={`${!matchError ? 'text' : 'Error'}`} htmlFor="password">Confirm Password</label>
                    <input className={`inputArea input-text`} style={{ border: matchError ? '#522224 1px solid' : '' }} type="password" id="Confirmpassword" name="password" required placeholder="Re-enter Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}/>
                    {matchError ? <span className='Error'>enter same password in both fields</span> : <span style={{color: matchError ? '#522224':'#18181B', fontFamily:"Poppins", fontSize:'0.9rem', fontWeight:'400'}}>none</span>}
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'10px', marginTop:"2px"}}>
                    <button className="button" type="submit" onClick={handleSubmit} style={{width:'100%'}}>Sign Up</button>
                    <span style={{textAlign:'center'}} className='text'>OR</span>
                    <div className="button" type="button" style={{display:'flex', alignItems:'center',justifyContent:'center', position:'relative', width:'100%'}}>
                        <div style={{height:'18px', width:'18px', background:'white', borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center', padding:'4px', position:'absolute', left:'10px'}}>
                            <img src={googleIcon} alt="Google Icon" style={{height:'16px', width:'16px', objectFit:'contain'}}/>
                        </div>
                        <span className='text'>Sign Up with Google</span>
                    </div>
                    <span className='text' style={{textAlign:'center', marginTop:'8px'}}>Already have an account ? <Link to="/signin" style={{color:"#1A5FFF", fontFamily:'Poppins', fontWeight:'400', fontSize:'1rem', textDecoration:'none'}}>Login</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp