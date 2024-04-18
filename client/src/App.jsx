import { Routes, Route, Navigate } from 'react-router-dom';
import { Home , Login, Verify} from './views';

function App(){
  return(
  <>
    <Routes>
      <Route path='/*' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/verify' element={<Verify/>}></Route>
    </Routes>
  </>
  )
}

export default App