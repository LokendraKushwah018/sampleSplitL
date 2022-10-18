import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LogoutIcon from '@mui/icons-material/Logout';
// import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  const token = localStorage.getItem("userlogintoken")
  let Navigate = useNavigate();
  const Userlogout = () => {
    axios(
      {
        url: 'http://localhost:5001/api/user/logOut',
        method: 'delete',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response.data)
        if (response.status === 200) {
          localStorage.clear();
          // localStorage.removeItem("token"); 
          // localStorage.removeItem('user'); 
          Navigate("/userlogin");
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
       <nav className="navbar navbar-expand-lg  bg-dark ">
        <div className="container-fluid ">       
          <div className="navbar-brand text-light">SampleSplit</div>
          <div className="collapse navbar-collapse position-absolute top-50 start-50 translate-middle">
            <ul className="nav me-auto mb-2 mb-lg-2 "
            >
              <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="/Home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="/Freestem">FreeStem</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="/Splitsong">SplitSong</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="/UserBlog">UserBlog</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link active text-light" to="/About">About</Link>
              </li>
              {/* <li className="nav-item dropdown"> */}
              {/* <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown"
           role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link> */}
              {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul> */}
              {/* </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link active text-light" to="/Search" >Search</Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link active text-light" to="/Contact" >ContactUs</Link>
              </li>
              {/* <li><Link to="#"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li> */}
            </ul>
          </div>
          <LogoutIcon onClick={Userlogout} label={'Logout'}>Logout</LogoutIcon>
          {/*  
          <button className="btn btn-outline-success"
              type="submit"
              onClick={Userlogout}>Logout</button> */}
        </div>
      </nav>
  
  )
}

export default Navbar;
