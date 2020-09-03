import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {setFetchStatus} from '../actions/statusActions';

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
 
function Mod2({status, page, name, setFetchStatus}){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(true);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
    // setTimeout(()=>{closeModal()},3000)
  }
 
  function closeModal(){
    setIsOpen(false);
    setFetchStatus()
  }
  if(status === 'success' && page === 'signup') {
    return (
        <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
              <div>Welcome! {name},  Your are now signed up</div>
              <button style={{margin: '15px auto'}} onClick={closeModal}>X</button>
          </Modal>
        </div>
      );
  } else {
      return <div></div>
     
  }
    
}
 
const mapStateToProps = (state)=>({
    status: state.statuses.status,
    page: state.statuses.page,
    name: state.user.name
})
const mapDispatchToProps = (dispatch)=>({
    setFetchStatus: ()=>(dispatch(setFetchStatus({page: "", status: ""})))
})
export default connect(mapStateToProps, mapDispatchToProps)(Mod2)