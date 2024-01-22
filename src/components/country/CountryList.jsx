import React from 'react'
import styles from "./CountryList.module.css";
import Spinner from "../layout/Spinner";
import CountryItem from './CountryItem';
import Message from '../layout/Message';
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