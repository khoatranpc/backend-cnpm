import React from "react";
import { Outlet } from "react-router-dom";
import BodyMainPage from "./Components/Body";
import Header from "./Components/Header/Header";
import "./Main.css";
const Main = () => {
  return (
    <>
      <Header />
      <BodyMainPage>
        <Outlet />
      </BodyMainPage>
    </>
  );
};
export default Main;
