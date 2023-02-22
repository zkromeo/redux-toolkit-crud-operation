import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/PostSlice'
import Spinner from './Spinner'
const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" })
  const [showPost, setShowPost] = useState(false);
  const { title, body } = values
  const { loading, post } = useSelector(state => ({ ...state.app }))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handle create Post function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }))
    setValues({ title: "", body: "" })
    setShowPost(true)
  }
  //show created post function 
  const showCreatedPost = () => {
    return (
      <>
        {loading ? <Spinner /> : (
          <>
            <div className="card mt-4" >
              <div className="card-body">
                <h5 className="card-title">{post[0].title}</h5>
                <p className="card-text">{post[0].body}</p>
              </div>
            </div>

          </>
        )

        }
      </>
    )
  }
  return (
    <div className='container'>
      <h1 className='text-center bg-dark text-white p-2'>Create Post</h1>
      <form action=''>
        <div className="mt-4 mb-3">
          <input type="text" value={title} onChange={(e) => setValues({ ...values, title: e.target.value })} placeholder="Enter Post Title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>

        <div className="form-floating">
          <textarea className="form-control" value={body} onChange={(e) => setValues({ ...values, body: e.target.value })} placeholder="Add Post Description" id="floatingTextarea2" style={{ height: 100 }} defaultValue={""} />
          <label htmlFor="floatingTextarea2">Add Post Description</label>
        </div>
        <div className=' mt-4 d-flex align-items-end justify-content-end'>

          <button className='btn btn-primary'
          onClick={()=>{navigate("/")}}>Go Home</button>
          <button type="submit" className='btn btn-danger ms-4' onClick={handleSubmit}>Submit</button>
        </div>
      </form>
      <div className='mt-4'>
        {showPost && <div>{showCreatedPost()}</div>}

      </div>
    </div>
  )
}

export default CreatePost
