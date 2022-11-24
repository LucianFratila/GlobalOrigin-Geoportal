// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect, useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AxiosInit from "./common/axios/AxiosInit";
import { API_SERVER } from "./config";
import { SetObject, GetObject } from "./common/utils/StorageObject.js";
import { LangContext } from "./common/languages/Translate";
// import UserMenu from "./common/header/UserMenu";
// import LangMenu from "./common/header/LangMenu";
import LoginForm from "./common/auth/LoginForm";
import RegisterForm from "./common/auth/RegisterForm";
import ForgotForm from "./common/auth/ForgotForm";

import ConcessionsPage from "concessions/ConcessionsPage";
import HarvestingPage from "harvesting/HarvestingPage";

///// UI Components Imports//////
import MainNav from "components/mainNav/mainNav";
import useStore from "common/utils/stateStore/useStore";


import Map from "map/Map";

function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(GetObject("user") ? GetObject("user") : "guest");
  const [jwt, setJwt] = useState(GetObject("jwt") ? GetObject("jwt") : "");
  const [mapLoaded, setMapLoaded] = useState(false);
  const setJwtStore = useStore((state) => state.setJwt);
  const map = useRef(null);
  AxiosInit(API_SERVER, jwt);

  useEffect(() => {
    SetObject("user", user);
  }, [user]);

  useEffect(() => {
    SetObject("jwt", jwt);
    setJwtStore(jwt)
  }, [jwt]);

  function resetUser(user, jwt) {
    setUser(user);
    setJwt(jwt);
  }
  
  ////Am bagat JWT in contextul de limba, pt teste//////
  return (
    <Router>
      <LangContext.Provider value={lang}> 
        <main className=' w-full h-full'>
          <MainNav logout={()=>resetUser("guest","")} user={user}>
            <Routes>
              <Route exact path='/' element={<ConcessionsPage map={map} mapLoaded={mapLoaded} />} />
              <Route exact path='/concessions' element={<ConcessionsPage map={map} mapLoaded={mapLoaded} />} />
              <Route exact path='/harvesting' element={<HarvestingPage map={map} mapLoaded={mapLoaded} />} />
              <Route exact path='/login' element={<LoginForm resetUser={resetUser} />} />
              <Route exact path='/register' element={<RegisterForm />} />
              <Route exact path='/forgot' element={<ForgotForm />} /> 
            </Routes>
          </MainNav>
          <Map map={map} setMapLoaded={setMapLoaded}></Map>
        </main>
      </LangContext.Provider>
    </Router>
  );
}

export default App;
