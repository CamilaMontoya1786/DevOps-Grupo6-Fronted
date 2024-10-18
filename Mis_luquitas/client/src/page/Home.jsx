import React from "react";
import styles from "../styles/Home.module.css";
import cerdito from "../imagine/cerdito.jpg";
import { useAuth } from "../context/authContext";
 
function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className={styles.todo}>
      <div className={styles.header}>
        <h2> Bienvenidos a Mis Luquitas</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.advice}>
          <p className={styles.consejo}>
            {" "}
            "Ahorrar es la berraquera: Guarde plata mes a mes, así sea poquito"
          </p>
        </div>
        <div className={styles.imagen}>
        <img src={cerdito} alt="Descripción de la imagen" /></div>
      </div>
    </div>
  );
}

export default Home;
