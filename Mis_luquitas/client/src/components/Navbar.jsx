import React, { useEffect, useState } from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import LogoImage from "../imagine/logo.png";
import home from "../imagine/home.png";
import reporte from "../imagine/reporte.png";
import movimiento from "../imagine/movimiento.png";
import lupa from "../imagine/lupa.png";
import ayuda from "../imagine/ayuda.png";
import cerrarsesion from "../imagine/cerrarsesion.png";
import { useAuth } from "../context/authContext";
import { set } from "react-hook-form";
import axios from "axios";

 function  Navbar() {
  //const { signin,user} = useAuth();
  const { user, logout } = useAuth();
  const [userLocal,setUserLocal] =useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem ("token");
        const response = await axios.get(
          "http://localhost:3000/login/getUserProfile/"+ token
        );
        setUserLocal(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };
    
    fetchUserData();
  },[]);

  

  
  console.log('user:'+JSON.stringify( userLocal));
  
    return (
    <div className={styles.left}>
      <nav className={styles.navbar}>
        <div className={styles.header}>
          <img src={LogoImage} alt="Descripción de la imagen" />
          <h1 className={styles.titulo}>Mis Luquitas </h1>
        </div>
        <hr className={styles.linea} />
        <ul className={styles.Link}>
        
          <li>
            <Link to="/home">Inicio</Link>

            <img src={home} alt="img" />
          </li>
          <li>
            <Link to="/movimientos">Reportes</Link>
            <img src={reporte} alt="img"/>
          </li>
          <li>
            <Link to="/movements">Movimientos</Link>
            <img src={movimiento} alt="img"/>
          </li>
          <li>
            <Link to="/loguin">Historial de Movimientos</Link>
            <img src={lupa} alt="img"/>
          </li>
          <li>
            <Link to="/help">Ayuda</Link>
            <img src={ayuda} alt="img"/>

          </li>

          <li>

            <Link to="/login">Cerrar Sesión</Link>
            <img src={cerrarsesion} />
          </li>
        </ul>
        <div className={styles.User}>
  <Link className={styles.UserName} to="/userprofile">
    {userLocal ?  userLocal?.userName +' '+ userLocal.userLastName  : 'pepito perez'} 
  </Link>
</div>
      </nav>
    </div>
  );
}

export default Navbar;
