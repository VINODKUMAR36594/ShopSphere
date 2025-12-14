

import {BrowserRouter, Routes,Route} from "react-router-dom";
import UserLayout from './components/Layout/UserLayout';
import Home from "./pages/Home";
import {Toaster} from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
function App(){
  return(
  <BrowserRouter>
  <Toaster position="top-right"/>
  <Routes>
    <Route path="/" element={<UserLayout/>} >
    <Route path="login" element={<Login/>}></Route>
    <Route path="register" element={<Register/>}></Route>
      {/* User Layout */}
      <Route index element={<Home/>}/>
       </Route>
    <Route>
      {/* Admin Layout*/}

    </Route>
    <Route path="profile" element={<Profile/>}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
