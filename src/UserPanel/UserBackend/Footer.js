import React from 'react'
import '../css/footer.css'

const Footer = () => {
  return (
    <div>
<div className="footer-basic">
  <footer>
    <div className="social"><a href="#"><i className="icon ion-social-instagram" /></a>
    <a href="#"><i className="icon ion-social-snapchat" /></a>
    <a href="#"><i className="icon ion-social-twitter" /></a>
    <a href="#"><i className="icon ion-social-facebook" /></a>
    </div>
    <ul className="list-inline">
      <li className="list-inline-item"><a href="#">Home</a></li>
      <li className="list-inline-item"><a href="#">Services</a></li>
      <li className="list-inline-item"><a href="#">About</a></li>
      <li className="list-inline-item"><a href="#">Terms</a></li>
      <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
    </ul>
    <h4 className="copyright">SampleSplit.Com © 2022-23</h4>
  </footer>
</div>

 
    </div>
  )
}

export default Footer
