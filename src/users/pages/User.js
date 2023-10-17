import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const USERS = () => {
    const {isLoading, error, sendRequest, clearEerror} = useHttpClient();
    const [loadedUser, setLoadedUsers] = useState();

    useEffect (() => {
        const fetchUsers = async () =>{
        
            try{
                const responseData = await sendRequest('http://localhost:5100/api/users');

                setLoadedUsers(responseData.users);

            }catch(err){}
        };
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error ={error} onClear = {clearEerror} />
            {isLoading && (
                    <div className="center">
                        <LoadingSpinner/>
                    </div>
                )}
            {!isLoading && loadedUser && < UserList items ={loadedUser}/>}
        </React.Fragment>
    );
}

export default USERS;