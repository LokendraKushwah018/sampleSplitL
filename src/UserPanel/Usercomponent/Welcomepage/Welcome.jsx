import React from 'react'
import WelcomeNavbar from './WelcomeNavbar';
import Footer from '../../Userlayout/Footer';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '../../css/welcome.css'
// import './welcome.css'
// import { Button } from '@mui/material'
// import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
// import Carousel from 'react-bootstrap/Carousel';

const Welcome = () => {

  let  usertoken = useSelector(state=>state.auth.isLoggedIn === true)
  return (
    <>
      {usertoken ? <Navigate to="/Home" /> :
      <div>
      <WelcomeNavbar />
      <div className="nav bg-dark text-white "
        style={{
          width: "Auto", height: "30%", marginTop: 0,
          marginLeft: 0, textAlign: 'center'
        }}
      >
        <img src="./bg2.jpg" className="card-img" alt="..." />
        <div className="card-img-overlay "
          style={{ margin: 100, marginLeft: 120 }}>
          <h1 className="display-1">SampleSplit</h1>
          <h4
          // style={{ fontFamily: "Pacifico" }}
          >
            SampleSplit is the streaming app where music is more than sound. Meet us on stage,
            in the studio,and under the radar.
            For discovery from every angle, curated specifically for you.</h4>
          {/* <div style={{ marginTop: 70 }}>
            <div className="dropdown m-1" style={{ display: 'inline' }} >
              <button className="btn btn-secondary dropdown-toggle dropdown-menu-dark" type="button"
                id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"
                style={{ marginRight: 60 }}>
                Split Songs
              </button> */}
          {/* <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                <li><p className="dropdown-item"  >Vocals</p></li>
                <li><p className="dropdown-item" >Drums</p></li>
                <li><p className="dropdown-item" >Bass</p></li>
                <li><p className="dropdown-item" >Other Instruments</p></li>
              </ul> */}
          {/* <button type="button" className="btn btn-dark"
                style={{ marginRight: 60 }}>Upload Songs
                <input type="file" label='show' />
              </button>
              <Link to='./userlogin'>
                <button
                  className="btn btn-dark">Submit </button>
              </Link> */}
          {/* </div>
          </div> */}
        </div>
      </div>
      <h1 className="display-2 text-center text-black "
        style={{ marginTop: 0, fontFamily: "arial" }}
      >Recommended on SampleSplit</h1>
      {/* <div className="category" style={{ display: 'flex' }}>
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
        </div></div> */}
      <ImageList sx={{ width: "100%", height: 450 }} variant="woven" cols={3} gap={8}>
        {itemData.map((item , index) => (
          <ImageListItem key={index}>
            <img
              src={`${item.img}?w=161&fit=crop&auto=format`}
              srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={1} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={3} className="active" />
        </ol>
        <div id="carrousel" className="carousel-inner">
          <div data-pause="true" data-interval={10000} className="carousel-item active">
            <div className="videoSlider">
              <video width="100%" className="elVideo" loop="loop" autoPlay playsInline muted 
              src="./v1.mp4" id="video-slider-1">
              </video>
            </div>
          </div>
          <div data-pause="true" data-interval={10000} className="carousel-item">
            <div className="videoSlider">
              <video width="100%" className="elVideo" loop="loop" autoPlay playsInline muted 
              src="./v2.mp4" id="video-slider-2">
              </video>
            </div>
          </div>
          <div data-pause="true" data-interval={10000} className="carousel-item">
            <div className="videoSlider">
              <video width="100%" className="elVideo" loop="loop" autoPlay playsInline muted 
              src="./v3.mp4" id="video-slider-3">
              </video>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </a>
      </div>
      <Footer />
    </div>
}
    </>
  )
}

export default Welcome

const itemData = [
  {
    img: './mlsa.jpg',
    title: 'Bed',
  },
  {
    img: './Bee.jpg',
    title: 'Kitchen',
  },
  {
    img: './art.jpg',
    title: 'Sink',
  },
  {
    img: './Bee.jpg',
    title: 'Books',
  },
  {
    img: './Bee.jpg',
    title: 'Chairs',
  },
  {
    img: './mlsa.jpg',
    title: 'Candle',
  },
  {
    img: './art.jpg',
    title: 'Laptop',
  },
  {
    img: './Bee.jpg',
    title: 'Doors',
  },
  {
    img: './mlsa.jpg',
    title: 'Coffee',
  },
  {
    img: './Bee.jpg',
    title: 'Storage',
  },
  {
    img: './mlsa.jpg',
    title: 'Coffee table',
  },
  {
    img: './art.jpg',
    title: 'Blinds',
  },
];