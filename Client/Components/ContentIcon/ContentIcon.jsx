import React from 'react'
import trash from '../../Assets/delete.png'
import { useNavigate } from 'react-router-dom';

function ContentIcon({name, formID, setFormId, setConfirmBoxVisible, setCreationType}) {
  const navigate = useNavigate();

  function handleDeleteForm(e){
    e.stopPropagation();
    setConfirmBoxVisible(true);
    setFormId(formID);
    setCreationType("form");
  }


  return (
    <div className='CreateForm' style={{background:'grey', cursor:'pointer'}} onClick={()=> navigate(`/forms/${formID}`)}>
        <span className='text1'>{name}</span>
        <img src={trash} style={{height:'16px', width:'16px', objectFit:'cover', position:'absolute', right:'-8px', top:'-8px'}} onClick={handleDeleteForm}/>
    </div>
  )
}

export default ContentIcon