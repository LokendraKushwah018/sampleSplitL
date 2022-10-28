import React ,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {
  const token = localStorage.getItem("logintoken")
  let Navigate = useNavigate();

  console.log(token)
  const logout = () => {
    axios(
      {
        url: 'http://localhost:5001/api/admin/logOut',
        method: "delete",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.removeItem('logintoken');
          Navigate("/adminlogin");
          // window.location.href = "/adminlogin";

        }
      })
      .catch((err) => {
        console.log(err);
      })
        

  }
  // useEffect(()=> {
  //  logout(token)
  // },[])

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-dark ">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
              <i className="fas fa-bars" /></Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {/* <li className="nav-item"> */}
            {/* <Link className="nav-link" data-widget="navbar-search" to="#" role="button">
              <i className="fas fa-search" />
            </Link> */}
            {/* <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div> */}
          {/* </li> */}
          {/* <li className="nav-item" >
            <Link to="/adminlogin" className="nav-link" onClick={logout}>
              <p> LogOut </p>
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" data-widget="fullscreen" to="#" role="button">
              <i className="fas fa-expand-arrows-alt" />
            </Link>
          </li>
          <span>
           <button className="btn btn-outline-success position-right"
              type="submit"
              onClick={logout}>
              <LogoutIcon />Logout
              </button></span>
        </ul>
      </nav>
    </div>
  )
}

export default Header
