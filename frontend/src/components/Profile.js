import React,{ useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiFillCamera, AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdClose, MdError } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { startLogout, startDeleteUser, startDeleteAvatar, startEditAvatar } from '../actions/userActions';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#App')

//if authenticated redirect to dashboard

const Profile = ({user, token, logOut, deleteUser, message, deleteAvatar, editAvatar, status, page})=>{
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [avUploadStatus, setAvUploadStatus] =  React.useState(''); // '' = hide/no action - loading = 'avLoading - 'success' = show success div - 'fail' = show fail div
  const [avDeleteStatus, setAvDeleteStatus] =  React.useState(''); // 
  function openModal() {
    setIsOpen(true);
    setAvUploadStatus('')
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

   const handleDeleteAccount = ()=>{
    deleteUser();
   }
  function handleFileChange(e) {
    setAvUploadStatus('avLoading');
    let upload = e.target.files[0];
    if(typeof upload === 'object' && upload !== null){
      //uploaded but not changed
      setAvUploadStatus('changing');
      console.log("form yes---");
      const form = new FormData();
      form.append("avatar", upload);
      editAvatar(form);
    } else {
      setAvUploadStatus('fail');
    }
    setAvUploadStatus('');
  }

    return <>
        <h1>Welcome, {user.name}</h1>
        <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <form id="modal-form">
            <label for="upload-avatar">Change Avatar</label>
            <input type="file" name="avatar" id="upload-avatar" onChange={handleFileChange}/>
            {avUploadStatus === 'changing' && <Loader
              type="Rings"
              color="#00BFFF"
              height={20}
              width={20}
              />
              }
            {status === 'success' && <div className="avatar-upload-confirm-cont"><span>Upload Successful</span><AiOutlineCheck className="avatar-check"/></div>}
            {status === 'fail' ? <div className="avatar-upload-confirm-cont"><span>Upload Failed</span><MdError className="avatar-check"/></div> : ''}
  
            <button type="button" id="delete-avatar" onClick={()=>{deleteAvatar()}}>Delete Avatar</button>
            {page === 'avatar-delete' && status === 'success' ? <div className="avatar-upload-confirm-cont"><span>Avatar deleted</span><AiOutlineCheck className="avatar-check"/></div> : ''}
            {page === 'avatar-delete' && status === 'error' ? <div className="avatar-upload-confirm-cont"><span>Deleted failed</span><MdError className="avatar-check"/></div> : ''}
            <IoMdCloseCircle onClick={closeModal}/>
          </form>
        </Modal>
      </div>

        <div className="avatar-cont"><img src={`${process.env.API_URL}/users/${user._id}/avatar`} alt=""/><AiFillCamera onClick={openModal}/></div>
        <div className="profile-cont">
          <div className="profile-block">
            <div className="profile-item">Name</div>
            <div className="profile-item">
              <Link to="/profile/edit-name"><span className="profile-field">{user.name}</span></Link> <MdKeyboardArrowRight/>
            </div>
          </div> 
          <div className="profile-block">
            <div className="profile-item">Email</div>
            <div className="profile-item">
            <Link to="profile/edit-email"><span className="profile-field">{user.email}</span></Link> <MdKeyboardArrowRight/>
            </div>
          </div> 
          <div className="profile-block">
            <div className="profile-item">Age</div>
            <div className="profile-item">
            <Link to="/profile/edit-age"><span className="profile-field">{user.age}</span></Link> <MdKeyboardArrowRight/>
            </div>
          </div> 
          <div className="profile-block" onClick={handleDeleteAccount}>
            <div className="profile-item">Delete Account</div>
            <div className="profile-item"><MdClose /></div>
          </div> 
          {page === 'profile-delete' && status ==='success' &&<h1>Profile Deleted</h1>}
          {page === 'profile-delete' && status ==='fail' &&<h1>Profile couldnt be deleted</h1>}
        </div>
    </>
}

const mapDispatchToProps = (dispatch)=>(
  {
    logOut: ()=>(dispatch(startLogout())),
    deleteUser: ()=>(dispatch(startDeleteUser())),
    deleteAvatar: ()=>(dispatch(startDeleteAvatar())),
    editAvatar: (formData)=>(dispatch(startEditAvatar(formData)))
  }
)

const mapStateToProps = (state)=>{
    return {
        user: state.user,
        token: state.auth.token,
        status: state.statuses.status,
        page: state.statuses.page
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
