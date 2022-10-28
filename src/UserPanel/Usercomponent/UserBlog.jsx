import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { userblog } from '../../Api/Config';
import Navbar from '../UserBackend/Navbar';
import '../css/userblog.scss';

const UserBlog = () => {
    const [Blog, SetBlog] = useState([]);

    async function BlogApi() {
        const response = await axios.get(`${userblog}`);
        SetBlog(response.data.findBlog);
        console.log(response.data.findBlog);
    }
    useEffect(() => {
        BlogApi();
    }, [Blog])

    return (
        <>
            <Navbar />
            {Blog.map((item, i) => {
                return (
                    <>
                        <div className="card">
                            <img 
                            src= {item.imageName}
                            className="card__image" alt="brown couch" />
                            <div className="card__content">
                                <time datetime="2021-03-30" className="card__date">{item.Date}</time>
                              
                                <span className="card__title" >{item.title}</span>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    );
}
export default UserBlog;

