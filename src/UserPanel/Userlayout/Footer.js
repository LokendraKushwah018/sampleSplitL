import React from 'react'
import { Link } from 'react-router-dom'
import '../css/footer.css'

const Footer = () => {
  return (
    <div>
<div className="footer-basic">
  <footer>
    <div className="social">
      
    <Link to="#"><i style={{color: '#f80001'}} className="icon ion-social-youtube" /></Link>
    <Link to="#" ><i className="icon ion-social-twitter" style={{color: '#31a1f2'}} /></Link>
   <Link to="#"><i style={{color: '#e24293'}} className="icon ion-social-instagram" /></Link>
    <Link to="#"><i style={{color: '#3B5998'}} className="icon ion-social-facebook" /></Link>
    </div>
    <ul className="list-inline">
      <li className="list-inline-item"><Link to="#">Home</Link></li>
      <li className="list-inline-item"><Link to="#">Services</Link></li>
      <li className="list-inline-item"><Link to="#">About</Link></li>
      <li className="list-inline-item"><Link to="#">Terms</Link></li>
      <li className="list-inline-item"><Link to="#">Privacy Policy</Link></li>
    </ul>
    <h4 className="copyright">SampleSplit.Com © 2022-23</h4>
  </footer>
</div> 
    </div>
  )
}

export default Footer
