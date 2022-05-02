import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthLayout from './AuthLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Components/Forms/Login";
import Register from "./Components/Forms/Register";
import Main from './Main';
import NotFoundPage from './Components/NotFoundPage';
import BodyMainPage from './Components/Body';
import Intro from './Components/Intro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* layout authen */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        {/* Layout main page */}
        {["/", "/home"].map((path, index) => {
          return (
            <Route path={path} element={<Main />} key={index}>
              <Route path='' element={<BodyMainPage />}>
                <Route path='' element={<Intro />}></Route>
              </Route>
            </Route>
          );
        })}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </Router>

  </React.StrictMode>
);

