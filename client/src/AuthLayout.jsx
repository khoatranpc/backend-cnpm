import { Outlet } from "react-router-dom";
import "./AuthLayout.css";
import "./assets/css/grid.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AuthLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    // navigate("login");
    navigate("register");
    return;
  }, []);

  
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}
export default AuthLayout;
