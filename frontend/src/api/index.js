import axios from "axios"

const SEVER = "http://127.0.0.1:8000/"
const headers = {'Content-Type':'application/json'}

export const userSignup = body => axios.post(`${SEVER}member/signup`, {headers, body})

export const userLogin = body => axios.post(`${SEVER}member/login`, {headers, body})

export const userBoard = body => axios.post(`${SEVER}board/create`, {headers, body})