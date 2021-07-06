import React from 'react'
import { Redirect, Route } from "react-router-dom"
import { MemberDelete ,MemberDetail, MemberList, MemberModify, MemberRegister, MemberLogin, MemberRetrieve } from './member'
import { Home, Member, Board, Item, Stock} from './templates'
import { ItemDelete, ItemDetail, ItemList, ItemModify, ItemRegister, ItemRetrieve} from './item'
import { PostRegister } from './board'
import { BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { memberDelete } from './api'


const App = () => {
  return (<div>
    <Router>
        
        <Route exact path='/home' component={Home}/>
        <Redirect exact from={'/'} to={'/home'}/>
        <Redirect exact from={'/member-logout'} to={'/home'}/>
        
        <Route exact path='/user' component={Member}/>
        <Route exact path='/member-login' component={MemberLogin}/>
        <Route exact path='/member-delete' component={MemberDelete}/>
        <Route exact path='/member-detail/:id' component={MemberDetail}/>
        <Route exact path='/member-list' component={MemberList}/>
        <Route exact path='/member-logout' component={Home}/>
        <Route exact path='/member-modify' component={MemberModify}/>
        <Route exact path='/member-register' component={MemberRegister}/>
        <Route exact path='/member-retrieve' component={MemberRetrieve}/>

        <Route exact path='/item' component={Item}/>
        <Route exact path='/item-delete' component={ItemDelete}/>
        <Route exact path='/item-detail' component={ItemDetail}/>
        <Route exact path='/item-list' component={ItemList}/>
        <Route exact path='/item-modify' component={ItemModify}/>
        <Route exact path='/item-register' component={ItemRegister}/>
        <Route exact path='/item-retrieve' component={ItemRetrieve}/>

        <Route exact path='/board' component={Board}/>
        <Route exact path='/post-list' component={PostRegister}/>
        <Route exact path='/post-register' component={PostRegister}/>
        <Route exact path='/post-retrieve' component={PostRegister}/>
        <Route exact path='/post-update' component={PostRegister}/>
        <Route exact path='/post-delete' component={PostRegister}/>

        <Route exact path='/stock' component={Stock}/>
    </Router>
  </div>)
}

export default App