import React from 'react'
import '../styles/MemberList.css'
import { MemberLoginForm} from '../../member'
import { MemberMenu as Menu} from '../../common'
import { MemberNavi as Nav } from '../../member'


const MemberLogin = () => {
    return(<>
    <Nav/>
    <table style={{width: '100%', height:'100%'}}>
        <tr>
            <td style={{width: '20%'}}> <Menu/> </td>
            <td style={{width: '80%'}}> <MemberLoginForm/> </td>
        </tr>
    </table>
    </>)
}

export default MemberLogin