import { Route, Redirect } from "react-router-dom"
import React, { useState, useEffect} from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import dataManager from '../modules/dataManager'
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import currentUser from "../hooks/ui/useSimpleAuth"
import MemberList from '../components/member/MemberList'
import MemberDetail from '../components/member/MemberDetail'
import GroupList from '../components/group/GroupList'
import GroupDetail from '../components/group/GroupDetail'
import RequestList from '../components/requests/RequestList'
import NavBar from '../nav/NavBar'
import MessageList from '../components/message/MessageList'
import PrayerList from '../components/prayer/PrayerList'
import MeetingList from '../components/meeting/MeetingList'
import MeetingDetail from '../components/meeting/MeetingDetail'
import MeetingForm from '../components/meeting/MeetingForm'
import GroupForm from '../components/group/GroupForm'


const ApplicationViews = props => {
    const [memberGroups, setMemberGroups] = useState([{member:{}}])
    const [member, setMember] = useState([])
    const [inGroup, setInGroup] = useState(false)
    const currentUser = parseInt(localStorage.getItem("user")||0);
    const [toggle, setToggle] = useState(false)
    const { isAuthenticated } = useSimpleAuth() 
    console.log(currentUser)
    const getMemberGroups = () =>{
        if(currentUser === 0){

        }else{
    
        return dataManager.getAll('membergroups/listall')
            .then((membergroups)=> {
                setMemberGroups(membergroups);
                
            })
            .catch((err) => console.error('There was an issue with getting all groups:', err))
        
    }}
    const getUserInfo = () =>{
        if(currentUser === 0){

        }else{
        return dataManager.get('members', currentUser)
        .then((member)=>{
            setMember(member)
        })
        .catch((err) => console.error('There was an issue with getting user info:', err))
    }}
    const isInGroup = () => {
        if(memberGroups.detail=='Invalid token.'){

        }else{
        memberGroups.map(group=>{
            if (parseInt(group.member.id) === currentUser&&group.is_approved===true){
                setInGroup(true)
            }
        })}
    }
    useEffect(() => {
        getMemberGroups();
    },[isAuthenticated()])
    useEffect(() =>{
        isInGroup()
    },[memberGroups])
    
    useEffect(() => {
        getUserInfo()
    },[currentUser])
    
    

    return(
        <React.Fragment>
            <NavBar toggle={toggle} isInGroup={isInGroup} inGroup={inGroup} member={member} setToggle={setToggle}{...props} />
            <Route
                exact path="/register" render={props => {
                    return <Register toggle={toggle} {...props} />
                }}
            />
            <Route
                exact path="/login" render={props => {
                    return <Login toggle={toggle} {...props} />
                }}
            />
            
            <Route
                exact path="/members" render={props => {
                    if(isAuthenticated()){
                    return <MemberList toggle={toggle} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                    
                }}
            />
            <Route
                exact path="/members/:memberId(\d+)" render={props => {
                    if(isAuthenticated()){
                    return <MemberDetail toggle={toggle}{...props} memberId={parseInt(props.match.params.memberId)} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/groups" render={props => {
                    if(isAuthenticated()){
                    return <GroupList toggle={toggle} inGroup={inGroup} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/groups/:groupId(\d+)" render={props => {
                    if(isAuthenticated()){
                    return <GroupDetail toggle={toggle} {...props} groupId={parseInt(props.match.params.groupId)} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/group" render={props => {
                    if(isAuthenticated()){
                    return <GroupForm toggle={toggle} currentUser={currentUser} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/membergroups" render={props => {
                    if(isAuthenticated() && inGroup){
                    return <RequestList toggle={toggle} {...props} />
                    }else{
                    return <Redirect to='groups'/>}
                }}
            />
            <Route
                exact path="/messages" render={props => {
                    if(isAuthenticated() && inGroup){
                    return <MessageList toggle={toggle} currentUser={currentUser} {...props} />
                    }else{
                    return <Redirect to='groups'/>}
                }}
            />
            <Route
                exact path="/prayers" render={props => {
                    if(isAuthenticated() && inGroup){
                    return <PrayerList toggle={toggle} currentUser={currentUser} {...props} />
                    }else{
                    return <Redirect to='groups'/>}
                }}
            />
            <Route
                exact path="/meetings" render={props => {
                    if(isAuthenticated() && inGroup){
                    return <MeetingList toggle={toggle} currentUser={currentUser} {...props} />
                    }else{
                    return <Redirect to='groups'/>}
                }}
            />
             <Route
                exact path="/meetings/:meetingId(\d+)" render={props => {
                    if(isAuthenticated()){
                    return <MeetingDetail toggle={toggle}{...props} meetingId={parseInt(props.match.params.meetingId)} />
                    }else{
                    return <Redirect to='groups'/>}
                }}
            />
             <Route
                exact path="/meeting" render={props => {
                    if(isAuthenticated() && inGroup){
                    return <MeetingForm toggle={toggle} currentUser={currentUser} {...props} />
                    }else{
                    return <Redirect to='groups'/>}
                }}
            />
            <Route
                exact path="/" render={props => {
                    if(isAuthenticated()){
                    return <MessageList toggle={toggle} currentUser={currentUser} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)