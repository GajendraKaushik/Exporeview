import React from 'react'

import Useritem from './UserItem'
import Card from '../../shared/components/UIElements/Card'

import './UserList.css'

const UserList = (props) => {
    if (props.items.length === 0){
        return (
            <div className='center'>
                <Card>
               <h2>No User Registered !</h2>
               </Card>
            </div>
        )
    }
    return <ul className='user-list'>
        {props.items.map(user => { 
            return < Useritem  
            key={user.id} 
            id = {user.id}  
            image = {user.image} 
            name = {user.name} 
            placeCount = {user.places.length}/>
        })}
    </ul>
}

export default UserList;