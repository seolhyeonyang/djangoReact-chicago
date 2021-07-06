import react from 'react'
import '../styles/MemberRetrieve.css'


const MemberRetrieveForm = () => {
    return(<>
    <h2 style={{"text-align":"center"}}>회원 이름 검색</h2>
    
    <div class="container" className={'input'}>
        <input type="text" placeholder="Enter name" name="name" required/>
        <button type="button" class="cancelbtn"> 검색 </button>
    </div>


</>)
}

export default MemberRetrieveForm