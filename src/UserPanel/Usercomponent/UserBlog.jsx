import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import axios from 'axios';
import { API, userblog } from '../../Api/Config';
import Navbar from '../Userlayout/Navbar';
import '../css/userblog.scss';
// import styled from 'styled-components';

const UserBlog = () => {
    const [Blog, SetBlog] = useState([]);

    async function BlogApi() {
        const response = await API.get(`${userblog}`);
        SetBlog(response.data.findBlog);
        console.log(response.data.findBlog);
        if (!response || response) {
            console.log("11111111");
        }
        else if (!response.data || response.data) {
            console.log("222222");
        }
        else if (response) {
            console.log("333333333")
        }
    }
    useEffect(() => {
        BlogApi();
    }, [])

    return (
        <>
            <Navbar />
            {Blog.map((item, index) => {
                return (
                    <div key={index}>
                        {item.type === 'video' ?
                            <div className="card" key={index}>
                                <video className="card__video"
                                    controls controlsList='nodownload'>
                                    <source src={item.imageName} type="video/mp4">
                                    </source>
                                </video>
                                <div className="card__content">
                                    <time className="card__date">{item.Date}</time>
                                    <span className="card__title" >{item.title}</span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            :
                            <div>
                                {item.imageName === "http://localhost:5001/images/BlogImage/Null"
                                    ?
                                    <div className='card__one'>
                                        <div className="card__content__one">
                                            <time className="card__date__one">{item.Date}</time>
                                            <span className="card__title__one" >{item.title}</span>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="card" key={index}>
                                        <img
                                            src={item.imageName}
                                            className="card__image" alt="brown couch" />

                                        <div className="card__content">
                                            <time className="card__date">{item.Date}</time>
                                            <span className="card__title" >{item.title}</span>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                )
            })}

        </>
    );
}
export default UserBlog;



