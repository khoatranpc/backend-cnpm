import React from "react";
import { Outlet } from "react-router-dom";


export default function BodyMainPage() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
