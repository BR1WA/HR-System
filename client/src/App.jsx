import { Routes, Route, Navigate } from 'react-router-dom';
import { Home , Login, Verify} from './views';
import { AddUser, Options, Users } from './views/adminPages';

function App(){
  return(
  <>
    <Routes>
      <Route path='/*' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>
      <Route path='/options' element={<Options/>}></Route>
      <Route path='/users' element={<Users/>}></Route>
      <Route path='/addUser' element={<AddUser/>}></Route>
    </Routes>
  </>
  )
}

export default App