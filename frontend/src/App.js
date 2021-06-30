import React from 'react'
import { Redirect, Route } from "react-router-dom"
import { Login, Signup, UserDetail, UserEdit,UserList  } from './user'
import { Home, User, Board, Item, Stock} from './templates'
import { PostWrite } from './board'
import { Nav } from './common'
import { BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
const App = () => {
  return (<div>
    <Router>
        <Nav/>
        <Route exact path='/home' component={Home}/>
        <Redirect exact from={'/'} to={'/home'}/>
        
        <Route exact path='/user' component={User}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup-form' component={Signup}/>
        <Route exact path='/user-detail' component={UserDetail}/>
        <Route exact path='/user-edit' component={UserEdit}/>
        <Route exact path='/user-list' component={UserList}/>

        <Route exact path='/item' component={Item}/>

        <Route exact path='/board' component={Board}/>
        <Route exact path='/post-list' component={PostWrite}/>
        <Route exact path='/post-register' component={PostWrite}/>
        <Route exact path='/post-retrieve' component={PostWrite}/>
        <Route exact path='/post-update' component={PostWrite}/>
        <Route exact path='/post-delete' component={PostWrite}/>

        <Route exact path='/stock' component={Stock}/>
    </Router>
  </div>)
}

export default App