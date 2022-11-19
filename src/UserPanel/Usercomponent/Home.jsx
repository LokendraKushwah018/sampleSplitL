// import React from 'react';
// import { useState } from 'react';
// import Navbar from '../Userlayout/Navbar'
// import axios from 'axios';
// import { useRef } from "react";
// import Button from '@mui/material/Button';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Stack from '@mui/material/Stack';
// import LinearProgress from '@mui/material/LinearProgress';
// import "react-h5-audio-player/lib/styles.css";
// import AudioPlayer from "react-h5-audio-player";
// import { samplesplitsong } from '../../Api/Config';
// import '../css/home.css'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import FileSaver from 'file-saver';

// const Home = () => {
//   const musicinput = useRef();
//   const DownloadToast = () => {
//     toast.info("Your Daily Downloading Limit Expired");
//   }

//   const [stems, setStems] = useState();
//   const [file_name, setFile_name] = useState();
//   const [type, setType] = useState();
//   const [data, updateData] = useState();
//   const [vocals, setVocals] = useState(false);
//   const [fourvocals, setfourVocals] = useState(false);
//   const [accompaniment, setaccompaniment] = useState(false);
//   const [bass, setbass] = useState(false);
//   const [drums, setdrums] = useState(false);
//   const [other, setother] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [demo, updateDemo] = useState();
//   const token = useSelector(state => state.auth.userlogintoken);
//   const navigate = useNavigate();
//   const ErrorToast = () => {
//     toast.error("Try Again");
//   }

//   const models = (event) => {
//     event.preventDefault();
//     setVocals();
//     setaccompaniment(false);
//     setbass(false);
//     setdrums(false);
//     setfourVocals(false);
//     setother(false);
//     setLoading(true);
//     let formData = new FormData();
//     formData.append('stems', stems);
//     formData.append('file_name', file_name);
//     formData.append('type', type);
//     console.log(formData);
//     axios({
//       url: `${samplesplitsong}`,
//       method: 'post',
//       data: formData,
//     }).then((response) => {
//       console.log(response);
//       updateDemo(response.data.fileName);
//       console.log(response.data.fileName);
//       var d= response.data.fileName;
//       localStorage.setItem("trackTitle",d);
//       if (response.status === 200) {
//         event.target.reset();
//         setLoading(false);

//       }
//       // musicinput.current.value = "";

//       setType("")
//       if (response.data.vocals) {
//         setVocals(true);
//         updateData(response.data);
//       }
//       else if (response.data.accompaniment) {
//         setaccompaniment(true);
//         updateData(response.data);
//       }
//       else if (response.data.bass) {
//         setbass(true);
//         updateData(response.data);
//       }

//       else if (response.data.drums) {
//         setdrums(true);
//         updateData(response.data);
//       }
//       else if (response.data.other) {
//         setother(true);
//         updateData(response.data);
//       }
//       else if (response.data.fourStemsVocals) {
//         setfourVocals(true);
//         updateData(response.data);
//       }

//     }).catch((err) => {
//       console.log(err)
//       ErrorToast();
//       setLoading(false)
//     });
//   }
//   const download = (one) => {
//     console.log(one);
//     axios(
//       {
//         url: `http://localhost:5001/api/user/downloadedSong?trackTitle=${demo}`,
//         method: "get",
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       }
//     ).then((res) => {
//       console.log(res);
     
//       if (res.data.message === "Download Success") {
//         FileSaver.saveAs(one)
//         console.log("success")
//       }
//       if (res.data.status === "false") {
//         DownloadToast();
//         setTimeout(() => {
//           navigate("/buyplan");
//         }, 2000);
//       }

//     }).catch((err) => {
//       console.log(err);
//     })
//   }

//   return (
//     <>
//       <Navbar />

