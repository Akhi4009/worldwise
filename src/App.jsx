import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Suspense, lazy } from "react";
import { CityProvider } from "./context/CityContext";
import {AuthProvider} from "./context/AuthContext"
import ProtectedRoute from "./components/route/ProtectedRoute"

import CityList from "./components/city/CityList";
import City from "./components/city/City";
import CoutryList from "./components/country/CountryList";
import Form from "./components/form/Form"
import SpinnerFullPage from "./components/layout/SpinnerFullPage";

const Homepage = lazy(()=> import("./pages/Homepage"));
 const Product = lazy(()=> import("./pages/Product"));
 const Pricing = lazy(()=> import("./pages/Pricing"));
 const AppLayout = lazy(()=> import("./pages/AppLayout"));
 const Login = lazy(()=> import("./pages/Login"));
 const PageNotFound = lazy(()=> import("./pages/PageNotFound"));


function App() {
 return (
  <AuthProvider>
    <CityProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage/>}>
    
    <Routes>
    <Route index element={<Homepage/>}/>
    <Route path="product" element={<Product/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="app" element={
    <ProtectedRoute>
      <AppLayout/>
    </ProtectedRoute>
    }>
    <Route index element={<CityList />} />
    <Route path="cities" element={<CityList />} />
    <Route path="cities/:id" element={<City/>} />
    <Route path="countries" element={<CoutryList/>} />
    <Route path="form" element={<Form/>} />
    </Route>
   <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </Suspense>
    </BrowserRouter>
    </CityProvider>
    </AuthProvider>
  )
}

export default App;