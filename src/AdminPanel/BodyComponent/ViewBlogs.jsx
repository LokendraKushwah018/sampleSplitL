import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Container from '../../Components/Adminlayout/Container'
import { PageHeader } from '../Common/Components'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// import './ViewBlogs.scss'

const ViewBlogs = () => {
    const [getblog, setGetblog] = useState([])

    const adminblog = () => {
        axios({
            url: "http://localhost:5001/api/user/getBloges",
            method: 'get'

        }).then((response) => {
            console.log(response)
            setGetblog(response.data.findBlog)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        adminblog()
    }, [])

    return (
        <>
            <Container>
                <PageHeader title='View Blogs' />
                {getblog.map((data, index) => {
                    return (
                        <div key={index}
                            style={{ width: '800px' , backgroundColor:'dark' }}>
                            {data.type === 'video' ?
                                <div className="card" key={index}
                                style={{ backgroundColor:'black' }}>
                                    
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
                                    <p style={{ marginTop:'-400px' , color: 'white'}}>
                                     <EditIcon ></EditIcon> 
                                     <DeleteIcon /></p>                 
                                </div>                                
                                :
                                <div>
                                    {data.type === "text"
                                        ?
                                        <div className='card__one bg-black'>
                                              
                                            <div className="card__content__one ">
                                                <time className="card__date__one text-white">{data.Date}</time>
                                                <h4 className=" text-white " ><b>{data.title}</b></h4>
                                                <p>{data.description}</p>
                                            </div> <EditIcon/>               
                                        </div>
                                        :
                                        <div className="card bg-black" key={index}>
                                            <img
                                                src={data.imageName}
                                                className="card__image" alt="brown couch" />
                                            <div className="card__content">
                                                <time className="card__date text-white">{data.Date}</time>
                                                <h4 className=" text-white" ><b>{data.title}</b></h4>
                                                <p>{data.description}</p>
                                            </div>
                                            <EditIcon/> 
                                        </div>
                                     }
                                </div>                            
                            }
                        </div>
                    )
                })}
<hr />


            </Container>
        </>

    )
}

export default ViewBlogs
