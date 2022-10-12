import React, { useState, useEffect } from 'react';
// import './css/Search.scss';
// import '../css/Search.scss'
import axios from 'axios'
import { mostdiscussed, search } from '../../Api/Config'
import Navbar from '../UserBackend/Navbar';

const Search = () => {
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");
    const searchApi = () => {
        axios(
            {
                url: `${search}`,
                method: "get"
            })
            .then((response) => {
                setSongs(response.data.getSong);
                console.log(response.data.getSong)
            }).catch((err) => {
                console.log(err);
            })
    }
    // useEffect(() => {
    //     searchApi();
    // }, [])

    const MostDiscuss = (id) => {
        console.log(id);
        axios(
            {
                url: `${mostdiscussed}${id}`,
                method: "get"
            })
            .then((response) => {
                console.log(response);
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <Navbar />
            <input type="text"
                placeholder="search here"
                onKeyPress={searchApi}
                style={{ marginLeft: 100, marginTop: 10, textalign: "center", width: 477, height: 40 }}
                onChange={(e) => setQuery(e.target.value)} />
            {songs.filter((user) =>
                user.trackTitle.toLowerCase().includes(query.toLowerCase())).map((item, i) => {
                    return (
                        <>
                            <div
                                onClick={() => MostDiscuss(item.id)}
                                style={{
                                    width: '44%', height: '41px', background: 'white',
                                    margin: '10px', marginLeft: "100px", float: 'left',
                                    backgroundColor: '#cfcccc'
                                }}>
                                <div>
                                    <img src={item.imageName}
                                        alt="/" style={{ width: '70px', height: '40px', float: 'left' }} />
                                </div>
                                {/* <div style={{ height: '100px', float: 'left' }}>
                                    <audio controls>
                                        <source src={item.music} type="audio/ogg"/>
                                    </audio>
                                </div > */}
                                <div style={{ marginLeft: 280 }}>
                                    <h5 style={{ textAlign: 'center', lineHeight: '45px' }}>{item.trackTitle}</h5>  </div>
                            </div>
                        </>
                    )
                })}
        </>

    );
}

export default Search;