import React from 'react'
import '../styles/MemberList.css'
import { MemberRegisterForm} from '../../member'
import { MemberMenu as Menu} from '../../common'
import { MemberNavi as Nav } from '../../member'


const MemberRegister = () => {
    return(<>
    <Nav/>
    <table style={{width: '100%', height:'100%'}}>
        <tr>
            <td style={{width: '20%'}}> <Menu/> </td>
            <td style={{width: '80%'}}> <MemberRegisterForm/> </td>
        </tr>
    </table>
    </>)
}

export default MemberRegister