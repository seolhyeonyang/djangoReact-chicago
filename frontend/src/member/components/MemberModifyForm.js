import react, { useState } from 'react'
import '../styles/MemberModify.css'
import { memberModify } from '../../api'
import { useHistory } from 'react-router'


const MemberModifyForm = () => {
    
    const history = useHistory()

    const [changedPassword, setChangedPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        const member = JSON.parse(localStorage.getItem("loginedMember"))
        alert(changedPassword)
        member.password = changedPassword
        alert(JSON.stringify(member))

        memberModify({member})
        .then(res => {
            alert(`비밀번호 수정 완료 : ${res.data.result}`)
            
        })

        .catch(err => {
            alert(`비밀번호 수정 실패 : $ {err}`)
        })
    }
    
    return(<>
    <form method="put" onSubmit={handleSubmit} >
    <h2 style={{"text-align":"center"}}>비밀번호 수정</h2>
    <div className="container" className={'center'}>
      <label labelFor="psw"><b>변경할 비밀번호</b></label>
      <input type="password" placeholder="Enter Password" onChange={e => {setChangedPassword(e.target.value)}} name="password" required/>
      
      <button type="submit">확 인</button> 
    
    </div>

    <div className={'center'}>
      <label labelFor="text">비밀번호 변경 후 변경 비밀번호로 재 로그인 해주세요</label>
      <button type="button" onClick={() => {
                        localStorage.setItem("loginedMember","")
                        alert('로그아웃')
                        history.push('/home')}}>로그아웃</button> 
    </div>

  </form>
    </>)
}

export default MemberModifyForm