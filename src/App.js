import React, { useCallback, useState } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation';
import User from './users/pages/User';
import UserPlaces from './places/pages/UserPlaces';
import NewPlaces from './places/pages/NewPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { Authcontext } from './shared/context/auth-context';

const App = () => {

  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token )=>{
    
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  localStorage.setItem(
    'userData',
    JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString()
    })
  ); 

  }, [])
  const logout = useCallback(()=>{
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;
  
  if (token){
    routes= (
      <Switch>
        <Route path ="/" exact = {true}>
          <User/>
        </Route>
        <Route path="/:userId/places" exact>
         <UserPlaces />
        </Route>
       <Route path="/places/new" exact>
         < NewPlaces />
       </Route>
       <Route path="/places/:placeId">
         <UpdatePlace/>
       </Route>
       <Redirect to ="/" />
      </Switch>
    )
  }else{
    routes =(
      <Switch>
        <Route path ="/" exact = {true}>
          <User/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
       </Route>
       <Route path ="/auth">
         <Auth />
       </Route>
        <Redirect to = "/auth"/>
      </Switch>
    )
  }



  return (
    <Authcontext.Provider 
    value = {{
      isLoggedIn: !! token,
      token: token,
      userId: userId,
      login:login, 
      logout: logout 
    }} 
    >
      <Router>
    <MainNavigation/>
    <main>
    {routes}
    </main>  {/* this is used to specifiy the main componenet of the documnenet*/}
  </Router>
  </Authcontext.Provider>)
}

export default App;


