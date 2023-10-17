import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () =>{

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activehttpRequests = useRef([]);

    const sendRequest = useCallback(
       async (url, method ='GET', body = null, headers = {}) =>{
        setIsLoading(true);
        const httpAbortctrl = new AbortController();
        activehttpRequests.current.push(httpAbortctrl);

        try{
            const responce = await fetch(url,{
                method,
                body,
                headers,
                signal: httpAbortctrl.signal
            });
            const responseData = await responce.json();

            activehttpRequests.current = activehttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortctrl
            );

            if (!responce.ok){
                throw new Error(responseData.message);
            }
            setIsLoading(false);
            return responseData;
        }catch (err){
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
       },[]
        
    );
 
    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activehttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        };
    }, []);
    return {isLoading, error, sendRequest, clearError}
}