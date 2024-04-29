import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginRegPages/LoginPage';
import RegPage from './component/LoginRegPages/RegPage';
import MenuPage from './component/menu/MenuPage';
import PrivateRoute from '../features/privateRoute';
import RulesPage from './component/rules/RulesPage';
import SettingsPage from './component/settings/SettingsPage';
import CreateGamePage from './component/CreateGame/CreateGamePage';
import FindGamePage from './component/findGame/FindGamePage';


const App = () => {
  return(
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={ <LoginPage/>} />
            <Route path="/reg" element={ <RegPage/> } /> 
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
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;