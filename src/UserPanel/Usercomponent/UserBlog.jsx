import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { userblog } from '../../Api/Config';
import Navbar from '../UserBackend/Navbar';
import '../css/UserBlog.css';

const UserBlog = () => {
    let [Blog, SetBlog] = useState([]);

    async function BlogApi() {
        let response = await axios.get(`${userblog}`);
        SetBlog(response.data.findBlog);
        console.log(response.data.findBlog);
    }
    useEffect(() => {
        BlogApi();
    }, [])

    return (
        <>
            <Navbar />
            <h1 >Blog</h1>
            {/* <h6>Video Blog</h6> */}
            <video width="320" height="240" controls
                style={{ float: 'right', marginRight: 30 }}>Video Blog
                <source src="./video.mp4" type="video/mp4" />
                {/* <source src="./video2.mp4" type="video/mp4" /> */}
                Your browser does not support the video tag.
            </video>
            <video width="320" height="240" controls
                style={{ float: 'right', marginRight: 30 }}>Video Blog
                {/* <source src="./video.mp4" type="video/mp4" /> */}
                <source src="https://ik.imagekit.io/ikmedia/sample-video.mp4"
                    type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {Blog.map((item, i) => {
                return (
                    <>
                        <div className="row" key={i}>
                            <div className="leftcolumn">
                                <div className="card">
                                    <h2>{item.title}</h2>
                                    {/* <h5>{item.CreateTime}&nbsp;&nbsp;{item.createDate}</h5> */}
                                    <img src={item.imageName} className="img" alt="/" />
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    );
}

export default UserBlog;

