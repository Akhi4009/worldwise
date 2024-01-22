import { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/city/CityList";

function App() {
 const [cities, setCities] = useState([])
 const [isLoading,setIsLoading] = useState(false);

 useEffect(()=>{
  async function fetchCities(){
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/cities`);
      const data = await res.json();
      setCities(data);
    } catch (error) {
      alert('There was an error loading data');
    }finally{
      setIsLoading(false);
    }
  }
  fetchCities()
 },[])

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route index element={<Homepage/>}/>
    <Route path="app" element={<AppLayout/>}>
    <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
    <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
    <Route path="countries" element={<p>List of countries</p>} />
    <Route path="form" element={<form>Form</form>} />
    </Route>
    <Route path="/product" element={<Product/>}/>
    <Route path="/pricing" element={<Pricing/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;