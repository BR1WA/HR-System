import { Routes, Route, Navigate } from 'react-router-dom';
import { Home , Login, Verify} from './views';
import { AddUser, Options, Stepper, Users } from './views/adminPages';
import User from './views/adminPages/User';
import { PrivateRoutes } from './PrivateRoutes';

function App(){
  return(
  <>
    <Routes>
      <Route path='/*' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>
      <Route path='/options' element={<PrivateRoutes role="admin"><Options/></PrivateRoutes>} ></Route>
      <Route path='/users' element={<PrivateRoutes role="admin"><Users/></PrivateRoutes>}></Route>
      <Route path='/addUser' element={<PrivateRoutes role="admin"><AddUser/></PrivateRoutes>}></Route>
      <Route path='/stepper' element={<PrivateRoutes role="admin"><Stepper/></PrivateRoutes>}></Route>
      <Route path='/user' element={<PrivateRoutes role="admin"><User/></PrivateRoutes>}></Route>
      <Route path='/employee' element={<PrivateRoutes role="employee"><User/></PrivateRoutes>}></Route>
    </Routes>
  </>
  )
}

export default App