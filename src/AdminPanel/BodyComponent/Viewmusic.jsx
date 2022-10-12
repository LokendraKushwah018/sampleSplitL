import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { deletemusic, viewmusic, editmusic } from "../../../api/config";
import { Button } from "@mui/material";
import './AdminDetails.css'
import { PageHeader } from '../Common/Components'
import { MenuItem } from "@mui/material";
import { IconButton, Select } from "@material-ui/core";
import { InputLabel } from "@mui/material";
import { Modal } from "@mui/material";
import { Typography } from "@mui/material";
import Container from '../../Components/Layout/Backend/Container'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
// import { FormControl } from "@mui/material/FormControl";
import {FormControl} from "@mui/material";
import './AdminDetails.css'
import { addprice, changestatus, deletemusic, editmusic, updatemusic, viewmusic } from '../../Api/Config';
// import "./music.js"


const ViewMusic = () => {

  const hover = {
    cursor: 'pointer'
  }

  const [open, setOpen] = React.useState(false);
  const [updateId, SetupdateID] = useState("")
  const handleOpen = (id) => {
    console.log(id)
    SetupdateID(id)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }



  let [viewMusic, setViewMusicdetails] = useState([]);
  // let [songsedit, setsongsedit] = useState([]);
  let [imageName, setImage] = useState(null);
  let [music, setMusic] = useState(null);
  let [trackTitle, settrackTitle] = useState('');
  let [trackType, settrackType] = useState('');
  let [bpm, setbpm] = useState('');
  let [keyOptional, setkeyOptional] = useState('');
  let [primaryGenre, setprimaryGenre] = useState('');
  let [type, setType] = useState('');
  let [updatingID, setId] = useState("");
  let [data, updatedata] = useState({ price: "" });

  let token = localStorage.getItem("logintoken")
  // Edit API
  const setedit = (id) => {
    console.log(id)
    // api call 
    axios(
      {
        url: `${editmusic}${id}`,
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    ).then((response) => {
      console.log(response);
      // const a = response.data.getAudioById.id;
      const article = response.data.getAudioById
      setImage(article.imageName)
      setMusic(article.music)
      settrackTitle(article.trackTitle)
      settrackType(article.tracktype)
      setbpm(article.bpm);
      setkeyOptional(article.keyOptional);
      setprimaryGenre(article.primaryGenre);
      setType(article.type);
      setId(id)

      // setsongsedit(response.data.getAudioById);

    }).catch((err) => {
      console.log(err);
    })
    // res 
  }
  // useEffect(() => {
  //   app("Default");
  // }, [])
  const caturl = viewmusic;

  // View Music API
  const app = (c) => {
    axios(
      {
        url: `${caturl}?filterkey=${c}`,
        method: "get",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    ).then((response) => {
      console.log(response.data.allAudio);
      setViewMusicdetails(response.data.allAudio);

    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    app('');
  }, [])

  // Update Music  API
  const submit = (event, handle) => {
    event.preventDefault()
    let formData = new FormData();
    console.log(imageName, music, trackTitle, trackType, bpm, keyOptional, primaryGenre, type, updatingID)
    formData.append('image', imageName);
    formData.append('music', music);
    formData.append('trackTitle', trackTitle);
    formData.append('trackType', trackType);
    formData.append('bpm', bpm);
    formData.append('keyOptional', keyOptional);
    formData.append('primaryGenre', primaryGenre);
    formData.append('type', type);

    axios.put(`${updatemusic}${updatingID}`, formData, {
      headers: {
        "Content-type": "multipart/form-data", "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
      app('');
      console.log(res);
      if (res.status === 201) {
        window.alert("done");
      }
    }).catch((err) => {
      console.log(err)
    });
    // app();
  }

  // Make Public Private API
  const songstype = (updatingID, c) => {
    console.log(updatingID);
    axios(
      {
        url: `${changestatus}${updatingID}?type=${c}`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res);
      console.log(updatingID)
      app();

    }).catch((err) => {
      console.log(err);
    })
  };
  const show = (e) => {
    updatedata({ ...data, [e.target.name]: e.target.value });
  };
  const pp = (e, id) => {
    e.preventDefault()
    console.log(id)
    axios(
      {
        url: `${addprice}${updateId}`,
        method: "post",
        data: {
          amount: data.price
        },
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      console.log(response);
      // updatedata("")
    }).catch((err) => {
      console.log(err);

    })
  }
  return (
    <>
    <Container>
      {/* Music List Data ..app Api.. START */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Price
            </Typography>
            <form onSubmit={pp}>
              <div className="form-group m-1">
                <label>Price</label>
                <input type="number" className="form-control" name='price' value={data.price} onChange={show}
                  placeholder="price" />
              </div>
              <button type="submit" className="btn btn-primary m-1" >Submit</button>

            </form>

          </Box>
        </Modal>
      </div>
      <Box mt={2}>
        <PageHeader title='View Music' />

        <div style={{ maxWidth: 200 }}  >
          <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Your Tracks</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={10}

              // value={age}
              label="Age"
            // onChange={handleChange}
            >
              <MenuItem value={10} onClick={() => app('')} >Default</MenuItem>
              <MenuItem value={20} onClick={() => app('MostPlayed')} >MostPlayed</MenuItem>
              <MenuItem value={30} onClick={() => app('MostDiscuss')} >MostDiscussed</MenuItem>
              <MenuItem value={40} onClick={() => app('Latest')} >Letest</MenuItem>
              <MenuItem value={50} onClick={() => app('Oldest')} >Oldest</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Box>
      <div style={{ overflow: 'hidden' , width: '1050px' }}>
        {viewMusic.map((songs, index) => {
          return (
            <>
              <div className="bg-purple" style={{ width: '100%', height: '54px', margin: '10px', float: 'left' }}>
                <div key={index}>
                  <img src={songs.imageName} alt="/" style={{ width: '100px', height: '54px', float: 'left' }} />
                </div>
                <div style={{ height: '54px', float: 'left' }}>
                  <audio controls controlsList="nodownload noplaybackrate " style={{ backgroundColor: "#C8C8C8" }}>
                    <source src={songs.music} type="audio/ogg" />
                  </audio>
                </div >
                <div style={{ float: 'left', textAlign: 'center', width: '150px', height: '54px' }}>
                  <h5>{songs.trackTitle}</h5>
                  <p>{songs.trackType}</p>
                </div>
                <div style={{ float: 'left', textAlign: 'center', width: '100px', height: '54px' }}>
                  <h5>{songs.bpm}</h5>
                  <p>{songs.keyOptional}</p>
                </div>
                <div style={{ float: 'left', textAlign: 'center', width: '100px', height: '54px' }}>
                  <h5>{songs.primaryGenre}</h5>
                  <p>{songs.type}</p>
                </div>

                <IconButton hover={hover}>  <PaidIcon onClick={() => handleOpen(songs.id)} sx={{ color: '#1F2D5A' }} >Add Price</PaidIcon></IconButton>

                <IconButton hover={hover} >
                  <EditIcon
                    sx={{ color: '#2F76DB' }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      setedit(songs.id)
                    }}
                    data-bs-whatever="@getbootstrap"></EditIcon> </IconButton> &nbsp;&nbsp;&nbsp;&nbsp;
                <IconButton hover={hover} >
                  <DeleteIcon sx={{ color: 'red' }} variant="contained" onClick={async () => {
                    let res = await axios.delete(`${deletemusic}${songs.id}`, {
                      headers: {
                        "Authorization": `Bearer ${token}`
                      }
                    });
                    app();
                    console.log(res);
                    // if(res.status===204)
                    // {
                    //   alert("Music Deleted Successfully");
                    // }
                  }}></DeleteIcon> </IconButton> &nbsp;&nbsp;&nbsp;&nbsp;
                {/* }}>DELETE</Button>&nbsp;&nbsp;&nbsp;&nbsp; */}
                {/* <DeleteIcon /> */}
                <FormControl sx={{ m: 2, minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={songs.type}
                    // onChange={handleChange}
                    autoWidth
                    label="Age"
                  >
                    <MenuItem value="public" onClick={() => songstype(songs.id, 'public')}>public</MenuItem>
                    <MenuItem value="private" onClick={() => songstype(songs.id, 'private')} >private</MenuItem>
                  </Select>
                </FormControl>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "20px" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form onSubmit={submit} >
                        <div className="modal-body">
                          <div className="mb-3" >
                            <label className="col-form-label">trackTitle</label>
                            <input value={trackTitle} onChange={(e) => settrackTitle(e.target.value)}
                              name="trackTitle" type="text" className="form-control" id="recipient-name" />
                          </div><div className="mb-3">
                            <label a className="col-form-label">trackType</label>
                            <input value={trackType} onChange={(e) => settrackType(e.target.value)} type="text" className="form-control" id="recipient-name" />
                          </div><div className="mb-3">
                            <label className="col-form-label">bpm</label>
                            <input value={bpm} type="text" onChange={(e) => setbpm(e.target.value)} className="form-control" id="recipient-name" />
                          </div><div className="mb-3">
                            <label className="col-form-label">keyOptional</label>
                            <input value={keyOptional} type="text" onChange={(e) => setkeyOptional(e.target.value)} className="form-control" id="recipient-name" />
                          </div><div className="mb-3">
                            <label className="col-form-label">primaryGenre</label>
                            <input value={primaryGenre} type="text" onChange={(e) => setprimaryGenre(e.target.value)} className="form-control" id="recipient-name" />
                          </div><div className="mb-3">
                            <label className="col-form-label">type</label>
                            <input value={type} type="text" onChange={(e) => setType(e.target.value)} className="form-control" id="recipient-name" />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">Image</label>
                            <input type="file" className="form-control" id="recipient-name" onChange={(e) => setImage(e.target.files[0])} />
                            <img src={imageName} alt="/" style={{ width: '100px', height: '100px' }} />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">Music</label>
                            <input type="file" className="form-control" id="recipient-name" onChange={(e) => setMusic(e.target.files[0])} />
                            <audio controls >
                              <source src={music} type="audio/ogg" />
                            </audio>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="model" aria-label="Close"
                            //  onClick={() => {
                            //   submit(songs.id)
                            // }}
                            >Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>
      </Container>
    </>
  )
}
export default ViewMusic