import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './views';

function App(){
  return(
  <>
    <Routes>
      <Route path='/*' element={<Home/>}></Route>
    </Routes>
  </>
  )
}

export default App