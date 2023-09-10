import React from 'react'
import { useParams } from 'react-router-dom' 

import PlaceList from '../components/PlaceList';


const DUMMY_PLACES = [
    {
        id:"p1",
        title:"Hawa Mahal",
        description:"Regarded as one of the iconic symbols of the state of Rajasthan",
        imageUrl:"https://static.toiimg.com/img/101335068/Master.jpg",
        address:"Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
        location:{
            let:26.9239363,
            lng:75.8267438
        },
        creator:'u1'

    },
    {
        id:"p2",
        title:"Hawa Mahal",
        description:"Regarded as one of the iconic symbols of the state of Rajasthan",
        imageUrl:"https://static.toiimg.com/img/101335068/Master.jpg",
        address:"Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
        location:{
            let:26.9239363,
            lng:75.8267438
        },
        creator:'u2'

    }
] 



const UserPlaces = (props) =>{
    const userId = useParams().userId;
    const loadedplaces = DUMMY_PLACES.filter(place => place.creator === userId)
    return <PlaceList items ={loadedplaces}/>
}
export default UserPlaces;