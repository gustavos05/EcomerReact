import './App.css'
import {HashRouter,Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchased from './pages/Purchased'
import Loader from './components/Loader'
import NavBar from "./components/Navbar";
import {useSelector} from 'react-redux'
function App() {
  const isLoading = useSelector((state) => state.isLoading);


  return (
    <HashRouter>
      <NavBar/>
      {isLoading && <Loader />}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Purchased' element={<Purchased/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
