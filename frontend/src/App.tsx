import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";
import CreateRecipe from "./pages/CreateRecipe";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./styles/global.scss"

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/favorite" element={<Favorite/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/create-recipe" element={<CreateRecipe/>}></Route>
          <Route path="/nav-bar" element={<CreateRecipe/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
