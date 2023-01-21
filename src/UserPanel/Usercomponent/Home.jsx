import React from 'react';
import { useState } from 'react';
import Navbar from '../Userlayout/Navbar'
import axios from 'axios';
import { useRef } from "react";
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import '../css/home.css'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FileSaver from 'file-saver';
import { userbaseurl } from '../../Api/Config';
// import Footer from '../../Components/Adminlayout/Footer';
import styled from '@emotion/styled';
import Footer from '../Userlayout/Footer';
// import Footer from '../Userlayout/Footer';

const Wrapper = styled.div`
background: dark;
margin-top: 517px;
height: 50px;
margin-bottom: -30px;
`
const Label  = styled.div`

  display: flex;
  position: center;
  text-decoration: none;
  color: silver;
  font-size: 1.5em; 

`

const Home = () => {
  const musicinput = useRef();
  const DownloadToast = () => {
    toast.info("Your Daily Downloading Limit Expired");
  }
  const twostemToast = () => {
    toast.success("2Stem Song Splited Successfully!");
  }
  const fourstemToast = () => {
    toast.success("4Stem Song Splited Successfully!");
  }
  const [file_name, setFile_name] = useState();
  const [type, setType] = useState();
  const [music, setMusic] = useState();
  const [data, updateData] = useState();
  const [fourdata, updatefourData] = useState();
  const [vocals, setVocals] = useState(false);
  const [fourvocals, setfourVocals] = useState(false);
  const [accompaniment, setaccompaniment] = useState(false);
  const [bass, setbass] = useState(false);
  const [drums, setdrums] = useState(false);
  const [other, setother] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demo, updateDemo] = useState();
  const [first, setfirst] = useState('');
  const [second, setsecond] = useState('');

  // const [value, setValue] = useState('');

  const token = useSelector(state => state.auth.userlogintoken);

  const navigate = useNavigate();
  const ErrorToast = () => {
    toast.error("Try Again");
  }

  const twomodel = (event) => {
    event.preventDefault();
    setVocals(false);
    setaccompaniment(false);
    setbass(false);
    setdrums(false);
    setfourVocals(false);
    setother(false);
    setLoading(true);
    let formData = new FormData();
    formData.append('file_name', file_name);
    formData.append('type', type);
    console.log(formData);
    axios({
      url: `http://192.168.29.237:5001/api/user/getTwoStemsAudio`,
      method: 'post',
      data: formData,
    }).then((response) => {
      console.log(response);
      setfirst('');
      updateDemo(response.data.filename);
      console.log(response.data.fileName);
      var d = response.data.fileName;
      localStorage.setItem("trackTitle", d);
      if (response.status === 200) {
        event.target.reset();
        setLoading(false);
        twostemToast();
      }
      setType("")
      if (response.data.vocals) {
        setVocals(true);
        updateData(response.data);
      }
      else if (response.data.accompaniment) {
        setaccompaniment(true);
        updateData(response.data);
      }
    }).catch((err) => {
      console.log(err)
      ErrorToast();
      setLoading(false)
    });
  }

  const fourmodel = (event) => {
    event.preventDefault();
    setVocals(false);
    setaccompaniment(false);
    setfourVocals(false);
    setbass(false);
    setdrums(false);
    setfourVocals(false);
    setother(false);
    setLoading(true);
    let formData = new FormData();
    formData.append('music', music);
    formData.append('type', type);
    console.log(formData);
    axios({
      url: `http://192.168.29.237:5001/api/user/getFourStemsAudio`,
      method: 'post',
      data: formData,
    }).then((response) => {
      console.log(response);
      setsecond('');
      updateDemo(response.data.filename);
      console.log(response.data.fileName);
      var d = response.data.fileName;
      localStorage.setItem("trackTitle", d);
      if (response.status === 200) {
        event.target.reset();
        setLoading(false);
        fourstemToast();
      }
      setType("")
      if (response.data.fourStemsVocals) {
        setfourVocals(true);
        updatefourData(response.data);
      }
      else if (response.data.bass) {
        setbass(true);
        updatefourData(response.data);
      }

      else if (response.data.drums) {
        setdrums(true);
        updatefourData(response.data);
      }
      else if (response.data.other) {
        setother(true);
        updatefourData(response.data);
      }

    }).catch((err) => {
      console.log(err)
      ErrorToast();
      setLoading(false)
    });
  }
  const download = (one) => {
    console.log(one);
    axios(
      {
        url: `${userbaseurl}downloadedSong?trackTitle=${demo}`,
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res);

      if (res.data.message === "Download Success") {
        FileSaver.saveAs(one)
        console.log("success")
      }
      if (res.data.status === "false") {
        DownloadToast();
        setTimeout(() => {
          navigate("/buyplan");
        }, 2000);
      }

    }).catch((err) => {
      console.log(err);
    })
  }

  // const handlechange = (e) => {
  //   setValue(e.target.value)
  // }  
  
  return (
    <>    
      <Navbar />
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored" />
    {loading &&
        <div>
          <div className='loading'></div>
        </div>
        //  <Stack sx={{ width: '100%', color: 'grey.500', mb: 1 }} spacing={2}> 
        //   <LinearProgress color="info" /><span style={{ textAlign: 'center', color: 'white' }}> 
        //    [ Please wait while song is spliting.... ]</span> 
        //  </Stack>
      }
      {/* <select onChange={(e)=> setValue(e.target.value)} value={value}>
  <option>Select one</option>
  <option value="Orange">Orange</option>
  <option value="Radish">Radish</option>
  <option value="Cherry">Cherry</option>
</select><p>You selected  {value}</p> */}
      <div>
      <div style={{ float: 'left' }} >
        <form className="frame"
          onSubmit={twomodel}
        >
          <div className="dropdown " style={{ display: 'inline' }}>
            <button className="btn btn-secondary dropdown-toggle" value="2stems" type='button'
              id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
            2Stem&nbsp;&nbsp;{first}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
              <li  onClick={()=>setfirst('Vocals')}><button className="dropdown-item" value="vocals" type='button'
                onClick={(e) => setType(e.target.value)}>Vocals</button></li>
              <li onClick={()=>setfirst('Accompaniment')}><button className="dropdown-item" value="accompaniment" type='button'
                onClick={(e) => setType(e.target.value)}  >Accompaniment</button></li>
            </ul>
          </div>
          <p className='labelp'>
          <Button            
            className='label'
            variant="contained"
            component="label"
          >
            Upload Song
            <input              
              onChange={(e) => setFile_name(e.target.files[0])}
              type="file"
              ref={musicinput}
              required
            />
          </Button></p>
          <button type="submit" className='btn btn-primary'
          >Submit</button>
        </form>
      </div>
      
       {/* 4Stems Section Start    */}
      <div style={{ float: 'left' }}>
        <form className="fram"
          onSubmit={fourmodel}
        >
          <div className="dropdown " style={{ display: 'inline' }} >
            <button className="btn btn-secondary dropdown-toggle" value="4stems" type='button'
              id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              4Stem&nbsp;&nbsp;{second}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2" >
              <li onClick={()=>setsecond('Vocals')} ><button className="dropdown-item" value="vocals" type='button'
                onClick={(e) => setType(e.target.value)} >Vocals</button></li>
              <li onClick={()=>setsecond('Bass')} ><button className="dropdown-item" value="bass" type='button'
                onClick={(e) => setType(e.target.value)}>Bass</button></li>
              <li onClick={()=>setsecond('Drums')}><button className="dropdown-item" value="drums" type='button'
                onClick={(e) => setType(e.target.value)}>Drums</button></li>
              <li onClick={()=>setsecond('Other')} ><button className="dropdown-item" value="other" type='button'
                onClick={(e) => setType(e.target.value)}>Other</button></li>
            </ul>
          </div>
          <p className='labelp'>
          <Button            
            className='label'
            variant="contained"
            component="label" >
            Upload Song
            <input
              onChange={(e) => setMusic(e.target.files[0])}
              type="file"
              ref={musicinput}
              required />
          </Button></p>
          <button className='btn btn-primary'
          >Submit</button>
        </form>
      </div> 
      </div>
       {/* 4Stems Section End     */}


       {/* Audio Section Start  */}
      {vocals &&
        <div style={{ bottom: "0px", position: 'fixed', width: '100% ' }}>
          <div style={{ float: 'left', width: '90%' }}>
            <AudioPlayer
              style={{
                height: '70px', textAlign: 'center', background: 'black',
                color: 'black', margin: "00px", marginLeft: 0
              }}
              autoPlay={false}
              controls={false}
              src={data.vocals}
              layout="horizontal"
              showJumpControls={false} />
          </div>
          <div style={{ float: 'left', width: "10%" }}>
            <button onClick={() => download(data.vocals)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} 
            className="btn btn-danger"  >download</button>
          </div>
        </div>
      }
      {accompaniment &&
        <div style={{ bottom: "0px", position: 'fixed', width: '100% ' }}>
          <div style={{ float: 'left', width: '90%' }}>
            <AudioPlayer
              style={{
                height: '70px', textAlign: 'center', background: 'black',
                color: 'black', margin: "00px", marginLeft: 0
              }}
              autoPlay={false}
              controls={false}
              src={data.accompaniment}
              layout="horizontal"

              showJumpControls={false} />
          </div>
          <div style={{ float: 'left', width: "10%" }}>
            <button onClick={() => download(data.accompaniment)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} 
            className="btn btn-danger"  >download</button>
          </div>
        </div>
      }

      {fourvocals &&
        <div style={{ bottom: "0px", position: 'fixed', width: '100% ' }}>
          <div style={{ float: 'left', width: '90%' }}>
            <AudioPlayer
              style={{
                height: '70px', textAlign: 'center', background: 'black',
                color: 'black', margin: "00px", marginLeft: 0
              }}
              autoPlay={false}
              controls={false}
              src={fourdata.fourStemsVocals}
              layout="horizontal"

              showJumpControls={false} />
          </div>
          <div style={{ float: 'left', width: "10%" }}>
            <button onClick={() => download(fourdata.fourStemsVocals)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} 
            className="btn btn-danger"  >download</button>
          </div>
        </div>
      }
      {bass &&
        <div style={{ bottom: "0px", position: 'fixed', width: '100% ' }}>
          <div style={{ float: 'left', width: '90%' }}>
            <AudioPlayer
              style={{
                height: '70px', textAlign: 'center', background: 'black',
                color: 'black', margin: "00px", marginLeft: 0
              }}
              autoPlay={false}
              controls={false}
              src={fourdata.bass}
              layout="horizontal"

              showJumpControls={false} />
          </div>
          <div style={{ float: 'left', width: "10%" }}>
            <button onClick={() => download(fourdata.bass)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} 
            className="btn btn-danger"  >download</button>
          </div>
        </div>
      }
      {drums &&
        <div style={{ bottom: "0px", position: 'fixed', width: '100% ' }}>
          <div style={{ float: 'left', width: '90%' }}>
            <AudioPlayer
              style={{
                height: '70px', textAlign: 'center', background: 'black',
                color: 'black', margin: "00px", marginLeft: 0
              }}
              autoPlay={false}
              controls={false}
              src={fourdata.drums}
              layout="horizontal"

              showJumpControls={false} />
          </div>
          <div style={{ float: 'left', width: "10%" }}>
            <button onClick={() => download(fourdata.drums)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} 
            className="btn btn-danger"  >download</button>
          </div>
        </div>
      }
      {other &&
        <div style={{ bottom: "0px", position: 'fixed', width: '100% ' }}>
          <div style={{ float: 'left', width: '90%' }}>
            <AudioPlayer
              style={{
                height: '70px', textAlign: 'center', background: 'black',
                color: 'black', margin: "00px", marginLeft: 0
              }}
              autoPlay={false}
              controls={false}
              src={fourdata.other}
              layout="horizontal"

              showJumpControls={false} />
          </div>
          <div style={{ float: 'left', width: "10%" }}>
            <button onClick={() => download(fourdata.other)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} 
            className="btn btn-danger"  >download</button>
          </div>
        </div>
      }

             {/* Audio Section End  */}
   <h6 style={{color:"#343a40"}}>
 fssffsfsd
 fssffsfsdfsdfs
</h6>          
 
 
<div>
      
<Footer style={{margin: '0px 0px 30px 0px'}}></Footer> </div>

     
 
     {/* dgggjkfdgj
     gdgkjdfgdgkjd
     hhfhf
     <footer className="page-footer font-small  darken-4 py-4 bg-secondary">
  <div className="container">
    <div className="row">
      <div className="col-md-6 d-flex justify-content-start">
        <div className="footer-copyright text-center bg-transparent">© 2019 Copyright:
          <a href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-end">
        <ul className="list-unstyled d-flex mb-0">
          <li>
            <a className="mr-3" role="button"><i className="fab fa-facebook-f" /></a>
          </li>
          <li>
            <a className="mr-3" role="button"><i className="fab fa-twitter" /></a>
          </li>
          <li>
            <a className="mr-3" role="button"><i className="fab fa-instagram" /></a>
          </li>
          <li>
            <a className role="button"><i className="fab fa-youtube" /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer> */}
    </>
  );
}
export default Home
