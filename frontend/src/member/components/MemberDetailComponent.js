import React, { useEffect, useState } from 'react'
import '../styles/MemberDetail.css'
import { useHistory } from 'react-router'


const MemverDetailComponent = () => {

    const [member, setMember] = useState({})

    const history = useHistory()

    const handleClick = e => {
      e.preventDefault()
      history.goBack()
    }

    useEffect( () => {
      setMember(JSON.parse(localStorage.getItem("selectedMember")))
    }, {})

    return (<>
      <div className="member-detail-card">
                <h2 style={{"text-align":"center"}}>회원 정보</h2>

                <img src="https://www.w3schools.com/w3images/team2.jpg" className="center"/>

                <h1 style={{"text-align":"center"}}>{member.name}</h1>

                    <p className="member-detail-title" style={{"text-align":"center"}}>회원 ID : {member.username}</p>
                    <p style={{"text-align":"center"}}>회원 E-mail : {member.email}</p>

                    <div style={{"margin": "24px 0"}}>
                      <a className="member-detail-a" href="#"><i className="fa fa-dribbble"></i></a> 
                      <a className="member-detail-a" href="#"><i className="fa fa-twitter"></i></a>  
                      <a className="member-detail-a" href="#"><i className="fa fa-linkedin"></i></a>  
                      <a className="member-detail-a" href="#"><i className="fa fa-facebook"></i></a> 
                    </div>
                    <p className="center"><button className="member-detail-button" onClick={handleClick}> 뒤로 가기 </button></p>
                </div>
    </>)
}

export default MemverDetailComponent