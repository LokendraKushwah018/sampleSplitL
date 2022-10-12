import React from 'react'
import { Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  return (
    <div>
       
        <nav className="navbar navbar-expand-lg  bg-dark ">
  <div className="container-fluid ">
    <div className="navbar-brand text-light">SampleSplit</div>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button> */}
    <div className="collapse navbar-collapse position-absolute top-50 start-50 translate-middle">
      <ul className="nav me-auto mb-2 mb-lg-2 ">
        <li className="nav-item">
          <Link className="nav-link active text-light" aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-light" aria-current="page" to="/Freestem">FreeStem</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-light" aria-current="page" to="#">SplitSong</Link>
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
        <li className="nav-item">
          <Link className="nav-link active text-light" to="/Search" >Search</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-light" to="/Contact" >ContactUs</Link>
        </li>
        {/* <li><Link to="#"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li> */}

      </ul>
      
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
