import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Register from './page/register'


function App() {

  return(
    
    <>
    
      <BrowserRouter>

        <Routes>

          <Route path='/register' element={<Register></Register>}></Route>

         </Routes>

      </BrowserRouter> 

   
    </>



  )
  
}

export default App