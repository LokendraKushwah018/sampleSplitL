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
import '../css/viewblog.css'
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
    const [types, setTypes] = useState([])
    const [description, setDescription] = useState([])
    const [imageName, setImageName] = useState(' ')
    const [ID, setid] = useState('')
    const [editBlog, setEditBlog] = useState([])
    // const [video, setVideo] = useState([])
    const [pageData, setPageData] = useState(0)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setImageName(null)
        console.log('successfully close', show, imageName);
    }

    const handleshow = () => {
         setShow(true); 
        console.log('successfully open', show, imageName);
    }

    const token = useSelector(state => state.admin.adminlogintoken)

    const adminblog = (id) => {
        axios({
            url: `${adminbaseurl}getAllBlog?page=${1}`,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }

        }).then((response) => {
            console.log(response)
            setGetblog(response.data.findBlog.rows)
            const Count = response.data.findBlog.count
            console.log(Count)
            setPageData(Math.ceil(Count / 10));
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
        // setShow(true);
        // setTimeout(() => {
            axios({
                url: `${adminbaseurl}getBlogById/${id}`,
                method: "get",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res)
                // console.log(res.data.findBlog)
                setEditBlog(res.data.findBlog)
                const setGetblog = res.data.findBlog
                setTitle(setGetblog.title)
                setDescription(setGetblog.description)
                setImageName(setGetblog.imageName)
                // setVideo(setGetblog.imageName)
                setid(setGetblog.id)
                setTypes(setGetblog.type)
                console.log(id)
            }).catch((err) => {
                console.log(err)
            })
        // }, 2000)
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
        console.log(imageName, title, description)
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
        adminblog();
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
                <table className="table" >
                    <thead>
                        <tr className='tabletr'>
                            <th>S.No</th>
                            <th>Date</th>
                            <th >Image/Video</th>
                            <th>Title</th>
                            <th className='tablehead'>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {getblog.map((data, index) => {
                        return <>
                            <tbody key={index}>
                                <tr >
                                    <th scope="row">{index + 1}</th>
                                    {data.type === 'video' ?
                                        <>
                                            <td><time className=" text-dark ">{data.Date}</time></td>
                                            <td><video className="card___video"
                                                controls controlsList='nodownload'>
                                                <source src={data.imageName} type="video/mp4">
                                                </source>
                                            </video>  </td>
                                            <td > <p  className='videotitle' 
                                            // style={{
                                            //     width: '100px',
                                            //     overflow: 'hidden',
                                            //     whiteSpace: 'nowrap',
                                            //     textOverflow: 'ellipsis',
                                            //     backgroundColor: 'white'}} 
                                            >{data.title} </p></td>
                                            <td > <p className='videoDesc' 
                                            // style={{
                                            //     width: '150px',
                                            //     overflow: 'hidden',
                                            //     whiteSpace: 'nowrap',
                                            //     textOverflow: 'ellipsis',
                                            //     backgroundColor: 'white'}} 
                                            >{data.description}</p> </td>
                                        </>
                                        :
                                        <>
                                            {data.type === "text" ?
                                                <>
                                                    <td><time className=" text-dark ">{data.Date}</time></td>
                                                    <td className='text-dark'>Not Uploaded</td>
                                                    <td > <p className='videotitle'  
                                                    // style={{
                                                    //     width: '100px',
                                                    //     overflow: 'hidden',
                                                    //     whiteSpace: 'nowrap',
                                                    //     textOverflow: 'ellipsis',
                                                    //     backgroundColor: 'white' }} 
                                                    >{data.title} </p></td>
                                                    {/* <div className="overflow-auto"> */}
                                                    <td>
                                                        <p className='videoDesc'
                                                        // style={{
                                                        //     width: '150px',
                                                        //     overflow: 'hidden',
                                                        //     whiteSpace: 'nowrap',
                                                        //     textOverflow: 'ellipsis',
                                                        //     backgroundColor: 'white'}} 
                                                        >{data.description}</p></td>
                                                    {/* </div> */}
                                                </> : <>
                                                    <td><time className=" text-dark ">{data.Date}</time></td>
                                                    <td><img
                                                        src={data.imageName}
                                                        className="card___image" alt="..." /></td>
                                                    {/* <time className="card__date text-dark">{data.Date}</time> */}
                                                    <td > <p className='videotitle'
                                                    // style={{
                                                    //     width: '100px',
                                                    //     overflow: 'hidden',
                                                    //     whiteSpace: 'nowrap',
                                                    //     textOverflow: 'ellipsis',
                                                    //     backgroundColor: 'white' }} 
                                                    >{data.title} </p></td>
                                                    <td>
                                                        <p className='videoDesc'
                                                        // style={{
                                                        //     width: '150px',
                                                        //     overflow: 'hidden',
                                                        //     whiteSpace: 'nowrap',
                                                        //     textOverflow: 'ellipsis',
                                                        //     backgroundColor: 'white'}} 
                                                        >{data.description}</p></td>
                                                </>
                                            }
                                        </>
                                    }
                                    <td onClick={handleshow}><EditIcon data-bs-toggle="modal"
                                        data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap"
                                        onClick={() => editblogs(data.id)}> </EditIcon> </td>
                                    <td> <DeleteIcon
                                        onClick={() => { blogdelete(data.id) }}>
                                    </ DeleteIcon></td>
                                </tr>
                                <div className="modal fade" id="exampleModal" tabIndex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    successfully Close    <div className="modal-dialog">
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
                                                    <div>
                                                        <label htmlFor="recipient-name" className="col-form-label">Title</label>
                                                        <p className='inputmodel'><input
                                                            value={title} onChange={(e) => setTitle(e.target.value)}
                                                            type="text" className="form-control" id="recipient-name" /></p>
                                                    </div>
                                                    <div >
                                                        <label htmlFor="message-text" className="col-form-label">Description</label>
                                                        <p className='inputmodel'>
                                                        <textarea className="form-control" id="message-text" value={description}
                                                            onChange={(e) => setDescription(e.target.value)} name="description"/>
                                                    </p></div>
                                                    {types === "video" ?
                                                        <div >
                                                            <label className="col-form-label" >Video</label>
                                                            <p className='inputmodel'>
                                                            <input type="file" className="form-control" id="recipient-name"
                                                                onChange={(e) => setImageName(e.target.files[0])} /></p>
                                                            <video width="200" height="120"
                                                                controls controlsList='nodownload'>
                                                                <source src={imageName} type="video/mp4">
                                                                </source>
                                                            </video>
                                                        </div>
                                                        :
                                                        <div>
                                                            {types === "picture" ?
                                                                <div >
                                                                    <label className="col-form-label" >Image</label>
                                                                    <p className='inputmodel'>
                                                                    <input type="file" className="form-control" id="recipient-name"
                                                                        onChange={(e) => setImageName(e.target.files[0])} /></p>
                                                                    <img src={imageName} alt="/" style={{ width: '120px', height: '80px', marginTop: '10px' }} />
                                                                </div>
                                                                :
                                                                <br />
                                                            }
                                                        </div>
                                                    }
                                                    <div className="modal-footer ">                                                   
                                                        <button type="button" className="btn btn-secondary " data-bs-dismiss="modal" onClick={handleClose}
                                                        > Close</button>
                                                         {editBlog.title === title && editBlog.description === description && editBlog.imageName ?
                                                         <button type="button" className="btn btn-primary mt-2 mb-0" disabled >Update</button>: 
                                                        <button type="button" className="btn btn-primary mt-2 mb-0" data-bs-dismiss="modal"
                                                            onClick={blogsubmit}
                                                        >Update</button>}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tbody>
                        </>
                    })}
                </table>
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
                <br />
            </Container>
        </>
    )
}

export default ViewBlogs
