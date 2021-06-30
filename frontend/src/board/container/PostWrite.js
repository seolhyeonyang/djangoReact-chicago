import React, { useState } from 'react'
import './PostWrite.css'
import { userBoard } from '../../api'



const PostWrite = () => {
    const [ userInfo, setUserInfo] = useState({
        title : '',
        content : '',
        created_at : new Date(),
        updated_at : new Date()
    })

    const {title, content} = userInfo

    const handleSubmit = e => {
        e.preventDefault()
        alert(`확인`)
        userBoard({...userInfo})
        .then(res => {
            alert(`게시글 작성 완료 : ${res.data.result}`)
        })
        .catch (err => {
            alert(`게시글 작성 실패 : ${err}`)
        })
    }

    const handleChange = e => {
        const {name , value} = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const handleClick = e => {
        e.preventDefault()
        alert(`취소`)
    }

    return (<>
    <div className = 'PostWrite'>
    <form onSubmit={handleSubmit} method='post' style={{border:"1px solid #ccc"}}>
    <div className="container">
    <h1>게시글 쓰기</h1>
    <p>Please fill in this form to create an account.</p>
    <hr/>

    <label for="title"><b>title</b></label>
    <input type="text" placeholder="Enter title" onChange={handleChange} name="title" value={title}/>

    <label for="content"><b>content</b></label>
    <input type="text" placeholder="Enter content" onChange={handleChange} name="content" value={content}/>
    

    <div class="clearfix">
      <button type="button" className="cancelbtn" onClick = {handleClick}>Cancel</button>
      <button type="submit" className="signupbtn">post write</button>
    </div>
  </div>
</form>

</div>
</>)
}

export default PostWrite
