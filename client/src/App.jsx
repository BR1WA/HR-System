import { Routes, Route, Navigate } from 'react-router-dom';
import { Attestations , Login, Verify,UserOptions} from './views';
import { AddUser, Options, Statistics, Stepper, Users, User } from './views/adminPages';
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
      <Route path='/statistics' element={<PrivateRoutes role="admin"><Statistics/></PrivateRoutes>}></Route>
      <Route path='/profile' element={<PrivateRoutes role="employee"><User/></PrivateRoutes>}></Route>
      <Route path='/userOptions' element={<PrivateRoutes role="employee"><UserOptions/></PrivateRoutes>}></Route>
      <Route path='/attestations' element={<PrivateRoutes role="employee"><Attestations/></PrivateRoutes>}></Route>
    </Routes>
  </>
  )
}

export default App