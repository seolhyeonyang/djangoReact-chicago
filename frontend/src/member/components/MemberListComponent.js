import React, {useEffect, useState} from 'react'
import '../styles/MemberList.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Footer from '@material-ui/core/Table';
import { memberList } from '../../api';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
      
    },
  });
  const usePageStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          marginTop: theme.spacing(2),
        },
      },
    }));

const MemberListComponent = () => {
    const [ members, setMembers ] = useState([])

    const [ page, setPage ] = useState(1)
    const [ rowsPerPage, setRowsPerPage ] = useState(5)

    const classes = useStyles();
    const pageClasses = usePageStyles();

    useEffect( () => {
      memberList()
      .then( res => {
        setMembers(res.data)
      })
      .catch(err => {
        console.log(err.data)
      })
    }, [])

    const handleClick = member => {
      localStorage.setItem("selectedMember", member)
    }

    const handleChange = (e, newPage) => {
      setPage(newPage)
    }

    const handleChangePage = e => {
      setRowsPerPage(parseInt(e.target.value, 5))
      setPage(1)
    }

    

    return (<>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>NO.</TableCell>
              <TableCell align="right">회원 ID</TableCell>
              <TableCell align="right">비밀번호</TableCell>
              <TableCell align="right">회원 이름</TableCell>
              <TableCell align="right">이메일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { members.length != 0
             ? members
             .slice((page * rowsPerPage)-5, (page * rowsPerPage)-5 + rowsPerPage)
             //(page * rowsPerPage)-3 가 0이다, 그냥 숫자로 넣으면 계속 같은 데이터 나옴
             .map(({username, password, name, email }, i) => (
                 <TableRow key={username}>
                 <TableCell component="th" scope="row">
                 {(page * rowsPerPage)-4 + i}
                 </TableCell>
                 <TableCell align="right">{username}</TableCell>
                 <TableCell align="right">{password}</TableCell>
                 <TableCell align="right"><Link to = {`/member-detail/${username}`}
                 onClick = {() =>  handleClick(JSON.stringify({username, password, name, email}))}>{name}</Link></TableCell>
                 <TableCell align="right">{email}</TableCell>
             </TableRow>)
            )
            :  <TableRow>
            <TableCell component="th" scope="row" colSpan="4">
               <h1>등록된 데이터가 없습니다</h1>
            </TableCell>
        </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <div className={pageClasses.root}>
        <Typography className={'page'}>Page : {page}</Typography>
          <Pagination count={parseInt(members.length/5)+1} color="primary"
          className={'center'}
          rowsPerPage = {rowsPerPage}
          onChange = {handleChange}
          onChangePage = {handleChangePage}/>
      </div>
      </>);
}
  export default MemberListComponent