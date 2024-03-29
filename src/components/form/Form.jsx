import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../layout/Button";
import BackButton from "../layout/BackButton";
import Message from "../layout/Message";
import Spinner from "../layout/Spinner";

import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useCities } from "../../context/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
 const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
function Form() {
  const [lat, lng] = useUrlPosition();

  const [isLoadingGeo,setIsLoadingGeo] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji] = useState("");
  const [geoCodeError,setGeocodeError] =useState("");
  const {addCity,isLoading} = useCities();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if(!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position:{lat,lng}
    }
    await addCity(newCity);
    navigate("/app/cities");
  }

  useEffect(()=>{
    if(!lat && !lng) return;
    async function fetchCityData(){
      try {
        setIsLoadingGeo(true);
        setGeocodeError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if(!data.countryCode) throw new Error("That doesn't seem to be a city.Click somewhere else.")
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode)); 
      } catch (error) {
        console.log(error);
        setGeocodeError(error.message);
      } finally{
        setIsLoadingGeo(false);
      }
      }
      fetchCityData();
    
  },[lat,lng])

  if(isLoadingGeo) return <Spinner/>;
  if(!lat && !lng) return <Message message="Start by clicking on the map"/>
  if(geoCodeError) return <Message message={geoCodeError}/>;
  
  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span> 
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
        id="date"
         selected={date} 
         onChange={(date)=>setDate(date)}
         dateFormat="dd/MM/yyyy"
        />
      </div> 

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton>&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
