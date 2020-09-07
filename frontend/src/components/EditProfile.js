import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AiOutlineCheck } from "react-icons/ai";
import { MdClose, MdError, MdCheck } from "react-icons/md";
import { isLength, isEmail, isNumeric } from 'validator';
import { startEditProfile } from '../actions/userActions';
import Loader from 'react-loader-spinner';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
     
    }
  };
   

const EditProfile = (props)=>{
    const [isValid, setValidity] = useState(true);
    //title
    const [editField, setEditField] = useState('');
    //email value
    const [editValue, setEditValue] = useState('');
    const [modalIsOpen,setIsOpen] = React.useState(false);

    useEffect(()=>{
        let path = props.location.pathname;
        let indexAfterSlash = path.indexOf('-') + 1;
        let extract = path.substr(indexAfterSlash)
        setEditField(extract)
    },[])
    useEffect(()=>{
        console.log("on edit field change");
        setEditValue(props.user[editField]);
    },[editField])

    useEffect(()=>{
        //make sure its a string
        if(typeof editValue !== 'string' && typeof editValue !== 'number'){
            console.log("ran");
            setValidity(false)
            return;
        }
        //if name
        if(editField === 'name'){
            if(isLength(editValue,{min:3, max: undefined})){
                setValidity(true)
            }else {
                setValidity(false);
            }
        }
        //if email
        else if(editField === 'email'){
            if(!isEmail(editValue)) {
                setValidity(false);
            }else {
                setValidity(true);
            }
        }
        //if age
        else if(editField === 'age'){
            if(isNumeric(String(editValue))) {
                setValidity(true)
            }else {
                setValidity(false);
            }
        }
    },[editValue])

    function handleSubmit(){
        props.editProfile({[editField]: editValue});
        openModal();
    }
    //modal functions
    
    function openModal() {
      setIsOpen(true);
    }
    function afterOpenModal() {

    }
   
    function closeModal(){
        console.log("testu");
      setIsOpen(false);
        props.history.push('/profile')
    }

    return <>
       <h3 style={{textAlign: 'center'}}>{editField}</h3>
       <div className="edit-profile-cont">
           <div className="edit-profile-block">
                <input className="edit-profile-item" type="text" value={editValue} onChange={(e)=>{ setEditValue(e.target.value)}}/>
                <div>
                    {isValid && <AiOutlineCheck style={{padding: '0 4px', color: 'green'}}/>}
                    {!isValid && <MdError style={{padding: '0 4px'}}/>}
                </div>
           </div>      
       </div>
       <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {isValid &&<button style={{marginTop: '10px'}} onClick={handleSubmit}>Change {editField}</button>}
            <button onClick={props.history.goBack} className="go-back"> <MdKeyboardArrowLeft style={{fontSize: '20px'}}/> <span>Go Back</span></button>
        </div>
        
       {props.page === 'profile-edit' && status === 'loading' ? <div style={{margin: 'auto', width: '100px'}}>
            <Loader
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
            />
        </div>:''}
       <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        //   contentLabel="Example Modal"
        //   modName={modName}
        >
        <div  className="modal-confirm-close">
            <div>Success</div>
            <div onClick={closeModal}>Confirm <MdCheck/></div>
        </div>   
        </Modal>
    </>
    
 
}
const mapDispatchToProps = (dispatch)=>{
    return {
        editProfile: (data)=>(dispatch(startEditProfile(data)))
    }
}
const mapStateToProps = (state)=>{
    return {
        user: state.user,
        page: state.statuses.page,
        status: state.statuses.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);