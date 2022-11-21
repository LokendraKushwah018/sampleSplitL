import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Container from '../../Components/Adminlayout/Container'
import { PageHeader } from '../Common/Components'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { adminbaseurl } from '../../Api/Config'

// import './ViewBlogs.scss'
const Deletetoast = () => {
    toast.success("Delete Successfully !");
};

const Edittoast = () => {
    toast.success("Edit Successfully !");
};

const ViewBlogs = () => {

    const [getblog, setGetblog] = useState([])
    const [title, setTitle] = useState([])
    const [types , setTypes] = useState([])
    const [description, setDescription] = useState([])
    const [imageName, setImageName] = useState(null)
    const [ID, setid] = useState('')
    
    // const [music , setMusic] = useState([])
    const [pageData, setPageData] = useState(0)

    const token = useSelector(state => state.admin.adminlogintoken)


    const adminblog = (id) => {
        axios({
            url: `${adminbaseurl}getAllBlog?page=${1}`,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }).then((response) => {
            setGetblog(response.data.findBlog.rows)
            const Count = response.data.findBlog.count
            console.log(Count)
            setPageData(Math.ceil(Count / 5));
            //   console.log(response.data.findBlog.rows)
        }).catch((error) => {
            console.log(error)
        })
    }

    const fecthComments = async (CurrentPage) => {
        const res = await fetch(
            `${adminbaseurl}getAllBlog?page=${CurrentPage}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        );
        const data = await res.json();
        console.log(data)
        const d = data.findBlog.rows;
        return d;
    }
    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        const Comments = await fecthComments(CurrentPage);
        setGetblog(Comments)
    };

    const editblogs = (id) => {
        axios({
            url: `${adminbaseurl}getBlogById/${id}`,
            method: "get",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            // console.log(res.data.findBlog)
            const setGetblog = res.data.findBlog
            setTitle(setGetblog.title)
            setDescription(setGetblog.description)
            setImageName(setGetblog.imageName)
            setid(setGetblog.id)
            setTypes(setGetblog.type)
            console.log(id)

        }).catch((err) => {
            console.log(err)
        })
    }

    const blogdelete = (id) => {
        axios({
            url: `${adminbaseurl}deleteBlog/${id}`,
            method: 'delete',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                Deletetoast();
            }
            adminblog();
            fecthComments();
        }).catch((error) => {
            console.log(error)
        })
    }

    const blogsubmit = (event) => {
        console.log(imageName , title , description)
        // console.log(id)
        event.preventDefault();
        let formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        formData.append("imageName", imageName)
        axios({
            url: `${adminbaseurl}updateBlogById/${ID}`,
            method: 'put',
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => {
            console.log(response)
            adminblog();
            Edittoast()
            
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        adminblog('');
    
    }, [])

    return (
        <>
            <Container>
                <ToastContainer
                    autoClose={2000}
                    position="top-center"
                    className="toast-container"
                    toastClassName="dark-toast"
                    theme="colored" />
                <PageHeader title='View Blogs' />
                {getblog.map((data, index) => {
                    return (
                        <div key={index}
                            style={{ width: '800px', backgroundColor: 'dark' }}>
                            <div >
                                <EditIcon data-bs-toggle="modal"
                                    style={{ color: 'dark', marginLeft: 650, marginBottom: '-70' }}
                                    data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap"
                                    onClick={() => editblogs(data.id)}> </EditIcon>
                                <DeleteIcon
                                    style={{ color: 'dark', marginBottom: '-70' }}
                                    onClick={() => { blogdelete(data.id) }}>
                                </ DeleteIcon>  </div>
                            {data.type === 'video' ?
                                <div className="card" key={index}
                                    style={{ backgroundColor: 'black' }}>
                                    <video className="card__video"
                                        controls controlsList='nodownload'>
                                        <source src={data.imageName} type="video/mp4">
                                        </source>
                                    </video>
                                    <div className="card__content text-white">
                                        <time className="card__date text-white ">{data.Date}</time>
                                        <h4 className=" text-white" ><b>{data.title}</b></h4>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                                :
                                <div>
                                    {data.type === "text"
                                        ?
                                        <div className='card__one bg-black'>
                                            <div className="card__content__one ">
                                                <time className="card__date__one text-white">{data.Date}</time>
                                                <h4 className=" text-white " ><b>{data.title}</b></h4>
                                                <div className="overflow-auto">
                                                    <p>{data.description}</p></div>
                                            </div>
                                        </div>
                                        :
                                        <div className="card bg-black" key={index}>
                                            <img
                                                src={data.imageName}
                                                className="card__image" alt="..." />
                                            <div className="card__content">
                                                <time className="card__date text-white">{data.Date}</time>
                                                <h4 className=" text-white" ><b>{data.title}</b></h4>
                                                <p>{data.description}</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                            <div className="modal fade" id="exampleModal" tabIndex="-1"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Box</h1>
                                            <button type="button" className="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form
                                            // onSubmit={blogsubmit}
                                            >
                                                <div className="mb-3">
                                                    <label htmlFor="recipient-name" className="col-form-label">Title</label>
                                                    <input
                                                        value={title} onChange={(e) => setTitle(e.target.value)}
                                                        type="text" className="form-control" id="recipient-name" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="message-text" className="col-form-label">Description</label>
                                                    <textarea className="form-control" id="message-text" value={description}
                                                        onChange={(e) => setDescription(e.target.value)} name="description"></textarea>
                                                </div>
                                                {types === "video" ?
                                                <div className="mb-3">
                                                 <label className="col-form-label" >Video</label>
                                                 <input type="file" className="form-control" id="recipient-name"
                                                     onChange={(e) => setImageName(e.target.files[0])} />
                                                    <video width="320" height="240"
                                                        controls controlsList='nodownload'>
                                                        <source src={imageName} type="video/mp4">
                                                        </source>
                                                    </video>
                                                    </div> 
                                                   :
                                                    <div>
                                                        {types === "picture" ?
                                                            <div className="mb-3">
                                                                <label className="col-form-label" >Image</label>
                                                                <input type="file" className="form-control" id="recipient-name"
                                                                    onChange={(e) => setImageName(e.target.files[0])} />
                                                                <img src={imageName} alt="/" style={{ width: '100px', height: '90px' }} />
                                                            </div> 
                                                            :
                                                            <br />
                                                        }
                                                    </div>
                                                }
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                                        onClick={blogsubmit}
                                                    >Update</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <ReactPaginate
                    style={{ background: 'red' }}
                    previousLabel={"Previous"}
                    nextLabel={'Next'}
                    breakLabel={"..."}
                    pageCount={pageData}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={Click}
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
                <hr />

            </Container>
        </>
    )
}

export default ViewBlogs
