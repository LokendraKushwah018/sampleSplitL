import React, { useState, useEffect } from 'react'
import drumsImg from '../../Components/Assets/img/drums.jpg'
import vocalImg from '../../Components/Assets/img/vocals.jpg'
import sampleImg from '../../Components/Assets/img/sample.jpg'
import beatImg from '../../Components/Assets/img/beat.jpg'
import axios from 'axios'
import { categoryMusic, search, usermostplayed } from '../../Api/Config'
import Navbar from '../UserBackend/Navbar'
import 'react-audio-player-pro/dist/style.css';
import '../css/freestem.css'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
// import background from "../css/backgroundimage.jpg"
import { Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// import { Link } from 'react-router-dom'


const Freestem = () => {
  // const Wrap = styled.div`
  // background:black; 
  // border:1px solid black;
  // &:hover {
  //   background:black;
  //   border : 1px solid white ;
  // }

  // `
  const [music, setMusic] = useState([]);
  const [play, setPlay] = useState([])
  const [playingMusic, setPlayingMusic] = useState([])
  const [state, setstate] = useState([])
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState([]);
  const [Id, setId] = useState([]);
  const [gaana, setGaana] = useState([]);
  const [input, setinput] = useState();
  const [visible, setVisible] = useState(true);


  const [donate, setDonate] = useState({ title: "", amount: "" });
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem("userlogintoken");

  // console.log("queryr ", query)
  // const [play , setPlay] = useState([])
  // const removeElement = () => {

  // };
  const Warningtoast = () => {
    toast.info("Wait For a second");
  }
  const searchApi = () => {
    console.log("queryr1111 ", query)

    axios(
      {
        url: `${search}${query}`,
        method: "get",
      })
   

      .then((response) => {
        console.log(response);
        setSongs(response.data.getSong);
        console.log(response.data.getSong);
      }).catch((err) => {
        console.log(err);
      })
  }
  const url = categoryMusic;

  const handleClick = (c) => {
    axios(
      {
        url: `${url}?filterKey=${c}`,
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
  const MostPlayed = (id) => {
    axios(
      {
        url: `${usermostplayed}${id}`,
        method: "get"
      })
      .then((response) => {
        // setMost(response.data);
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    handleClick("public");
    //  MostPlayed();
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
    axios(
      {
        url: 'http://localhost:5001/api/user/DonationPay',
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
    setTimeout(() => {
      setinput("");
      setVisible((prev) => !prev);
    })
    console.log(id);
    console.log(music);
    console.log(trackTitle);
    setPlayingMusic(music);
    setPlay(trackTitle);
    console.log("musiccName11111", playingMusic)
    console.log("trackname111111", play);
  }

  const Bottom = (id, music, trackTitle, imageName) => {
    console.log(id);
    console.log(music);
    console.log(trackTitle);
    setstate(imageName);
    setPlayingMusic(music);
    setPlay(trackTitle);
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
        url: `http://localhost:5001/api/user/getDownloadSong/${id}`,
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
  return (
    <>
      <Navbar />
      <ToastContainer
        autoClose={1500}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored" />
      <div>
        <div className='wrap'>
          <input className='search_bar mt-1'
            style={{ borderRadius: '50px' }}
            type="text"
            value={input}
            onKeyPress={searchApi}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Any Songs and Listen'
             />
        </div>
        {songs.filter((user) =>
          user.trackTitle.toLowerCase().includes(query.toLowerCase())).map((item, i) => {
            return (
              <>
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
              </>
            )
          })}
        <div style={{
          display: 'inline-flex', margin: '0px 0px 0px 70px'
        }}>
          <div onClick={() => handleClick('Drums')}>
            <h2 style={{ textAlign: 'center' }} >Drums</h2>
            <img src={drumsImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
          &nbsp;
          <div onClick={() => handleClick('Vocals')}>
            <h2 style={{ textAlign: 'center' }} >Vocals</h2>
            <img src={vocalImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
          &nbsp;
          <div onClick={() => handleClick('Samples')}>
            <h2 style={{ textAlign: 'center' }} >Sample</h2>
            <img src={sampleImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
          &nbsp;
          <div onClick={() => handleClick('Beats')}>
            <h2 style={{ textAlign: 'center' }} >Beats</h2>
            <img src={beatImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
        </div>
        <div style={{ float: 'left', marginLeft: '80px' }}>

          {music.map((value, i) => {
            return (
              <>
                <div style={{ margin: '10px', float: 'left', width: '400px', height: '60px' }}  >
                  <div style={{ float: 'left' }} onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}>
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
                      <h5 style={{ lineHeight: '30px' }}>{value.trackTitle}</h5>
                      <p>{value.tracktype}</p>
                    </div>
                  </div>
                  <IconButton
                  >
                    <DownloadIcon
                      sx={{ m: 2 }}
                      onClick={() => Download(value.id)}
                      data-bs-toggle="modal" href="#exampleModalToggle" role="button"
                    />
                  </IconButton>
                  <div className="modal fade" id="exampleModalToggle" aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel">Download</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Download This Song
                          <IconButton>
                            <DownloadIcon
                              onClick={BuyPlan}
                              aria-label="Close"
                              data-bs-dismiss="modal"
                              sx={{ color: '#1F2D5A' }} />
                          </IconButton>
                          <a href="_ff (6).mp3" download><img src={gaana.music} alt="/" />d</a>
                        </div>
                        <div className="modal-footer">
                          <button className="btn btn-outline-info" data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel2">Donate</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form >
                            <div className="form-group">
                              <label className="col-form-label">Title</label>
                              <input type="text" class="form-control" id="recipient-name"
                                name="title" value={title}
                                onChange={(e) => setTitle(e.target.value)} className="form-control"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label for="message-text" className="col-form-label">Amount</label>
                              <input id="message-text"
                                type="amount" name="amount" value={amount}
                                onChange={(e) => setAmount(e.target.value)} className="form-control"
                                required
                              ></input>
                            </div>
                            <button onClick={donation} className="btn btn-outline-success">Submit</button>

                          </form>
                        </div>
                        <div className="modal-footer">
                          <button style={{ background: "#1F2D5A" }} className="btn text-white" data-bs-target="#exampleModalToggle"
                            data-bs-toggle="modal" data-bs-dismiss="modal">Back to Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <div style={{ width: '100%', height: '500px' }}>
        </div>
        <div className="Apps">
          <AudioPlayer
            // style={{ width: "300px" }}
            style={{ borderRadius: "1rem", textAlign: 'center' }}
            autoPlay
            // layout="horizontal"
            // src={playingMusic.length ? playingMusic : "./_ff.mp3" }
            src={playingMusic}
            // onPlay={(e) => console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
            header={play}
          />
        </div>    
      </div>
    </>
  )
}

export default Freestem

