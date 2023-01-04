import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import './AdminDetails.css''
import '../css/AdminDetails.css'
import { PageHeader } from '../Common/Components'
import { MenuItem } from "@mui/material";
import { Select } from "@material-ui/core";
import { InputLabel } from "@mui/material";
import Container from '../../Components/Adminlayout/Container'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
// import './AdminDetails.css'
import { adminbaseurl } from '../../Api/Config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import '../css/viewMusic.css'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  text: 'dark',
  p: 4,
};

const ViewMusic = () => {

  const hover = {
    cursor: 'pointer'
  }
  const Deletetoast = () => {
    toast.success("Delete Successfully !");
  };
  const Edittoast = () => {
    toast.success("Edit Successfully !");
  };
  const ChangeStatustoast = () => {
    toast.success("Changed Successfully !");
  };

  const WarningStatustoast = () => {
    toast.error("You Need to Change TrackTitle With Image or Audio!");
  };

  const handleOpen = (id) => {
    console.log(id)
    SetupdateID(id)
    setOpen(true);
  }

  const [open, setOpen] = React.useState(false);
  const [updateId, SetupdateID] = useState("")
  // const [pages, setPages] = useState([]);
  const handleClose = () => setOpen(false);
  let [viewMusic, setViewMusicdetails] = useState([]);
  let [imageName, setImage] = useState(null);
  let [music, setMusic] = useState();
  let [trackTitle, settrackTitle] = useState('');
  let [trackType, settrackType] = useState('');
  let [bpm, setbpm] = useState('');
  let [keyOptional, setkeyOptional] = useState('');
  let [primaryGenre, setprimaryGenre] = useState('');
  let [type, setType] = useState('');
  let [updatingID, setId] = useState("");
  let [data, updatedata] = useState({ price: "" });
  let [selecttwoinput, setSelecttwoinput] = useState('')
  // const [donateid, setDonateID] = useState([])
  const [editmodel, setEditModel] = useState([])
  const [datas, setdatas] = useState({amount: ''})  
  const token = useSelector(state => state.admin.adminlogintoken)


  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'black',
  //   color: 'white',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // }


  // Edit API
  const setedit = (id) => {
    // console.log(id)
    // api call 
    axios(
      {
        url: `${adminbaseurl}editAudio/${id}`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    ).then((response) => {
      setEditModel(response.data.getAudioById);
      console.log(response.data.getAudioById);
      //  setDonateID(response.data.getAudioById.id);
      //  console.log(donateid)
      console.log(open)
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


  // const Click = (h) => {
  //   // setDataupdate(false)
  //   axios(
  //     {
  //       url: `${caturl}?filterkey=Drums&page=${h}`,
  //       method: "get",
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     }
  //   ).then((response) => {
  //     console.log(response);
  //     setPages(response.data.allAudio)
  //     // setDataupdate(true)

  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }

  // const caturl = viewmusic;

  // View Music API
  const app = (c) => {
    // setDataupdate(false)
    // setViewMusicdetails(true)
    axios(
      {
        url: `${adminbaseurl}getAllAudio?filterkey=${c}`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    ).then((response) => {
        console.log(response);
      setViewMusicdetails(response.data.allAudio);
      // setDataupdate(false)
      // setDataupdate(true)

    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    app('');
    // Click('')

  }, [])

  // Update Music  API
  // const submit = (event, handle) => {
  //   event.preventDefault()
  //   let formData = new FormData();
  //   console.log(imageName, music, trackTitle, trackType, bpm, keyOptional, primaryGenre, type, updatingID)
  //   formData.append('image', imageName);
  //   formData.append('music', music);
  //   formData.append('trackTitle', trackTitle);
  //   formData.append('trackType', trackType);
  //   formData.append('bpm', bpm);
  //   formData.append('keyOptional', keyOptional);
  //   formData.append('primaryGenre', primaryGenre);
  //   formData.append('type', type);


  //   axios.put(`${updatemusic}${updatingID}`, formData, {
  //     headers: {
  //       "Content-type": "multipart/form-data", "Authorization": `Bearer ${token}`
  //     },
  //   }).then((res) => {
  //     console.log(res);
  //     if (res.status === 201) {
  //       Edittoast();
  //     }
  //     app('');

  //   }).catch((err) => {
  //     console.log(err)
  //   });
  //   // app();
  // }

  const submit = (event) => {
    event.preventDefault();
    console.log(imageName, music, trackTitle, trackType, bpm, keyOptional, primaryGenre, type, updatingID)
    let formData = new FormData();
    formData.append('image', imageName);
    formData.append('music', music);
    formData.append('trackTitle', trackTitle);
    formData.append('trackType', trackType);
    formData.append('bpm', bpm);
    formData.append('keyOptional', keyOptional);
    formData.append('primaryGenre', primaryGenre);
    formData.append('type', type);

    axios(
      {
        url: `${adminbaseurl}updateAudioById/${updatingID}`,
        method: "post",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        data: formData,
      }
    ).then((response) => {
      console.log(response);
      console.log(response.data.message)
      setSelecttwoinput(response.data.message)
      if (response.status === 201) {
        Edittoast();
      }
      if (response.status === 200) {
        WarningStatustoast();
      }
      app();
    }).catch((err) => {
      console.log(err);
    })

  }

  // Make Public Private API
  const songstype = (updatingID, c) => {
    console.log(updatingID);
    axios(
      {
        url: `${adminbaseurl}changeStatus/${updatingID}?type=${c}`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      // console.log(res);
      if (res.status === 200) {
        ChangeStatustoast();
      }
      // console.log(updatingID)
      app();

    }).catch((err) => {
      console.log(err);
    })
  };
  const show = (e) => {
    updatedata({ ...data, [e.target.name]: e.target.value });
  };

  // const musicinputselect = () => {
  //   WarningStatustoast()
  // }



  // Add Price On Song API
  const display = (e) => {
    setdatas({ ...datas, [e.target.name]: e.target.value });
  };
  const addpayment = (e, id) => {
    e.preventDefault()
    // console.log("amountttt", datas)
    // console.log("updateeee", updateId)
    axios(
      {
        url: `${adminbaseurl}AddPayment`,
        method: "post",
        data: {
          amount: datas.amount,
          audioId: updateId
        },
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <Container >
        <ToastContainer
          autoClose={2000}
          position="top-center"
          className="toast-container"
          toastClassName="dark-toast"
          theme="colored" />
        <Box mt={2}>
          <PageHeader title='View Music' />
          <div style={{ maxWidth: 300 }}  >
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-standard-label">Your Tracks</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={10}
                // value={age}
                label="Age"
              // onChange={handleChange}
              >
                <MenuItem value={10} onClick={() => app('')} >Default</MenuItem>
                <MenuItem value={20} onClick={() => app('MostPlayed')} >Most Played</MenuItem>
                <MenuItem value={30} onClick={() => app('MostDiscuss')} >Most Discussed</MenuItem>
                <MenuItem value={40} onClick={() => app('Latest')} >Latest</MenuItem>
                <MenuItem value={50} onClick={() => app('Oldest')} >Oldest</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <div className="viewmusicdiv"
        // style={{ overflow: 'hidden', width: '1050px' }}
        >
          {viewMusic.map((songs, index) => {
            return (

              <div className="bg-purple"
                // style={{ width: '100%', height: '54px', margin: '10px', float: 'left' }}
                key={index}>
                <div >
                  <img className="imgdiv" src={songs.imageName} alt="/"
                  // style={{ width: '100px', height: '54px', float: 'left' }} 
                  />
                </div>
                <div className="divaudio"
                // style={{ height: '54px', float: 'left' }}
                >
                  <audio controls controlsList="nodownload noplaybackrate " style={{ backgroundColor: "#C8C8C8" }}>
                    <source src={songs.music} type="audio/ogg" />
                  </audio>
                </div >
                <div className='tracktitle'
                // style={{ float: 'left', textAlign: 'center', width: '150px', height: '54px' }}
                >
                  <h5 className="trackh5"
                  // style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {songs.trackTitle}</h5>
                  <p>{songs.trackType}</p>
                </div>
                <div className="bpm"
                // style={{ float: 'left', textAlign: 'center', width: '100px', height: '54px' }}
                >
                  <h5>{songs.bpm}</h5>
                  <p>{songs.keyOptional}</p>
                </div>
                <div className="type"
                // style={{ float: 'left', textAlign: 'center', width: '100px', height: '54px' }}
                >
                  <h5>{songs.primaryGenre}</h5>
                  <p>{songs.type}</p>
                </div>

                <EditIcon
                  className="editicon"
                  hover={hover}
                  // sx={{ color: 'black', mt: 2, ml: 3 }}
                  data-bs-toggle="modal"

                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setedit(songs.id)
                  }}
                  data-bs-whatever="@getbootstrap"></EditIcon>  &nbsp;&nbsp;&nbsp;&nbsp;

                {/* Edit Songs End  */}


                {/* Delete Songs Start */}

                <DeleteIcon
                  className="deleteicon"
                  hover={hover}
                  // sx={{ color: 'black', mt: 2, ml: 3 }} 
                  variant="contained" onClick={async () => {
                    let res = await axios.delete(`${adminbaseurl}deleteAudio/${songs.id}`, {
                      headers: {
                        "Authorization": `Bearer ${token}`
                      }
                    });
                    if (res.status === 200) {
                      Deletetoast();
                    }
                    app();
                    console.log(res);

                  }}></DeleteIcon>
                  {/* <button className="btn btn-outline-info" data-bs-target='#exampleModalToggle2'
            data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button> */}
               {songs.price ? <b className="text-dark  ml-4" style={{lineHeight: 3}}>₹{songs.price}</b>
               :  <AddIcon  className='editicon'
               data-bs-target={`#exampleModalToggle2${index}`}
             data-bs-toggle="modal" data-bs-dismiss="modal"
                onClick={() => handleOpen(songs.id)}
               > </AddIcon>}
             
                    {/* AddPayment Model Start */}   
                 <div className="modal fade" id={`exampleModalToggle2${index}`} aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark" id="exampleModalToggleLabel2">Add amount for this song</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body text-dark">
                <form onSubmit={addpayment}>
                  {/* <div className="form-group">
                <label htmlFor="message-text text-dark" className="col-form-label">{songs.trackTitle} -- {songs.id}</label>
              </div> */}
                  <div className="form-group">
                    <label htmlFor="message-text text-dark" className="col-form-label">Amount</label>
                    <input id="message-text"
                      type="number"
                     name="amount"
                      value={datas.amount}
                      onChange={display}
                      className="form-control"
                      required
                    ></input>
                  </div>
                  <button className="btn btn-outline-secondary text-dark" data-bs-dismiss="modal">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div> 
        {/* AddPayment Model End */} 
               
                {/* <AddIcon className='editicon'/> */}

                {/* >DELETE</Button>&nbsp;&nbsp;&nbsp;&nbsp; 
                  <DeleteIcon />  */}

                {/* Delete Songs End  */}

                {/* Change Public Privet Start  */}
                <p className='songtype'>
                  <FormControl
                  //  sx={{ m: 2, minWidth: 80, ml: 5 }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={songs.type}
                      // onChange={handleChange}
                      autoWidth
                      label="Age"
                    >
                      <MenuItem value="public" onClick={() => songstype(songs.id, 'public')}>Public</MenuItem>
                      <MenuItem value="private" onClick={() => songstype(songs.id, 'private')} >Private</MenuItem>
                    </Select>
                  </FormControl></p>
                 
              

                {/* Change Public Privet End  */}


                {/* Edit Songs PopUp Model Start   */}

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                  aria-hidden="true" style={{ marginTop: "20px" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-black" id="exampleModalLabel">Edit Model</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form onSubmit={submit} >
                        <div className="modal-body">
                          <div className="mb-3" >
                            <label className="col-form-label  " style={{ color: 'black' }}>Track Title</label>
                            <p className="viewmusicmodel">
                              <input value={trackTitle} onChange={(e) => settrackTitle(e.target.value)}
                                name="trackTitle" type="text" className="form-control" id="recipient-name" /></p>
                          </div><div className="mb-3">
                            <label className="col-form-label black" style={{ color: 'black' }}>Track Type</label>
                            <p className="viewmusicmodel">
                              <input value={trackType} onChange={(e) => settrackType(e.target.value)} type="text"
                                className="form-control" id="recipient-name" /></p>
                          </div><div className="mb-3">
                            <label className="col-form-label" style={{ color: 'black' }}>Bpm</label>
                            <p className="viewmusicmodel">
                              <input value={bpm} type="text" onChange={(e) => setbpm(e.target.value)}
                                className="form-control" id="recipient-name" /></p>
                          </div><div className="mb-3">
                            <label className="col-form-label" style={{ color: 'black' }}>Key Optional</label>
                            <p className="viewmusicmodel">
                              <input value={keyOptional} type="text" onChange={(e) => setkeyOptional(e.target.value)}
                                className="form-control" id="recipient-name" /></p>
                          </div><div className="mb-3">
                            <label className="col-form-label" style={{ color: 'black' }}>Primary Genre</label>
                            <p className="viewmusicmodel">
                              <input value={primaryGenre} type="text" onChange={(e) => setprimaryGenre(e.target.value)}
                                className="form-control" id="recipient-name" /></p>
                          </div>
                          <label className="col-form-label" style={{ color: 'black' }}>Type</label>
                          <p className="viewmusicmodelimage">
                            <input value={type} type="text" onChange={(e) => setType(e.target.value)}
                              className="form-control" id="recipient-name" /></p>


                          <label className="col-form-label text-dark">Image</label>
                          <p className="viewmusicmodel">
                            <input type="file" className="form-control" id="recipient-name"
                              onChange={(e) => setImage(e.target.files[0])} /></p>
                          <img src={imageName} alt="/" style={{ width: '80px', height: '80px' }} />

                          <div>
                            <label className="col-form-label text-dark">Music</label>
                            <p className="viewmusicmodel">
                              <input type="file" className="form-control mt-2" id="recipient-name"
                                onChange={(e) => setMusic(e.target.files[0])} /></p>
                            <audio controls className="playeraudio">
                              <source src={music} type="audio/ogg" />
                            </audio></div>

                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* {viewMusic.trackTitle === trackTitle && viewMusic.trackType === trackType && 
                            viewMusic.bpm === bpm && viewMusic.keyOptional === keyOptional &&
                            viewMusic.primaryGenre === primaryGenre && viewMusic.type === type &&
                            viewMusic.imageName === imageName && viewMusic.music === music ? 
                            <button type="button" className="btn btn-primary mt-2" disabled
                            >Update</button>: */}
                            <button type="submit"
                              className="btn btn-primary mt-2" data-bs-dismiss="modal" aria-label="Close" id='close'
                            >Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Edit Songs PopUp Model Start  */}
              </div>
            )
          })}

        </div>
        {/* <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><button className="page-link" onClick={() => app('1')}>1</button></li>
            <li className="page-item"><button className="page-link" onClick={() => app('2')}>2</button></li>
            <li className="page-item"><button className="page-link" onClick={() => app('3')}>3</button></li>
            <li className="page-item"><button className="page-link" onClick={() => app('4')}>4</button></li>
            <li className="page-item"><button className="page-link" onClick={() => app('5')}>5</button></li>
          </ul>
        </nav> */}
        {/* {dataupdata && */}
        {/* <div style={{ overflow: 'hidden', width: '1050px' }}>
          {viewMusic.map((songs, index) => {
            return (

              <div className="bg-purple"
                style={{ width: '100%', height: '54px', margin: '10px', float: 'left' }}
                key={index}>
                <div >
                  <img src={songs.imageName} alt="/" style={{ width: '100px', height: '54px', float: 'left' }} />
                </div>
                <div style={{ height: '54px', float: 'left' }}>
                  <audio controls controlsList="nodownload noplaybackrate " style={{ backgroundColor: "#C8C8C8" }}>
                    <source src={songs.music} type="audio/ogg" />
                  </audio>
                </div >
                <div style={{ float: 'left', textAlign: 'center', width: '150px', height: '54px' }}>
                  <h5 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {songs.trackTitle}</h5>
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
                <EditIcon
                  hover={hover}
                  sx={{ color: 'black', mt: 2, ml: 3 }}

                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => {
                    setedit(songs.id)
                  }}
                  data-bs-whatever="@getbootstrap"></EditIcon>  &nbsp;&nbsp;&nbsp;&nbsp;

                <DeleteIcon
                  hover={hover}
                  sx={{ color: 'black', mt: 2, ml: 3 }} variant="contained" onClick={async () => {
                    let res = await axios.delete(`${deletemusic}${songs.id}`, {
                      headers: {
                        "Authorization": `Bearer ${token}`
                      }
                    });
                    if (res.status === 200) {
                      Deletetoast();
                    }
                    app();
                    console.log(res);

                  }}>
                </DeleteIcon>&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControl sx={{ m: 2, minWidth: 80, ml: 5 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={songs.type}
                    autoWidth
                    label="Age"
                  >
                    <MenuItem value="public" onClick={() => songstype(songs.id, 'public')}>public</MenuItem>
                    <MenuItem value="private" onClick={() => songstype(songs.id, 'private')} >private</MenuItem>
                  </Select>
                </FormControl>
              </ div>
            )
          }
          )}

        </div> */}
        {/* <div className="modal-footer"> */}
          {/* <button className="btn btn-outline-info" data-bs-target='#exampleModalToggle2'
            data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button> */}
        {/* </div> */}
    

      </Container>
    </>
  )
}
export default ViewMusic