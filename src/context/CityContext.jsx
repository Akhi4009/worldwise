import { useCallback, useContext, useReducer } from "react";
import { createContext,useEffect } from "react"

const base_url = "http://localhost:8000";

const CityContext = createContext()

const initialState ={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:'',
}

function reducer(state,{type,payload}){
  switch(type){
    case 'loading':
      return {...state,isLoading:true};

    case 'cities/loaded':
      return {...state,isLoading:false,cities:payload};

    case 'city/loaded':
      return {...state,isLoading:false,currentCity:payload};

    case 'city/created':
      return {...state,
        isLoading:false,
        cities:[...state.cities,payload],
        currentCity:payload
      };
    
    case 'city/deleted':
      return {...state,isLoading:false,
      cities:state.cities.filter(city=>city.id !== payload),
      currentCity:{},
      };

    case 'rejected':
      return {...state,isLoading:false,error:payload};
    default:return state
  }
    
}

function CityProvider({children}) {

  const [state,dispatch] = useReducer(reducer,initialState);
  
  const {isLoading,cities,error,currentCity} = state;
    useEffect(()=>{
      async function fetchCities(){
        dispatch({type:'loading'});
        try {
          const res = await fetch(`${base_url}/cities`);
          const data = await res.json();
          dispatch({type:'cities/loaded',payload:data});
        } catch (error) {
          dispatch({type:'rejected',
          payload:'There was an error loading data'});
        }
      }
      fetchCities()
    },[])

 const getCity = useCallback(
  async function getCity(id){
    dispatch({type:'loading'});
    try {
      const res = await fetch(`${base_url}/cities/${id}`);
      const data = await res.json();
      dispatch({type:'city/loaded',payload:data});
    } catch (error) {
      dispatch({type:'rejected',payload:'There was an error loading data'});
    }
    },[])   

    async function addCity(newCity){
      dispatch({type:'loading'});
    try {
      const res = await fetch(`${base_url}/cities`,{
        method: "POST",
        body: JSON.stringify(newCity),
        headers:{
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();
      dispatch({type:'city/created',payload:data});
    } catch (error) {
      dispatch({type:'rejected',payload:'There was an error in posting city'});
    }
    }

    async function deleteCity(id){
      dispatch({type:'loading'});
      try {
        const res = await fetch(`${base_url}/cities/${id}`,{
          method:"DELETE",
        });
       dispatch({type:'city/deleted',payload:id});
      } catch (error) {
        dispatch({type:'rejected',payload:'There was an error in deleting city'});
      }
      }
      
      return (
    <CityContext.Provider value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
        error,
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