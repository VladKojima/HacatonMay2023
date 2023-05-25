import '../src/style/sass.css'
import '../src/style/login.css'
import '../src/style/bootstrap.css'
import '../src/style/button.css'
import '../src/style/el-plus.css'
import '../src/style/input.css'
import '../src/style/multitab.css'
import '../src/style/link.css'
import {Provider} from 'react-redux'
import Chat from "./components/Chat";
import SockJS from "sockjs-client";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
import ManagerPage from './components/ManagerPage'
import MiniWindow from './components/MiniWindow'
import ManagerChat from './components/ManagerChat'
function App() {

  return <>  
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/chat" element={<Chat/>}/>
    <Route path="/mean" element={<ManagerPage/>}></Route>

  </Routes>
  </BrowserRouter>
 
  </>

}

export default App;
