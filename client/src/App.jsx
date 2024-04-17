import { Routes, Route, Navigate } from 'react-router-dom';
import { Home , Login} from './views';

function App(){
  return(
  <>
    <Routes>
      <Route path='/*' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
  </>
  )
}

export default App