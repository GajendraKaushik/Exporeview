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

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback(( uid )=>{
    
    setIsLoggedIn(true)
    setUserId(uid);
  }, [])
  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserId(null);
  }, [])

  let routes;
  
  if (isLoggedIn){
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
      isLoggedIn: isLoggedIn,
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


