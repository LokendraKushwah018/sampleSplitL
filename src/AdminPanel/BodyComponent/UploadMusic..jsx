import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from 'axios';
import { inputLabelClasses } from "@mui/material/InputLabel";
// import { PageHeader } from "../../Common/Components";
import { adminbaseurl } from '../../Api/Config'
import { useRef } from "react";
import Container from '../../Components/Adminlayout/Container'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PageHeader } from '../Common/Components'
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { Numbers } from "@mui/icons-material";
import '../css/UploadMusic.css'

const UploadMusic = () => {
  const Uploadtoast = () => {
    toast.success("Upload Successfully!")
  };
  // let token = localStorage.getItem('logintoken')
  const token = useSelector(state => state.admin.adminlogintoken)
  const imageinput = useRef();
  const musicinput = useRef();
  const [songcount, setSongcount] = useState([]);
  const [track, setTrack] = useState([]);
  const [uploadtype, setUploadType] = useState([]);
  // let [formerrors , setformErrors] = useState({});
  let [files, setImage] = useState(null);
  let [music, setMusic] = useState();
  let [trackTitle, settrackTitle] = useState('');
  let [trackType, settrackType] = useState('');
  let [bpm, setbpm] = useState('');
  let [keyOptional, setkeyOptional] = useState('');
  let [primaryGenre, setprimaryGenre] = useState('');
  let [type, setType] = useState('');
  let [formErrors, setformErrors] = useState({});
  let [isSubmit, setIsSubmit] = useState(false);


  const Search = (e) => {
    e.preventDefault();
    setformErrors(validate(trackTitle));
    setIsSubmit(true);
  }
  const api = () => {
    let formData = new FormData();
    formData.append('image', files);
    formData.append('music', music);
    formData.append('trackTitle', trackTitle);
    formData.append('trackType', trackType);
    formData.append('bpm', bpm);
    formData.append('keyOptional', keyOptional);
    formData.append('primaryGenre', primaryGenre);
    formData.append('type', type);
    axios(
      {
        url: `${adminbaseurl}audioUpload`,
        method: "post",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        data: formData,
      }
    ).then((response) => {
      console.log(response);
      imageinput.current.value = "";
      musicinput.current.value = "";
      settrackTitle("");
      settrackType("");
      setbpm("");
      setkeyOptional("");
      setprimaryGenre("");
      setType("");
      if (response.status === 201) {
        Uploadtoast();
      }
      else if (response.status === 200) {
        Uploadtoast();

      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const changecase = (e) => {
    e.preventDefault()
    setType(e.target.value.toLowerCase())
  }
  const changecaseone = (e) => {
    e.preventDefault()
    settrackType(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase())
  };

  const viewdata = () => {
    axios({
      url: `${adminbaseurl}countAllSong`,
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response)
      setSongcount(response.data.allSong[0].totalSong)
      setTrack(response.data.trackType[0])
      setUploadType(response.data.type[0])
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    viewdata();
    api();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }

  }, []);
  const validate = (e) => {
    // e.preventDefault();
    const errors = {}
    const regex = /[^a-zA-Z0-9_ ]/g;

    if (regex.test(trackTitle)) {
      console.log(false);
      errors.trackTitle = "  Special Character Not Allowed (@#!$%^&*()_+)"
    }
    else if (!regex.test(trackTitle)) {
      api();
      // errors.trackTitle = "True";
    }

    return errors;
  }

  return (
    <>
      <Container>
        <PageHeader title='Upload Music' />
        
        <div className="row"
        // style={{ width: 1050 , marginLeft:3}}
        >
          <div className="col-lg-6 ">
            {/* #343a40 -- Dark Gray*/}
            <div className="small-box text-dark" style={{ backgroundColor: '#2F76DB' }}>
              <div className="inner">
                <h3>{songcount} </h3>
                <p>Total Songs</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="small-box text-dark " style={{ backgroundColor: '#2F76DB' }}>
              <div className="inner"
                style={{ display: 'flex', justifyContent: 'center' }}>
                <h4> Private &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<br /> <b className="m-3">{uploadtype.private}</b></h4>
                <h4> Public &nbsp;&nbsp;&nbsp;&nbsp;<br />   <b className="m-3">{uploadtype.public}</b></h4> </div>
              <p style={{ textAlign: 'center' }}>Songs Type Count</p>

              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="small-box bg-secondary text-dark ">
              <div className="inner"
                style={{ display: 'flex', justifyContent: 'center' }}>
                <h4> Samples &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /> <b className="m-3">{track.Samples}</b></h4>
                <h4> Vocals &nbsp;&nbsp;&nbsp;&nbsp;<br /> <b className="m-3">{track.Vocals}</b></h4> </div>
              <p style={{ textAlign: 'center' }}>Song Track</p>

              <div className="icon">
                <i className="fas fa-music" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div className="small-box bg-secondary text-dark ">
              <div className="inner"
                style={{ display: 'flex', justifyContent: 'center' }}>
                <h4> Drums &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<br /> <b className="m-3">{track.Drums}</b></h4>
                <h4> Beats &nbsp;&nbsp;&nbsp;&nbsp;<br />   <b className="m-3">{track.Beats}</b></h4> </div>
              <p style={{ textAlign: 'center' }}>Song Track</p>

              <div className="icon">
                {/* <i className="ion ion-person-add" /> */}
                <i className="fas fa-music" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={Search} >
            <div className="input-group"  >
              <span className="input-group-text" ><b>Track Title</b></span>
              <input type="text" className="form-control" aria-label="Sizing example input" style={{ height: '55px' }}
                value={trackTitle} name="trackTitle" onChange={(e) => settrackTitle(e.target.value)}
                aria-describedby="inputGroup-sizing-default" />
              <p style={{ color: 'red', fontSize: '15px', marginTop: '-15px' }} >{formErrors.trackTitle}</p>
            </div>
            <div className="input-group"  >
              <span className="input-group-text" ><b>Track Type</b></span>
              <input type="text" className="form-control" aria-label="Sizing example input" style={{ height: '55px' }}
                label="Track Type" value={trackType} onKeyUp={changecaseone} required
                onChange={(e) => settrackType(e.target.value)}
                aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group"  >
              <span className="input-group-text" ><b>BPM(Beat per minute)</b></span>
              <input type="number" className="form-control" aria-label="Sizing example input" style={{ height: '55px' }}
                value={bpm} onChange={(e) => setbpm(e.target.value)} required
                aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group"  >
              <span className="input-group-text" ><b>Key(Optional)</b></span>
              <input type="text" className="form-control" aria-label="Sizing example input" style={{ height: '55px' }}
                value={keyOptional} onChange={(e) => setkeyOptional(e.target.value)} required
                aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group"  >
              <span className="input-group-text" ><b>Primary Genre</b></span>
              <input type="text" className="form-control" aria-label="Sizing example input" style={{ height: '55px' }}
                value={primaryGenre} onChange={(e) => setprimaryGenre(e.target.value)} required
                aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group" >
              <span className="input-group-text" ><b>Type</b></span>
              <input type="text" className="form-control" aria-label="Sizing example input" style={{ height: '55px' }}
                value={type} name="type" onKeyUp={changecase} onChange={(e) => setType(e.target.value)} required
                aria-describedby="inputGroup-sizing-default" />
            </div><br />
            <button type="button" className="imguploadbtn">Upload Image
              <input
                type="file"
                label='show'
                ref={imageinput}
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </button><br /><br />
            <button type="button" className="musicuploadbtn">Upload Song&nbsp;&nbsp;
              <input
                required
                onChange={(e) => setMusic(e.target.files[0])}
                type="file"
                ref={musicinput}
                
              />
            </button><br /><br />
            <button type="submit" className="uploadbtn ">Upload</button>
            <ToastContainer
              autoClose={1000}
              position="top-center"
              className="toast-container"
              toastClassName="dark-toast"
              theme="colored" />
            {/* <form onSubmit={Search} >
            <Box
              className="box"
              sx={{
                '& .MuiTextField-root': { m: 2, mt: 2, width: '100ch', ml: 4 },
              }}
              noValidate
              autoComplete="off"
              responsive="True"
            >
              <div style={{ display: 'flex-box' }}>
                <TextField
                  id="outlined-required"
                  label="Track Title"
                  value={trackTitle}
                  name="trackTitle"
                  required
                  type="text"
                  onChange={(e) => settrackTitle(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                      }
                    }
                  }}
                />
                <p style={{ color: 'red', fontSize: '15px', marginTop: '-15px' }} >{formErrors.trackTitle}</p>
                <TextField
                  id="outlined-required"
                  label="Track Type"
                  value={trackType}
                  onKeyUp={changecaseone}
                  required
                  onChange={(e) => settrackType(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                      }
                    }
                  }}
                />
            
                <TextField
                  id="outlined-required"
                  label="BPM(Beat per minute)"
                  value={bpm}
                  type="number"
                  onChange={(e) => setbpm(e.target.value)}
                  required
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                      }
                    }
                  }}
                />
                <TextField
                  id="outlined-required"
                  label="Key(Optional)"
                  value={keyOptional}
                  onChange={(e) => setkeyOptional(e.target.value)}
                  required
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                      }
                    }
                  }}
                />
                <TextField
                  id="outlined-required"
                  label="Primary genre"
                  value={primaryGenre}
                  onChange={(e) => setprimaryGenre(e.target.value)}
                  required
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                      }
                    }
                  }}
                />
                <TextField
                  id="outlined-required"
                  label="Type"
                  value={type}
                  name="type"
                  onKeyUp={changecase}
                  required
                  onChange={(e) => setType(e.target.value)}
                  InputLabelProps={{
                    sx: {
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // color: "white",
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ ml: 30, mt: 1 }}
                >
                  Upload Image
                  <input
                    type="file"
                    label='show'
                    ref={imageinput}
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Button>
                <ToastContainer
                  autoClose={1000}
                  position="top-center"
                  className="toast-container"
                  toastClassName="dark-toast"
                  theme="colored" />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ ml: 30, mt: 1 }}
                >
                  Upload Song&nbsp;
                  <input
                    required
                    onChange={(e) => setMusic(e.target.files[0])}
                    type="file"
                    ref={musicinput}
                  />
                </Button><br />
                <Button
                  // onClick={Search}
                  type="submit"
                  variant="contained"
                  sx={{ ml: 45, mt: 1 , mb:1}}
                >Upload</Button>
              </div>
            </Box>
          </form> */}
          </form>
        </div>
      </Container>
    </>
  );
}

export default UploadMusic