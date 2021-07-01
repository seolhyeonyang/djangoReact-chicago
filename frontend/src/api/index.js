import axios from "axios"


const SEVER = "http://127.0.0.1:8000/"
const headers = {'Content-Type':'application/json'}

/* Member */ 
export const memberLogin = body => axios.post(`${SEVER}api/member/login`, {headers, body})
export const memberDelete = body => axios.post(`${SEVER}api/member/delete`, {headers, body})
export const memberDetail = body => axios.post(`${SEVER}api/member/detail`, {headers, body})
export const memberList = () => axios.get(`${SEVER}adm/member/list`)
export const memberModify = body => axios.post(`${SEVER}api/member/modify`, {headers, body})
export const MemberRegister = body => axios.post(`${SEVER}api/member/register`, {headers, body})
export const memberRetrieve = body => axios.post(`${SEVER}adm/member/retrieve`, {headers, body})

/* Item */
export const itemDelete = body => axios.post(`${SEVER}item/delete`, {headers, body})
export const itemDetail = body => axios.post(`${SEVER}item/detail`, {headers, body})
export const itemList = body => axios.post(`${SEVER}item/list`, {headers, body})
export const itemModify = body => axios.post(`${SEVER}item/modify`, {headers, body})
export const itemRegister = body => axios.post(`${SEVER}item/register`, {headers, body})
export const itemRetrieve = body => axios.post(`${SEVER}item/retrieve`, {headers, body})

/* board */
export const boardDelete = body => axios.post(`${SEVER}api/board/delete`, {headers, body})
export const boardDetail = body => axios.post(`${SEVER}api/board/detail`, {headers, body})
export const boardList = body => axios.post(`${SEVER}api/board/list`, {headers, body})
export const boardModify = body => axios.post(`${SEVER}api/board/modify`, {headers, body})
export const boardRegister = body => axios.post(`${SEVER}api/board/register`, {headers, body})
export const boardRetrieve = body => axios.post(`${SEVER}api/board/retrieve`, {headers, body})