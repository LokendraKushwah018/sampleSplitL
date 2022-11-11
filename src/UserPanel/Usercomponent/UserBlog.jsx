import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import axios from 'axios';
import { userblog  } from '../../Api/Config';
import { API } from '../../Api/Config'
import Navbar from '../Userlayout/Navbar';
import '../css/userblog.scss';


const UserBlog = () => {
    const [Blog, SetBlog] = useState([]);

    async function BlogApi() {
        const response = await API(`${userblog}`);
        SetBlog(response.data.findBlog);
        console.log(response.data.findBlog);
    }
    useEffect(() => {
        BlogApi();
    }, [])

    return (
        <>
            <Navbar />
            {Blog.map((item , index) => {
                return (                 
                        <div className="card" key={index}>
                               {item.type === 'video' ?  <video className="card__video" 
                               controls controlsList='nodownload'>
                                <source src={item.imageName} type="video/mp4">
                                </source>
                            </video> : 
                            <img                            
                            src= {item.imageName}
                            className="card__image" alt="brown couch" />}
                            <div className="card__content">
                                <time className="card__date">{item.Date}</time>                              
                                <span className="card__title" >{item.title}</span>
                                <p>{item.description}</p>
                            </div>
                        </div>                    
                )
            })}
        </>
    );
}
export default UserBlog;