import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Loginscreen from './Components/Loginscreen'

import Navbar from './Components/Navbar'
import Pnael from './Components/Pnael'
import Books from './Components/Tables/Books'
import Scans from './Components/user/Book'
import Registration from './Components/Regscreen'
import DownloadScreen from './Components/Screens/Downloadscreen'
import DownloadList from './Components/Screens/Downloads'
import BookDetails from './Components/Screens/Bookscreen'
import Homescreen from './Components/Screens/Homescreen'
import Adlogin from './Admin/Adlogin'
import Adreg from './Admin/Adregister'




function App(){
  return(
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path='/login' element={<Loginscreen/>}></Route>
      <Route path='/book' element={<Scans/>}/>
      <Route path="/reg" element={<Registration/>}/>
      <Route path="/download/:bookid" element={<DownloadScreen/>}/>
    <Route path="/list" element={<DownloadList/>}/>
    <Route path="/all" element={<BookDetails/>}/>
    <Route path="/signin" element={<Adlogin/>}/>
    <Route path="/reg" element={<Adreg/>}/>
      
      <Route path='/panel' element={<Pnael/>}/>
      <Route path="/home" element={<Homescreen/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App