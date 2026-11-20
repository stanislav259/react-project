import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Posts from "../pages/Posts";
import About from "../pages/About"
import Navbar from "../components/UI/navbar/Navbar"
import Error from "../pages/Error"
import PostIdPage from "../pages/PostIdPage";
import { privateRoutes, publicRoutes } from ".";
import { AuthContext } from "../context";
import MyLoader from "../components/UI/loader/MyLoader";

const AppRouter = () => {
  const {isAuth, setIsAuth, isLoading} = useContext(AuthContext)

  if(isLoading){
    return <MyLoader/>
  }

  return (
    <div>
      {isAuth && <Navbar />}
      {isAuth ? (
        <Routes>
          {privateRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRouter;