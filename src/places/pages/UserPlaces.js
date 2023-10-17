import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom' 

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';



// const DUMMY_PLACES = [
//     {
//         id:"p1",
//         title:"Hawa Mahal",
//         description:"Regarded as one of the iconic symbols of the state of Rajasthan",
//         imageUrl:"https://static.toiimg.com/img/101335068/Master.jpg",
//         address:"Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
//         location:{
//             let:26.9239363,
//             lng:75.8267438
//         },
//         creator:'u1'

//     },
//     {
//         id:"p2",
//         title:"Hawa Mahal",
//         description:"Regarded as one of the iconic symbols of the state of Rajasthan",
//         imageUrl:"https://static.toiimg.com/img/101335068/Master.jpg",
//         address:"Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
//         location:{
//             let:26.9239363,
//             lng:75.8267438
//         },
//         creator:'u2'

//     }
// ] 



const UserPlaces = (props) =>{
    const [loadedplaces, setLoadedPlaces] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    const userId = useParams().userId;
    //const loadedplaces = DUMMY_PLACES.filter(place => place.creator === userId)

    useEffect(()=>{
        const fetchPlaces = async () =>{
            try{
                const responseData = await sendRequest(
                    `http://localhost:5100/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            }catch (err){}
        };
        fetchPlaces();
    }, [sendRequest, userId]);
    return (
    <React.Fragment>
        <ErrorModal error ={error} onClear = {clearError}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner /> 
            </div>
        )}
      { !isLoading && loadedplaces && <PlaceList items ={loadedplaces} />}
    </React.Fragment>
 );
};
export default UserPlaces;