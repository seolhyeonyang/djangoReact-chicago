import axios from "axios"

const SEVER = "http://127.0.0.1:8000/"

export const userSignup = singupRequest => axios.get(`${SEVER}member/signup`, singupRequest)

export const userLogin = loginRequest => axios.post(`${SEVER}member/login`, loginRequest)