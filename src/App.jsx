import './App.css';
import Footer from './components/UI/footer/Footer';
import Header from './components/UI/header/Header';
import Main from './components/UI/main/Main';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="registracija" element={<Register />} />
        <Route path="prisijungti" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;