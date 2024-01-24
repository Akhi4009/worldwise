import React from 'react'
import styles from "./CountryList.module.css";
import Spinner from "../layout/Spinner";
import CountryItem from './CountryItem';
import { useCities } from '../../context/CityContext';

function CountryList() {
  const {cities:countries,isLoading} = useCities();
 if(isLoading) return <Spinner/>
  return (
    <ul className={styles.countryList}>
   {countries?.map(country=><CountryItem country={country} key={country.id}/>)}
    </ul>
  )
}

export default CountryList