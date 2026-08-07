import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';

const Login = lazy(() => import('./views/login'));
const Verify = lazy(() => import('./views/verify'));
const UserOptions = lazy(() => import('./views/userOptions'));
const Attestations = lazy(() => import('./views/attestations'));
const AddUser = lazy(() => import('./views/adminPages/addUser'));
const Options = lazy(() => import('./views/adminPages/options'));
const Statistics = lazy(() => import('./views/adminPages/statistics'));
const Stepper = lazy(() => import('./views/adminPages/stepper'));
const Users = lazy(() => import('./views/adminPages/users'));
const User = lazy(() => import('./views/adminPages/User'));
const Demandes = lazy(() => import('./views/adminPages/demandes'));

function App(){
  return(
  <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center">Chargement…</div>}>
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
      <Route path='/demandes' element={<PrivateRoutes role="admin"><Demandes/></PrivateRoutes>}></Route>
      <Route path='/profile' element={<PrivateRoutes role="employee"><User/></PrivateRoutes>}></Route>
      <Route path='/userOptions' element={<PrivateRoutes role="employee"><UserOptions/></PrivateRoutes>}></Route>
      <Route path='/attestations' element={<PrivateRoutes role="employee"><Attestations/></PrivateRoutes>}></Route>
    </Routes>
  </Suspense>
  )
}

export default App
