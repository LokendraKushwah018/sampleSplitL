import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { userbaseurl } from '../../Api/Config';
import Navbar from '../Userlayout/Navbar';
import '../css/userblog.scss';
// import { PaginationItem } from '@mui/material';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import ReactPaginate from 'react-paginate';
import Footer from '../Userlayout/Footer';

const UserBlog = () => {
    const [Blog, SetBlog] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    useEffect(() => {
        const BlogApi = () => {
            axios(
                {
                    url: `${userbaseurl}getBloges?page=${1}`,
                    method: 'get'
                }
            ).then((res) => {
                console.log(res);
                const Total = res.data.findBlog.count;
                setpageCount(Math.ceil(Total / 5));
                console.log(Total)
                SetBlog(res.data.findBlog.rows);
            }).catch((err) => {
                console.log(err);
            })
        }
        BlogApi();
    }, []);
    const fecthComments = async (CurruntPage) => {
        const res = await fetch(
            `${userbaseurl}getBloges?page=${CurruntPage}`
        );
        const data = await res.json();
        console.log(data);
        const d = data.findBlog.rows;
        return d;
    }
    const handelPageClick = async (d) => {
        console.log(d.selected)
        window.scrollTo(0, 0);
        var CurruntPage = d.selected + 1;

        const Comments = await fecthComments(CurruntPage);
        SetBlog(Comments)
        // console.log("clicked")
    };
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
                                {item.type === "text"
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

            <ReactPaginate
                style={{ background: 'red' }}
                previousLabel={"Previous"}
                nextLabel={'Next'}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handelPageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={"page-item"}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
            <h6 style={{ color: "#343a40" }}>fs</h6>
            <Footer />
        </>
    );
}
export default UserBlog;


