import React from 'react'
import styles from "./AppLayout.module.css";
import Sidebar from "../components/sidebar/Sidebar";
import Map from '../components/map/Map';
import User from "../components/user/User";
function AppLayout() {
  return (
    <div className={styles.app}>
  <Sidebar/>
  <Map/>
  <User/>
    </div>
  )
}

export default AppLayout