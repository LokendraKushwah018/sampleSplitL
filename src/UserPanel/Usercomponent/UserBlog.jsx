// import React from 'react'

// const UserBlog = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default UserBlog



import React from 'react';
// import './css/About.scss';
// import '../css/About.scss';
// import './css/UserBlog.css';
// import '../css/UserBlog.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {userblog} from '../../Api/Config'
import Navbar from '../UserBackend/Navbar';


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
            <h1>Blog</h1>
            {Blog.map((item, i) => {
                return (
                    <>
                        <div className="row" key={i}>
                            <div className="leftcolumn">
                                <div className="card">
                                    <h2>{item.title}</h2>
                                    <h5>{item.CreateTime}&nbsp;&nbsp;{item.createDate}</h5>
                                    <img src={item.imageName} className="img" alt="/" />
                                    {/* <p>Some text..</p> */}
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
            {/* <h1>Blog</h1>
            <div className="row">
                <div className="leftcolumn">
                    <div className="card">
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Dec 7, 2017</h5>
                        <img src={modi} alt=""  />
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>
            </div> */}
            </>
    );
}

export default UserBlog;

