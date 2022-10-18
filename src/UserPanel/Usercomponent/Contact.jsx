import React from 'react'
import emailjs from 'emailjs-com'
import Navbar from '../UserBackend/Navbar';


const Contact = () => {

  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    e.target.reset();
    emailjs.sendForm('service_oup7zou', 'template_gujdbxo', e.target, 'DVxDLyoWzOz8krDSw')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    setFormStatus('Message Sent');
    let { name, email, message, Subject } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      Subject: Subject.value,
      message: message.value,
    }
    console.log(conFom); 
  }

  return (
    <>
    <Navbar />
      <div className="card text-light" 
      style={{ width: 650, marginLeft: 300, marginTop:40,backgroundColor: "#1F2D5A" }}>
        <div className="container mt-2">
          <h2 className="mb-3 text-center">ContactUs Form </h2>
          <form onSubmit={onSubmit}
          >
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="form-control" type="text" name="name" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input className="form-control" type="email" name="email" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Subject">
                Subject
              </label>
              <input className="form-control" type="text" name="subject" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="message">
                Message
              </label>
              <textarea className="form-control" name="message" required />
            </div>
            <button className="btn btn-danger" type="submit" >
              {formStatus}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
export default Contact



// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Toast from 'react-bootstrap/Toast';

// function Contact() {
//   const [showing, setShow] = useState(false);

//   return (
//     <Row>
//       <Col xs={6}>
//         <Toast onClose={() => setShow(false)} showing={showing} delay={3000} autohide>
//           <Toast.Header>        
//             <strong className="me-auto">Bootstrap</strong>
//           </Toast.Header>
//         </Toast>
//       </Col>
//       <Col xs={6}>
//         <Button onClick={() => setShow(true)}>Show Toast</Button>
//       </Col>
//     </Row>
//   );
// }

// export default Contact;