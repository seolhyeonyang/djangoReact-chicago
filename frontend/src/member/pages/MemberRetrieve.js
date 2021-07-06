import React from 'react'
import '../styles/MemberRetrieve.css'
import { MemberRetrieveForm} from '..'
import { MemberMenu as Menu} from '../../common'
import { MemberNavi as Nav } from '..'


const MemberRetrieve = () => {
    return(<>
    <Nav/>
    <table style={{width: '100%', height:'100%'}}>
        <tr>
            <td style={{width: '20%'}}> <Menu/> </td>
            <td style={{width: '80%'}}> <MemberRetrieveForm/> </td>
        </tr>
    </table>
    </>)
}

export default MemberRetrieve