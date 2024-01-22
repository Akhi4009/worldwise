import { useContext } from "react";
import { createContext, useState, useEffect } from "react"


const CityContext = createContext()

function CityProvider({children}) {
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
      throw new Error('There was an error loading data');
    }finally{
      setIsLoading(false);
    }
  }
  fetchCities()
 },[])
  return (
    <CityContext.Provider value={{
        cities,
        isLoading,
    }}>
    {children}
    </CityContext.Provider>
  )
}

function useCities(){
    const context = useContext(CityContext);
    if(context === undefined) throw new Error("CityContext was used outside the CityProvider");
    return context;
}

export  { CityProvider, useCities };