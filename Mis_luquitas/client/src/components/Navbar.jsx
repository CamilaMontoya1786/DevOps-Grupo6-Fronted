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
import axios from "axios";

function Navbar() {
  const { user, logout } = useAuth();
  const [userLocal, setUserLocal] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://devops-backend-grupo6.onrender.com/login/getUserProfile/" + token
        );
        setUserLocal(response.data);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    fetchUserData();
  }, []);

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
            <Link to="/home">
              <img src={home} alt="Inicio" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <img src={reporte} alt="Reportes" />
              <span>Reportes</span>
            </Link>
          </li>
          <li>
            <Link to="/movements">
              <img src={movimiento} alt="Movimientos" />
              <span>Movimientos</span>
            </Link>
          </li>
          <li>
            <Link to="/movementHistory">
              <img src={lupa} alt="Historial de Movimientos" />
              <span>Historial de Movimientos</span>
            </Link>
          </li>
          <li>
            <Link to="/help">
              <img src={ayuda} alt="Ayuda" />
              <span>Ayuda</span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <img src={cerrarsesion} alt="Cerrar Sesión" />
              <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
        <div className={styles.User}>
          <Link className={styles.UserName} to="/userprofile">
            {userLocal
              ? userLocal?.userName + " " + userLocal.userLastName
              : "Cargando..."}
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;