//       <ToastContainer
//         autoClose={2000}
//         position="top-center"
//         className="toast-container"
//         toastClassName="dark-toast"
//         theme="colored" />
//        {loading &&
//        <div>
//         <div className='loading'></div>
//        </div>
//         //  <Stack sx={{ width: '100%', color: 'grey.500', mb: 1 }} spacing={2}> 
//         //   <LinearProgress color="info" /><span style={{ textAlign: 'center', color: 'white' }}> 
//         //    [ Please wait while song is spliting.... ]</span> 
//         //  </Stack>
//         }
//       <div style={{ float: 'left' }}>
//         <form className="frame"
//           onSubmit={models}
//         >
//           <div className="dropdown " style={{ display: 'inline' }}>
//             <button className="btn btn-secondary dropdown-toggle" value="2stems" type='button'
//               onClick={(e) => setStems(e.target.value)}
//               id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
//               2stems
//             </button>
//             <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
//               <li><button className="dropdown-item" value="vocals" type='button'
//                 onClick={(e) => setType(e.target.value)}>Vocals</button></li>
//               <li><button className="dropdown-item" value="accompaniment" type='button'
//                 onClick={(e) => setType(e.target.value)}>Accompaniment</button></li>
//             </ul>
//           </div>
//           <Button
//             sx={{ ml: 12 }}
//             className='label'
//             variant="contained"
//             component="label"
//           >
//             Upload Song
//             <input
//               onChange={(e) => setFile_name(e.target.files[0])}
//               type="file"
//               ref={musicinput}
//               required
//             />
//           </Button>
//           <button type="submit" className='btn btn-primary'
//           >Submit</button>
//         </form>
//       </div>

//      {/* 4Stems Section Start   */}
//       <div style={{ float: 'left' }}>
//         <form className="fram"
//           onSubmit={models}
//         >
//           <div className="dropdown " style={{ display: 'inline' }} >
//             <button className="btn btn-secondary dropdown-toggle" value="4stems" type='button'
//               onClick={(e) => setStems(e.target.value)}
//               id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
//               4stems
//             </button>
//             <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2" >
//               <li ><button className="dropdown-item" value="vocals" type='button'
//                 onClick={(e) => setType(e.target.value)} >Vocals</button></li>
//               <li><button className="dropdown-item" value="bass" type='button'
//                 onClick={(e) => setType(e.target.value)}>Bass</button></li>
//               <li><button className="dropdown-item" value="drums" type='button'
//                 onClick={(e) => setType(e.target.value)}>Drums</button></li>
//               <li><button className="dropdown-item" value="other" type='button'
//                 onClick={(e) => setType(e.target.value)}>Other</button></li>
//             </ul>
//           </div>
//           <Button
//             sx={{ ml: 12 }}
//             className='label'
//             variant="contained"
//             component="label" >
//             Upload Song
//             <input
//               onChange={(e) => setFile_name(e.target.files[0])}
//               type="file"
//               ref={musicinput}
//               required />
//           </Button>
//           <button className='btn btn-primary'
//           >Submit</button>
//         </form>
//       </div>
//       {/* 4Stems Section End    */}
//       {vocals &&
//         <div style={{bottom:"0px",position:'fixed',width: '100% '}}>
//         <div style={{ float: 'left',width: '90%' }}>
//           <AudioPlayer
//             style={{
//               height: '70px', textAlign: 'center', background: 'black',
//               color: 'black',  margin: "00px", marginLeft: 0
//             }}
//             autoPlay={false}
//             controls={false}
//             src={data.vocals}
//             layout="horizontal"

//             showJumpControls={false} />
//         </div>
//         <div style={{ float: 'left',width:"10%" }}>
//           <button onClick={() => download(data.vocals)} style={{ height: '70px',width:"100%" ,borderRadius:'0px'}} className="btn btn-danger"  >download</button>
//         </div>
//       </div>
//       }
//       {accompaniment &&
//         <div>
//           <div style={{ float: 'left' }}>
//             <AudioPlayer
//               style={{
//                 height: '70px', textAlign: 'center', background: 'black',
//                 color: 'black', width: '400px', margin: "00px", marginLeft: 0
//               }}
//               autoPlay={false}
//               controls={false}
//               src={data.accompaniment}
//               layout="horizontal"

