import { useContext } from "react";
import { createContext, useState, useEffect } from "react"

const base_url = "http://localhost:8000";
const CityContext = createContext()

function CityProvider({children}) {
    const [cities, setCities] = useState([])
    const [isLoading,setIsLoading] = useState(false);
    const [currentCity,setCurrentCity] = useState({});

    useEffect(()=>{
      async function fetchCities(){
        setIsLoading(true);
        try {
          const res = await fetch(`${base_url}/cities`);
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

    async function getCity(id){
      setIsLoading(true);
      try {
        const res = await fetch(`${base_url}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        throw new Error('There was an error loading data');
      }finally{
        setIsLoading(false);
      }
      }

    async function addCity(newCity){
    setIsLoading(true);
    try {
      const res = await fetch(`${base_url}/cities`,{
        method: "POST",
        body: JSON.stringify(newCity),
        headers:{
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      setCities([...cities,data]);
    } catch (error) {
      throw new Error('There was an error in posting data');
    }finally{
      setIsLoading(false);
    }
    }

   

  return (
    <CityContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
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