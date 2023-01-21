import React from 'react'
import emailjs from 'emailjs-com'
import Navbar from '../Userlayout/Navbar';
import '../css/contact.css'
import Footer from '../Userlayout/Footer';

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
   

      {/* <div className="card text-light" 
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
      </div> */}

 <section className="mb-0 text-white" >
  <h2 className="h1-responsive font-weight-bold text-center text-white my-3">Contact us</h2>
  <p className="text-center w-responsive mx-auto mb-5">
    Do you have any questions? Please do not hesitate to contact us directly. 
    Our team will come back to you within a matter of hours to help you.</p>
  {/* <div className=""> */}
    <div className="col-md-9 mb-md-0 mb-5 ">
      <form name="contact-form" onSubmit={onSubmit}>
        <div className="formemail">
          <div className="col-md-6">
            <div className="md-form mb-0">
            <label className="contacttextname" htmlFor="name">
                Name
              </label><p className='contactname'>
              <input className="form-control" type="text" name="name" required />  </p>          
            </div>
          </div>
          <div className="col-md-6">
            <div className="md-form mb-0">
            <label className="contacttextname" htmlFor="email">
                Email
              </label><p className='contactemail'>
              <input className="form-control" type="email" name="email" required /></p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="md-form mb-0">
            <label className="contacttext" htmlFor="Subject">
                Subject
              </label><p className='contactsubject'>
              <input className="form-control" type="text" name="subject" required ></input></p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="md-form">
            <label className="contacttext" htmlFor="message">
                Message
              </label><p className='contactmsg'>
              <textarea className="form-control md-textarea" name="message" required /></p>
            {/* <label htmlFor="message">Your message</label>
              <textarea type="text"  name="message" rows={2} className="form-control md-textarea"/> */}
            </div>
          </div>
        </div>    
      <div className="contactbtn">
      <button className="btn btn-lg mt-4 text-white" type="submit"
       style={{backgroundColor:"#1F2D5A"}}>{formStatus}</button>
      </div>
      </form>
      <div className="status" />
    </div>
    {/* <div className="col-md-3 text-center " style={{marginRight: '0px'}}>
      <ul className="list-unstyled mb-0 " >
        <li ><i className="fas fa-map-marker-alt fa-2x "  style={{color:"#1F2D5A"}}/>
          <h5>San Francisco, CA 94126, USA</h5>
        </li>
        <li><i className="fas fa-phone mt-4 fa-2x" style={{color:"#1F2D5A"}}/>
          <h5>+ 01 234 567 89</h5>
        </li>
        <li><i className="fas fa-envelope mt-4 fa-2x" style={{color:"#1F2D5A"}}/>
          <h5>contact@samplesplit.com</h5>
        </li>
      </ul>
    </div> */}
  {/* </div> */}
</section> 
<h6 style={{color:"#343a40"}}>fs</h6>  
        <Footer />
    </>
  )
}
export default Contact
