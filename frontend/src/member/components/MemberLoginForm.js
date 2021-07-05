import React, {useState} from 'react'
//import '../styles/MemberList.css'
import { memberLogin } from '../../api'
import { useHistory } from 'react-router'

const MemberLoginForm = () => {

  const history = useHistory()
  
  const [ userInfo, setUserInfo ] = useState({
    username : '',
    password : ''
  })

  const {username, password} = userInfo

  const handleChange = e => {
    const {name, value} = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    alert(`로그인`)
    memberLogin({...userInfo})
    .then(res => {
      if(res.data.result === 'PASSWORD_FAIL'){
        alert(`비밀번호가 틀립니다.`)
        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
      
      }else if(res.data.result === 'USERNAME_FAIL'){
        alert(`아이디가 틀립니다.`)

      }else{
        alert(`로그인 성공 : ${JSON.stringify(res.data)}`)
        localStorage.setItem("loginedMember", JSON.stringify(res.data))
        history.push('/member-list')
      }
    })
    .catch(err => {
      alert(`로그인 실패 : ${err}`)
    })
  }

  const handleClick = e => {
    e.preventDefault()
    alert(`취소`)
  }
    return (
        <>
        
        <h2>Login Form</h2>
        <hr/>

        <form onSubmit={handleSubmit} action="/action_page.php" method="post">
          <div class="imgcontainer">
            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" class="avatar"/>
          </div>
        
          <div className="container">
            <label for="username"><b>UserID</b></label>
            <input type="text" placeholder="Enter Username" onChange={handleChange} id="username" name="username" value={username} required/>
        
            <label for="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" onChange={handleChange} id="password" name="password" value={password} required/>
                
            <button type="submit">Login</button>
            <label>
              <input type="checkbox" checked="checked" name="remember"/> Remember me
            </label>
          </div>
        
          <div class="container" style={{backgroundColor:"#f1f1f1"}}>
            <button type="button" class="cancelbtn" onClick={handleClick}>Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
          </div>
        </form>
        </>
    )
}

export default MemberLoginForm