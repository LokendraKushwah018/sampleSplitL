import React from 'react'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

const WelcomeNavbar = () => {

  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
      <div className="container-fluid text-white">
      <div className="navbar-brand text-light">SampleSplit</div>
        <button type="button" className="navbar-toggler text-white" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon text-white" />
        </button>
        <div className="collapse navbar-collapse " id="navbarCollapse">
          <div className="navbar-nav ml-5">
            <Link className="nav-link active text-light" to="/">Home</Link>
            <Link className="nav-link active text-light" to="#">FreeStem</Link>
            {/* <Link className="nav-link active text-light" to="#">SplitSong</Link> */}
            <Link className="nav-link active text-light" to="#">UserBlog</Link>
            <Link className="nav-link active text-light" to="#">About</Link>
            <Link className="nav-link active text-light" to="#" >ContactUs</Link>
          </div>
          {/* <div className="navbar-nav ms-auto ">
            <span>
          <button className="btn btn-outline-success"
              type="submit"
              onClick={Userlogout}>
              <LogoutIcon />Logout
              </button></span>
          </div> */}
          <div className='navbar-nav ms-auto mr-3'>
            <Link className='mr-1' to="/userlogin" variant="body2"
              style={{ color: 'white' }}>
              Login
            </Link>
            <Link to="/Usersignup" variant="body2" style={{ color: 'red', margin: 1, marginLeft: 25 }}>
              <span>Create an Account</span>
            </Link>
          </div>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default WelcomeNavbar;

