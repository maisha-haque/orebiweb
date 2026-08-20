import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'
import Shop from './pages/Shop'
import Contact from './pages/Contact'
import RootLayout from './layouts/RootLayout'

function App() {


  return (
<>

    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />          
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Error />} /> 
      </Route>
    </Routes>

</>
  )
}

export default App