//               showJumpControls={false} />
//           </div>
//           <div style={{ float: 'left' }}>
//             <button onClick={() => download(data.accompaniment)} style={{ height: '70px' }} className="btn btn-danger"  >download</button>
//           </div>
//         </div>
//       }
//       {fourvocals &&
//          <div>
//          <div style={{ float: 'left' }}>
//            <AudioPlayer
//              style={{
//                height: '70px', textAlign: 'center', background: 'black',
//                color: 'black', width: '400px', margin: "00px", marginLeft: 0
//              }}
//              autoPlay={false}
//              controls={false}
//              src={data.fourStemsVocals}
//              layout="horizontal"

//              showJumpControls={false} />
//          </div>
//          <div style={{ float: 'left' }}>
//            <button onClick={() => download(data.fourvocals)} style={{ height: '70px' }} className="btn btn-danger"  >download</button>
//          </div>
//        </div>
//       }
//       {bass &&
//         <div>
//         <div style={{ float: 'left' }}>
//           <AudioPlayer
//             style={{
//               height: '70px', textAlign: 'center', background: 'black',
//               color: 'black', width: '400px', margin: "00px", marginLeft: 0
//             }}
//             autoPlay={false}
//             controls={false}
//             src={data.bass}
//             layout="horizontal"

//             showJumpControls={false} />
//         </div>
//         <div style={{ float: 'left' }}>
//           <button onClick={() => download(data.bass)} style={{ height: '70px' }} className="btn btn-danger"  >download</button>
//         </div>
//       </div>
//       }
//       {drums &&
//         <div>
//         <div style={{ float: 'left' }}>
//           <AudioPlayer
//             style={{
//               height: '50px', textAlign: 'center', background: 'black',
//               color: 'black', width: '400px', margin: "00px", marginLeft: 0
//             }}
//             autoPlay={false}
//             controls={false}
//             src={data.drums}
//             layout="horizontal"

//             showJumpControls={false} />
//         </div>
//         <div style={{ float: 'left' }}>
//           <button onClick={() => download(data.drums)} style={{ height: '70px' }} className="btn btn-danger"  >download</button>
//         </div>
//       </div>
//       }
//       {other &&
//        <div>
//        <div style={{ float: 'left' }}>
//          <AudioPlayer
//            style={{
//              height: '70px', textAlign: 'center', background: 'black',
//              color: 'black', width: '400px', margin: "00px", marginLeft: 0
//            }}
//            autoPlay={false}
//            controls={false}
//            src={data.other}
//            layout="horizontal"

//            showJumpControls={false} />
//        </div>
//        <div style={{ float: 'left' }}>
//          <button onClick={() => download(data.other)} style={{ height: '70px' }} className="btn btn-danger"  >download</button>
//        </div>
//      </div>
//       }
//     </>
//   );
// }
// export default Home

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
import { useNavigate } from 'react-router-dom';
import FileSaver from 'file-saver';

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
        url: `http://localhost:5001/api/user/downloadedSong?trackTitle=${demo}`,
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
          <Button
            sx={{ ml: 12 }}
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
          </Button>
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
          <Button
            sx={{ ml: 12 }}
            className='label'
            variant="contained"
            component="label" >
            Upload Song
            <input
              onChange={(e) => setMusic(e.target.files[0])}
              type="file"
              ref={musicinput}
              required />
          </Button>
          <button className='btn btn-primary'
          >Submit</button>
        </form>
      </div>
       {/* 4Stems Section End     */}
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
            <button onClick={() => download(data.vocals)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} className="btn btn-danger"  >download</button>
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
            <button onClick={() => download(data.accompaniment)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} className="btn btn-danger"  >download</button>
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
            <button onClick={() => download(fourdata.fourStemsVocals)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} className="btn btn-danger"  >download</button>
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
            <button onClick={() => download(fourdata.bass)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} className="btn btn-danger"  >download</button>
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
            <button onClick={() => download(fourdata.drums)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} className="btn btn-danger"  >download</button>
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
            <button onClick={() => download(fourdata.other)} style={{ height: '70px', width: "100%", borderRadius: '0px' }} className="btn btn-danger"  >download</button>
          </div>
        </div>
      }
    </>
  );
}
export default Home
