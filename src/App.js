import React, { useState, useEffect} from 'react';
import HomePage from './components/HomePage'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../src/components/firebase';
const theme = createMuiTheme();

const App = () => {
  
    const [firebaseInitialized, setfirebaseInitialized] = useState(false);
    
    useEffect(() =>{
        firebase.isInitialized().then(value =>{
          setfirebaseInitialized(value)
        })
    })




    return firebaseInitialized !== false ? (

      
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
          </Router>
        </MuiThemeProvider>

      </div>

    ) : (
    <div className="App">
       <CircularProgress />
    </div>
    );


   
}
 
export default App;


