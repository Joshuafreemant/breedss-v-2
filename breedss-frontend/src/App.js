import { BrowserRouter as Router, Routes, Route, useHistory } from 'react-router-dom';

import './style.scss'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import Social from './Pages/Social';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar,FooterMobile } from './Components';
import Friend from './Pages/Friend';
import Home from './Pages/Home';
import Support from './Pages/Support';
import How from './Pages/How/How';
import About from './Pages/About/About';
import Privacy from './Pages/Privacy/Privacy';
import Accessibility from './Pages/Accessibility/Accessibility';
import Terms from './Pages/Terms/Terms';
import Faq from './Pages/FAQ/Faq';

function App() {
  const auth = useSelector((state) => state.token)

  return (
    <>
      <Router>
        <Navbar />

        <Routes>

          <Route path="/" element={auth ? <Social /> : <Login />} />
          <Route path="/home" element={<Home /> } />
          <Route path="/login" element={<Login /> } />
          <Route path="/admin" element={ <Admin />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/friend/:id" element={<Friend />} />
          <Route path="/how-to-use" element={<How />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/accessibility-policy" element={<Accessibility />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/support" element={<Support />} />
          
        </Routes>

      </Router >
    </>
  );
}

export default App;
