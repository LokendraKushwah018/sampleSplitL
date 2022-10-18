import React from 'react'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

const WelcomeNavbar = () => {
  

  return (
    <div>

      <nav className="navbar navbar-expand-lg  bg-dark ">
        <div className="container-fluid">  
    
          <div className="navbar-brand text-light">SampleSplit</div>
          <div className="collapse navbar-collapse position-absolute top-50 start-50 translate-middle">
            <ul className="nav me-auto mb-2 mb-lg-2 "
            // style={{fontFamily: "Proxima Nova"}}
            style={{fontFamily: "Decorative"}}
          >
            
              <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/">
                Home </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" 
                aria-current="page" to="#">
                  FreeStem</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="#">SplitSong</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="#">UserBlog</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active text-light" to="#">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" to="#" >Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" to="#" >ContactUs</Link>
              </li>
            </ul>
          </div>
            <div className='position-right'>
              <Link to="/userlogin" variant="body2"
              style={{color:'white'}}>
                 Login
              </Link>
              <Link to="/Usersignup" variant="body2" style={{color: 'red', margin:5, marginLeft:25}}>
               Create an Account
              </Link>            
              </div>
        </div>
      </nav>
    </div>
  )
}

export default WelcomeNavbar;

