import React from 'react'
import '../css/Notfound.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <> 
  {/* <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p> */}
  <section className="error-container"
  style={{ backgroundColor: "#416475"}}>  
    <span>4</span>
    <span><span className="screen-reader-text">0</span></span>
    <span>4</span> 
    <h1 className='text-dark'>Error : Page Not Found </h1>
  <div className="link-container">
    <Link target="_blank" to="/home" className="more-link">Go Back To Home</Link>
  </div>
  </section>
        </>
    )
}

export default NotFound