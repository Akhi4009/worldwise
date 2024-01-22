
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/city/CityList";
import City from "./components/city/City";
import CoutryList from "./components/country/CountryList";
import { CityProvider } from "./components/context/CityContext";

function App() {
 return (
    <CityProvider>
    <BrowserRouter>
    <Routes>
    <Route index element={<Homepage/>}/>
    <Route path="app" element={<AppLayout/>}>
    <Route index element={<CityList />} />
    <Route path="cities" element={<CityList />} />
    <Route path="cities/:id" element={<City/>} />
    <Route path="countries" element={<CoutryList/>} />
    <Route path="form" element={<form>Form</form>} />
    </Route>
    <Route path="/product" element={<Product/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </CityProvider>
  )
}

export default App;