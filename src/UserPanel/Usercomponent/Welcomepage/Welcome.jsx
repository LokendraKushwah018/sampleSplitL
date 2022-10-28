import React from 'react'
import WelcomeNavbar from './WelcomeNavbar'
// import './welcome.css'
// import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

const Welcome = () => {
  return (
    <div>
      <WelcomeNavbar />
      <div className="nav bg-dark text-white "
        style={{
          width: "Auto", height: "30%", marginTop: 0  ,
          marginLeft: 0, textAlign: 'center'
        }}
      >
        <img src="./bg2.jpg" className="card-img" alt="..." />
        <div className="card-img-overlay "
          style={{ margin: 50 }}>
          <h1 className="display-1">SampleSplit</h1>
          <h4
            // style={{ fontFamily: "Pacifico" }}
          >
            SampleSplit is the streaming app where music is more than sound. Meet us on stage,
            in the studio,and under the radar.
            For discovery from every angle, curated specifically for you.</h4>
          <div style={{ marginTop: 70 }}>
            <div className="dropdown m-1" style={{ display: 'inline' }} >
              <button className="btn btn-secondary dropdown-toggle dropdown-menu-dark" type="button"
                id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"
                style={{ marginRight: 60 }}>
                Split Songs
              </button>
              <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                <li><p className="dropdown-item"  >Vocals</p></li>
                <li><p className="dropdown-item" >Drums</p></li>
                <li><p className="dropdown-item" >Bass</p></li>
                <li><p className="dropdown-item" >Other Instruments</p></li>
              </ul>
              <button type="button" className="btn btn-dark"
                style={{ marginRight: 60 }}>Upload Songs
                <input type="file" label='show' />
              </button>
              <Link to='./userlogin'>
                <button
                  className="btn btn-dark">Submit </button>
              </Link>
            </div>
          </div>
        </div>
      </div>      
      <h1 className="display-2 text-center text-black "
      style={{ marginTop:0 , fontFamily: "arial" }}
      >Recommended on SampleSplit</h1>
      <div className="category" style={{ display: 'flex' }}>
        <div className='categoryCard' >
          <img src="./Kabza.jpg" alt="..."
            style={{ width: '100%', height: '50%'}} />
        </div>
        &nbsp;
        <div className='categoryCard' >
          <img src="./Bee.jpg" alt="..." style={{ width: "100%", height: '50%' }} />
        </div>
        &nbsp;
        <div className='categoryCard'>
          <img src="./mlsa.jpg" alt="..." style={{ width: "100%", height: '50%' }}
          />
        </div></div>


        {/* <Button>Play</Button> */}
      
{/* 
      <div className="category" style={{margin:'20px 0px 0px 60px'}}>
             <div className='categoryCard' >
                  <img src="./Bee.jpg" alt="responsive" />
             </div>
             &nbsp;
             <div className='categoryCard' >
                  <img src="./art.jpg" alt="responsive" />
             </div>
             &nbsp;
             <div className='categoryCard' >
                  <img src="./mlsa.jpg" alt="responsive" />
             </div>
           
             &nbsp;
             <div className='categoryCard' >
                  <img src="./Small.jpeg" alt="responsive" />
             </div> */}
       {/* </div>              */}
    </div>

  )
}

export default Welcome