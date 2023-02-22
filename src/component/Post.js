import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPost, setEdit, updatePost } from '../redux/features/PostSlice';
import Spinner from './Spinner';
const Post = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [id, setId] = useState("")
    const [textBody, setTextBody] = useState("");
    const { loading, post, body, edit } = useSelector(state => ({ ...state.app }))
    useEffect(() => {
        if (body) {
            setTextBody(body)
        }
    }, [body]);
    const handleFetchData = (e) => {
        e.preventDefault()
        console.log(id)
        if (!id) {
            window.alert('please provide Post Id')
        } else {
            dispatch(getPost({ id }))
            setId("")
        }
    };
    //delete handle
    const handleDelete = ({ id }) => {
        dispatch(deletePost({ id: post[0].id }))
        window.location.reload();
        window.alert("Post Deleted !")
    }
    return (
        <>
            <div className="row container mt-4">
                <form action=''>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Search by Id</label>
                            <input type="number" value={id} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setId(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleFetchData}>Fetch Post</button>
                    <button type="submit" className="btn btn-warning ms-4" onClick={() => navigate("/createPost")}>Create Post</button>
                </form>
            </div>
            <div className='container'>
                {
                    loading ? <Spinner /> : (
                        <>
                            {post.length > 0 && (
                                <>
                                    <div className="card mt-4" >
                                        <div className="card-body">
                                            <h5 className="card-title">{post[0].title}</h5>
                                            {edit ? (<><textarea className="form-control" value={textBody}
                                                onChange={(e) => setTextBody(e.target.value)}
                                                id="floatingTextarea2" style={{ height: 100 }} defaultValue={""} />
                                                <div className='d-flex align-items-end justify-content-end'>

                                                    <button className='btn btn-primary'
                                                        onClick={() => {
                                                            dispatch(updatePost({
                                                                id: post[0].id,
                                                                title: post[0].title,
                                                                body: textBody,
                                                            }))
                                                            dispatch(setEdit({ edit: true, body: "" }))
                                                        }}>Save</button>
                                                    <button className='btn btn-danger ms-4'
                                                        onClick={() => { dispatch(setEdit({ edit: false, body: "" })) }}

                                                    >Cancel</button>
                                                </div>
                                            </>) : (
                                                <>

                                                    <p className="card-text">{post[0].body}</p>
                                                </>
                                            )}
                                            {!edit && (

                                                <div className='d-flex align-items-end justify-content-end'>

                                                    <button className='btn btn-primary' onClick={() => dispatch(setEdit({ edit: true, body: post[0].body }))}>Edit</button>
                                                    <button className='btn btn-danger ms-4' onClick={handleDelete}>Delete</button>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                </>
                            )}
                        </>
                    )
                }
            </div>

        </>
    )
}

export default Post
