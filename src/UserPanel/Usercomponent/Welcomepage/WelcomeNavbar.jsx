import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';

// import 'bootstrap/dist/css/bootstrap.min.css'
const Wrapper = styled.img`
 Height: 30px;
`

const Wrapperimg = styled.img`
 Height: 25px;
//  Width: 150px;
margin-bottom: 10px;

 @media only screen and (max-width:600px){
  margin-right:130px;
 }
 

`
const WelcomeNavbar = () => {

  return (
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
      <div className="container-fluid text-white">
        <Wrapper src='./samplelogo.png'
        //  width={40} height={30} 
        alt='...'/>
        <Wrapperimg src='./sample.png' 
        // width={150} height={25} 
        // style={{marginBottom: '9px'}} 
        alt='...'></Wrapperimg>
      {/* <div className="navbar-brand text-light">SampleSplit</div> */}
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
            <Link className='ml-5' to="/userlogin" variant="body2"
              style={{ color: 'white' ,textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/Usersignup" variant="body2" style={{ color: 'red', margin: 1, marginLeft: 25 , textDecoration: 'none'}}>
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