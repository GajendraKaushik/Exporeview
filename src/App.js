import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

import MainNavigation from './shared/components/Navigation/MainNavigation';
import User from './users/pages/User';
import UserPlaces from './places/pages/UserPlaces';
import NewPlaces from './places/pages/NewPlaces';

const App = () => {
  return <Router>
    <MainNavigation/>
    <main>
    <Switch>
    <Route path ="/" exact = {true}>
    <User/>
    </Route>
    <Route path ="/:userId/places">
      <UserPlaces />
    </Route>
    <Route path ="/places/new" exact>
    < NewPlaces />
    </Route>
    <Redirect to = "/"/>
    </Switch>
    </main>  {/* this is used to specifiy the main componenet of the documnenet*/}
  </Router>
}

export default App;


