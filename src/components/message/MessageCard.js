import React, {useState} from 'react'
import {Button} from 'react-bootstrap'
import dataManager from '../../modules/dataManager'
import './Message.css'


const MessageCard = props => {

    const [isLoading, setIsLoading] = useState(false)
    const currentUser = parseInt(localStorage.getItem("user"))
    var myStuff = ""

    if(currentUser===props.message.member.id){
         myStuff = props.message
    }else{
         myStuff = ""
    }

    const handleDelete = (id) => {
        setIsLoading(true)
        dataManager.delete('messages', id)
        .then(() => {
            setIsLoading(false)
            props.setToggle(!props.toggle)
        })
    }

    return(
        <div className='message-card'>
            <div onClick={()=>props.setText(myStuff)}  className='message-card-content'>
                <img src={props.message.member.image} alt={props.message.member.id} />
                <div className = 'message-name'>{props.message.member.user.first_name} {props.message.member.user.last_name}</div>
                {currentUser===props.message.member.id  || currentUser===props.message.group.leader.id?
                <Button id= {`Deny-${props.message.member.id}`} disabled={isLoading} onClick={()=>handleDelete(props.message.id)}>Delete</Button>
                :null}
            </div>
                <p>{props.message.description}</p>
                <div>{props.message.date}</div>
        </div>
        
    )
}

export default MessageCard