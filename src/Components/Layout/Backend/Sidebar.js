import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {

  return (

    <div>

      <aside className="main-sidebar sidebar-dark-primary elevation-4"
        style={{ position: 'fixed' }}>
        <div className="brand-link">
          <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">SampleSplit</span>
        </div>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/BlogPost" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>
                    Upload Music
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ViewMusic" className="nav-link">
                  <i className="nav-icon fas fa-copy" />
                  <p> View Music</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Analytics" className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p>
                    Analytics
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminDetails" className="nav-link">
                  <i className="nav-icon fas fa-tree" />
                  <p>Admin Details </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Blog" className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p> Blogs </p>
                </Link>
                <ul className="nav nav-treeview" />
              </li>
              {/* <li className="nav-item" onClick={logout}>
                <Link to="/adminlogin" className="nav-link">
                  <i className="nav-icon fas fa-table" />
                  <p> LogOut </p>
                </Link>
              </li> */}
               {/* <button className="btn btn-outline-success position-right"
              type="submit"
              onClick={logout}>Logout</button> */}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  )
}
export default Sidebar
