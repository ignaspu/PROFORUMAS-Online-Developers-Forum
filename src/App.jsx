import './App.css';
import Footer from './components/UI/footer/Footer';
import Header from './components/UI/header/Header';
import Main from './components/UI/main/Main';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import { Routes, Route } from "react-router-dom";
import UzduotiKlausima from './components/pages/uzduotiKlausima/UzduotiKlausima';
import ManoKlausimai from './components/pages/manoklausimai/ManoKlausimai';
import SingleQuestion from './components/pages/singleQuestion/SingleQuestion';
import RedaguotiKlausima from './components/pages/redaguotiKlausima/RedaguotiKlausima';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="registracija" element={<Register />} />
        <Route path="prisijungti" element={<Login />} />
        <Route path="uzduotiklausima" element={<UzduotiKlausima />} />
        <Route path="manoklausimai" element={<ManoKlausimai />} />
        <Route path="/klausimas">
          <Route path=":id" element={<SingleQuestion />} />
          <Route path="redaguoti/:id" element={<RedaguotiKlausima />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;