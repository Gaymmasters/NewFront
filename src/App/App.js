import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginRegPages/LoginPage';
import RegPage from './component/LoginRegPages/RegPage';
import MenuPage from './component/menu/MenuPage';
import PrivateRoute from '../features/privateRouting/privateRoute';
import RulesPage from './component/rules/RulesPage';
import SettingsPage from './component/settings/SettingsPage';
import CreateGamePage from './component/CreateGame/CreateGamePage';
import FindGamePage from './component/findGame/FindGamePage';
import GameLoginPage from './component/findGame/gameLogin/GameLoginPage';
import GamePage from './component/game/GamePage';
import PrivateRouteToGame from '../features/privateRouting/privateRouteToGame';
import ErrorPage from './component/errorPage/ErrorPage';


const App = () => {
  return(
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={ <LoginPage/>} />
            <Route path="/reg" element={ <RegPage/> } /> 
            <Route path='*' element={<ErrorPage/>} />
            <Route path = "/" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/' element={<MenuPage/>} />
            </Route>
            <Route path = "/rules" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/rules' element={<RulesPage/>} />
            </Route>
            <Route path = "/settings" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/settings' element={<SettingsPage/>} />
            </Route>
            <Route path = "/creategame" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/creategame' element={<CreateGamePage/>} />
            </Route>
            <Route path = "/findgame" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/findgame' element={<FindGamePage/>} />
            </Route>
            <Route path = "/gamelogin" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/gamelogin' element={<GameLoginPage/>} />
            </Route>
            <Route path = "/game/*" element={<PrivateRouteToGame way={"/login"}/>}>
              <Route path='/game/*' element={<GamePage/>} />
            </Route>
            <Route path = "/g" element={<PrivateRoute way={"/login"}/>}>
              <Route path='/g' element={<GamePage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;