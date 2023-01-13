import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout'
import './Navbar.css';
import { logout } from '../../Pages/Dashboard/Auth/AuthSlice';
import { useDispatch } from 'react-redux';


const Section = styled.section`
   Width: 100%;
`

const Wrapper = styled.img`
Height: 25px;
margin-bottom:10px;

@media only screen and (max-width: 600px){
  margin-right:130px;
}
`

const Spacer = styled.span`
background: linear-gradient(to top right, rgb(29, 28, 28) 0%, rgb(124, 122, 122) 100%);
border-radius: 10px;

button: hover{
  background: #6c757e;
}

@media screen and (max-width:600px){
  background: linear-gradient(to top right, rgb(29, 28, 28) 0%, rgb(124, 122, 122) 100%);
  border-radius: 10px;
  Width: 100px;
  margin-left: 40px;
}
`
const Wrapperdiv = styled.div`
 a:hover{
  background: #1F2D5A;
  border-radius: 8px;
 }
//  .nav-link{
//   background: red;
//  }

`

const Navbar = () => {
  // const token = localStorage.getItem("userlogintoken")
  const dispatch = useDispatch()
  let Navigate = useNavigate();
  // const Userlogout = () => {

  //   axios(
  //     {
  //       url: 'http://localhost:5001/api/user/logOut',
  //       method: 'delete',
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     }).then((response) => {
  //       console.log(response.data)
  //       if (response.status === 200) {
  //         localStorage.removeItem('userlogintoken');
  //         Navigate("/userlogin");
  //       }
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  // }
  const userlogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    Navigate("/")
  }

  return (
    //  <nav className="navbar navbar-expand-lg  bg-dark ">
    //   <div className="container-fluid ">       
    //     <div className="navbar-brand text-light">SampleSplit</div>
    //     <div className="collapse navbar-collapse position-absolute top-50 start-50 translate-middle">
    //       <ul className="nav me-auto mb-2 mb-lg-2 ">
    //         <li className="nav-item">
    //           <Link className="nav-link active text-light" aria-current="page" to="/Home">Home</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active text-light" aria-current="page" to="/Freestem">FreeStem</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active text-light" aria-current="page" to="/Splitsong">SplitSong</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active text-light" aria-current="page" to="/UserBlog">UserBlog</Link>
    //         </li>
    //         <li className="nav-item">
    //         <Link className="nav-link active text-light" to="/About">About</Link>
    //         </li>         
    //         <li className="nav-item">
    //           <Link className="nav-link active text-light" to="/Contact" >ContactUs</Link>
    //         </li>
    //       </ul>
    //     </div>
    //     <LogoutIcon onClick={Userlogout} label={'Logout'}>Logout</LogoutIcon>       
    //   </div>
    // </nav>  

    <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
      <Section className="container-fluid text-white">
      <img src='./samplelogo.png' width={40} height={30} alt='...'/>
        <Wrapper src='./sample.png' 
        // width={150} height={25} style={{marginBottom: '9px'}} 
        alt='...'/>
        {/* <div className="navbar-brand text-light">SampleSplit</div> */}
        <button type="button"
          className="navbar-toggler "
          data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          style={{ backgroundColor: 'white' }}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarCollapse">
          <Wrapperdiv className="navbar-nav ml-5">
            <Link className="nav-link active text-light" to="/Home">Home</Link>
            <Link className="nav-link active text-light" to="/Freestem">FreeStem</Link>
            {/* <Link className="nav-link active text-light" to="/Splitsong">SplitSong</Link> */}
            <Link className="nav-link active text-light" aria-current="page" to="/UserBlog">Blog</Link>
            <Link className="nav-link active text-light" to="/About">About</Link>
            <Link className="nav-link active text-light" to="/Contact" >ContactUs</Link>
            <Link className="nav-link active text-light" to="/Useraccount" >My Account</Link>
          </Wrapperdiv>
          <div className="navbar-nav ms-auto ">
            <Spacer>
              <button className="btn text-white"
                type="submit"
                onClick={userlogout}>
                <LogoutIcon />Logout
              </button></Spacer>
          </div>
        </div>
      </Section>
    </nav>
  )
}

export default Navbar;