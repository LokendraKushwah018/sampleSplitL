import React, { useState, useEffect } from 'react'
import drumsImg from '../../Components/Assets/img/drums.jpg'
import vocalImg from '../../Components/Assets/img/vocals.jpg'
import sampleImg from '../../Components/Assets/img/sample.jpg'
import beatImg from '../../Components/Assets/img/beat.jpg'
import axios from 'axios'
import { categoryMusic, Donationpay, mostdiscussed, search, userdownload, userdownloader, usermostplayed } from '../../Api/Config'
import Navbar from '../Userlayout/Navbar'
import 'react-audio-player-pro/dist/style.css';
import '../css/freestem.css'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
// import Footer from '../UserBackend/Footer'
import FileSaver from 'file-saver'
import '../css/search.css'
// import { MusicNoteRounded } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux'

const Freestem = () => {

  const [music, setMusic] = useState([]);
  const [play, setPlay] = useState([])
  const [playingMusic, setPlayingMusic] = useState([])
  const [state, setstate] = useState([])
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState([]);
  const [Id, setId] = useState([]);
  const [gaana, setGaana] = useState([]);
  const [showplayer,setShowplayer] = useState(false)
  // const [input, setinput] = useState();
  const [visible, setVisible] = useState(true);
  const [donate, setDonate] = useState({ title: "", amount: "" });
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [ playingmusicImgae, setplayingmusicImgae] = useState([])
  const [musicplayerimage , setMusicplayerimage] = useState(false)
  const token = useSelector(state=>state.auth.userlogintoken)
  const navigate = useNavigate();
  // const token = localStorage.getItem("userlogintoken");
     
  const Warningtoast = () => {
    toast.info("Wait For a second");
  }

  const DownloadToast = () => {
    toast.info("Your Daily Downloading Limit Expired");
  }
  const searchApi = () => {
    // console.log("queryr1111 ", query)
    setVisible(true)
    axios(
      {
        url: `${search}${query}`,
        method: "get",
      })

      .then((response) => {
        console.log(response);
        setSongs(response.data.getSong);
        console.log(response.data.getSong);
        console.log(Id, state)
      }).catch((err) => {
        console.log(err);
      })
  }
  const url = categoryMusic;

  const handleClick = (c) => {
    axios(
      {
        url: `${url}?filterKey=${c}&page=${1}`,
        method: "get"
      }
    ).then((response) => {
      console.log(response);
      console.log(response.data.getSongData);
      setMusic(response.data.getSongData)
    }).catch((err) => {
      console.log(err);
    })
  }
  // const MostPlayed = (id) => {
  //   axios(
  //     {
  //       url: `${usermostplayed}${id}`,
  //       method: "get"
  //     })
  //     .then((response) => {
  //       // setMost(response.data);
  //       console.log(response.data);
  //     }).catch((err) => {
  //       console.log(err);
  //       // console.log(MostPlayed)
  //     })
  // }
  useEffect(() => {
    handleClick("public");
    // MostPlayed();
  }, []);

  const show = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDonate({ ...donate, [name]: value })
    console.log(setDonate)
  }
  const donation = (e) => {
    Warningtoast();
    e.preventDefault();
    e.target.reset();
    axios(
      {
        url: `${Donationpay}`,
        method: 'post',
        data: {
          title,
          amount
        },
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data.links);
      const ammount = amount;
      console.log(ammount);
      localStorage.setItem("ammount", ammount);
      if (res.status === 200) {
        window.location.href = res.data.links
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  const SearchPlayer = (id, music, trackTitle) => {
    // setTimeout(() => {
    //   setinput("");
    //   setVisible((prev) => !prev);
    // })
    // console.log(id);
    // console.log(music);
    // console.log(trackTitle);
    setQuery('')
    setVisible(false)
    setShowplayer(true);
    setMusicplayerimage(true);
    setPlayingMusic(music);
    setPlay(trackTitle);
    axios(
      {
        url: `${mostdiscussed}${id}`,
        method: "get"
      })
      .then((response) => {
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })

    // console.log("musiccName11111", playingMusic)
    // console.log("trackname111111", play);
  }

  const Bottom = (id, music, trackTitle, imageName) => {
    console.log(id);
    console.log(music);
    console.log(trackTitle);
    setstate(imageName);
    setPlayingMusic(music);
    setPlay(trackTitle);
    setplayingmusicImgae(imageName);
     setMusicplayerimage(true);
    setShowplayer(true);
    console.log("musiccName22222", playingMusic)
    console.log("tracktitleName22222", play)
    axios(
      {
        url: `${usermostplayed}${id}`,
        method: "get"
      })
      .then((response) => {
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
  }
  const BuyPlan = () => {
    navigate("/buyplan");
  }
  const Download = (id) => {
    setId(id);
    console.log(id);
    axios(
      {
        url: `${userdownload}${id}`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    ).then((res) => {
      console.log(res.data.data);
      setGaana(res.data.data)
      console.log("gana", gaana)
    }).catch((err) => {
      console.log(err);
    })

  }
  const downloader = (song, id) => {
    console.log(id);
    axios({
      url: `${userdownloader}${id}`,
      method: 'get',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res);
      if (res.data.message === "Download Success") {
        FileSaver.saveAs(song)
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
  const modelsong = (music, trackTitle, imageName) => {
    setPlayingMusic(music);
    setPlay(trackTitle);
    setplayingmusicImgae(imageName);
    setShowplayer(true);
  }
  return (
    <>
      <Navbar />
      <ToastContainer
        autoClose={1500}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored" />
      <div style={{color:'white'}}>
        <div className="container">
          <div className="col-md-8 ">
            <div className="search-2">
              <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search Any Songs and Listen' />
              <button onClick={searchApi}>Search</button>
            </div> </div> </div>

        {/* <div className='wrap'>
          <input className='search_bar mt-1'
            style={{ borderRadius: '50px' }}
            type="text"
            value={query}
            // onKeyPress={searchApi}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Any Songs and Listen'
          />
             <button onClick={searchApi}>Search</button>
        </div> */}
        {songs.filter((user) =>
          user.trackTitle.toLowerCase().includes(query.toLowerCase())).map((item, i) => {
            return (
              <div key={i}>
                {visible && (
                  <div

                    style={{
                      width: '400px',
                      height: '41px',
                      color: 'black',
                      display: 'block',
                      margin: '10px',
                      marginLeft: "500px",

                    }}>
                    <div>
                      <img src={item.imageName}
                        onClick={() => SearchPlayer(item.id, item.music, item.trackTitle)}
                        alt="/" style={{ width: '70px', height: '40px', float: 'left' }} />

                    </div>

                    <div>
                      <h5 style={{ textAlign: 'center', lineHeight: '41px' }}>{item.trackTitle}</h5>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        <div style={{
          float: 'left', margin: '0px 0px 0px 70px'
        }}>
          <div
            style={{ float: 'left', margin: 10 }}
            onClick={() => handleClick('Drums')}>
            <h2 style={{ textAlign: 'center' }} >Drums</h2>
            <img src={drumsImg} alt="/" style={{ width: '280px', height: "200px" }} />
          </div>
          &nbsp;
          <div 
            style={{ float: 'left', margin: 10 }}
            onClick={() => handleClick('Vocals')}>
            <h2 style={{ textAlign: 'center' }} >Vocals</h2>
            <img src={vocalImg} alt="/" style={{ width: '280px', height: "200px" }} />
          </div>
          &nbsp;
          <div
            style={{ float: 'left', margin: 10 }}
            onClick={() => handleClick('Samples')}>
            <h2 style={{ textAlign: 'center' }} >Sample</h2>
            <img src={sampleImg} alt="/" style={{ width: '280px', height: "200px" }} />
          </div>
          &nbsp;
          <div
            style={{ float: 'left', margin: 10 }}
            onClick={() => handleClick('Beats')}>
            <h2 style={{ textAlign: 'center' }} >Beats</h2>
            <img src={beatImg} alt="/" style={{ width: '280px', height: "200px" }} />
          </div>
        </div>
        <div style={{ float: 'left', marginLeft: '80px', marginBottom: "80px" }}>

          {music.map((value, index) => {
            return (
              <div style={{ margin: '10px', float: 'left', width: '400px', height: '60px' }}
                key={index}>
                <div
                  className="img-div"
                  style={{ float: 'left' }} onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}>
                  <img src={value.imageName} alt="/" style={{ width: '60px', height: '60px', borderRadius: '10px' }} />
                </div>
                <div>
                  <div
                    style={{
                      width: '200px',
                      height: '60px',
                      textAlign: 'center',
                      float: 'left',
                    }}>
                    <h5 style={{ lineHeight: '30px', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value.trackTitle}</h5>
                    <p>{value.tracktype}</p>
                  </div>
                </div>
                <DownloadIcon
                  sx={{ m: 2 }}
                  data-bs-toggle="modal" href={`#exampleModalToggle${index}`} role="button"
                />
                <InfoIcon sx={{ m: 2 }}
                  type="button"
                  data-toggle="modal"
                  data-target={`#exampleModal${index}`}
                />
                <div className="modal fade " id={`exampleModal${index}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-fullscreen-xxl-down "  role="document" >
                    <div className="modal-content bg-dark" >
                      <div className="modal-header">
                        <h5 className="modal-title " id="exampleModalLabel">Song Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" className='text-light'>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="container mt-5 mb-5">
                          <div className="row no-gutters">
                            <div className="col-md-4 col-lg-4 img__model" data-dismiss="modal" type="button" onClick={()=>modelsong( value.music, value.trackTitle, value.imageName)}><img src={value.imageName} className="img__name" alt='...'/></div>
                            <div className="col-md-8 col-lg-8">
                              <div className="d-flex flex-column">
                                <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-secondary text-white">
                                  <h3 className="display-5">{value.trackTitle}</h3>
                                  {/* <i className="fa fa-facebook"></i><i className="fa fa-google"></i>
                                  <i className="fa fa-youtube-play"></i><i className="fa fa-dribbble"></i>
                                  <i className="fa fa-linkedin"></i> */}
                                  </div>
                                <div className="p-3 bg-black text-white">
                                  <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{value.tracktype}</h4>
                                </div>
                                <div className="d-flex flex-row text-white">
                                  <div className="p-4 bg-warning text-center skill-block">
                                    <h4>{value.bpm}</h4>
                                    <h6>Bpm</h6>
                                  </div>
                                  <div className="p-3 bg-danger text-center skill-block">
                                    <h4>{value.keyOptional}</h4>
                                    <h6>Key</h6>
                                  </div>
                                  {/* <div className="p-3 bg-warning text-center skill-block">
                                <h4>{value.bpm}</h4>
                                <h6>Bpm</h6>
                            </div>
                            <div className="p-3 bg-danger text-center skill-block">
                                <h4>75%</h4>
                                <h6>PHP</h6>
                            </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="modal fade" id={`exampleModalToggle${index}`} aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark" id="exampleModalToggleLabel">Download</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body text-dark">
                        Download This Song
                        <button className='btn btn-primary m-5'
                          onClick={() => downloader(value.music, value.id)}
                          data-bs-dismiss="modal">Download</button>
                        {/* <a href="_ff (6).mp3" download><img src={gaana.music} alt="/" />d</a> */}
                      </div>
                      <div className="modal-footer">
                        <button className="btn btn-outline-info" data-bs-target={`#exampleModalToggle2${index}`}
                          data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal fade" id={`exampleModalToggle2${index}`} aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title text-dark" id="exampleModalToggleLabel2">Donate</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body text-dark">
                        <form onSubmit={donation}>
                          <div className="form-group ">
                            <label htmlFor="message-text " className="col-form-label">Title</label>
                            <input type="text" className="form-control" id="recipient-name"
                              name="title" value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="message-text text-dark" className="col-form-label">Amount</label>
                            <input id="message-text"
                              type="amount" name="amount" value={amount}
                              onChange={(e) => setAmount(e.target.value)} className="form-control"
                              required
                            ></input>
                          </div>
                          <button className="btn btn-outline-success">Submit</button>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button style={{ background: "#1F2D5A" }} className="btn text-white" data-bs-target={`#exampleModalToggle${index}`}
                          data-bs-toggle="modal" data-bs-dismiss="modal">Back to Download</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {showplayer && 
        <div className="Apps">
          <div style={{ float: 'left', width: '7%' }}  >              
                <img
                  src={playingmusicImgae}
                  alt="/"
                  style={{ width: '100%', height: "80px" }}
                />
          </div>
          <div style={{ width: '93%', height: "80px", float: 'left' }}>
            <AudioPlayer
              style={{ height: "80px", textAlign: 'center', background: "black", color: 'white' }}
              autoPlay={true}
              layout="horizontal"
              controls={false}
              src={playingMusic}
              showJumpControls={false}
              header={play}
            />
          </div>
        </div>
}
        
      
      </div>
    
</>
  )
}

export default Freestem




