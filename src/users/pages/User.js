import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const USERS = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUser, setLoadedUsers] = useState();

    useEffect (() => {
        const sendRequest = async () =>{
            setIsLoading(true);
            try{
                const responce = await fetch('http://localhost:5100/api/users');

                const responseData = await responce.json();

                if (!responce.ok){
                    throw new Error(responseData.message);
                }
                setLoadedUsers(responseData.users);

            }catch(err){
                setError(err.message);
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const errorHandler = () =>{
        setError(null);  // after showing error setting it to null 
    }

    return (
        <React.Fragment>
            <ErrorModal error ={error} onClear = {errorHandler} />

            {
                isLoading && (
                    <div className="center">
                        <LoadingSpinner/>
                    </div>
                )
            }
            {!isLoading && loadedUser && < UserList items ={loadedUser}/>}

        </React.Fragment>
    );
}

export default USERS;