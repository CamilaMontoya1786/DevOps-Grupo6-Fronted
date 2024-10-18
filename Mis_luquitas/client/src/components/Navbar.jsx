import React from "react";
import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import LogoImage from "../imagine/logo.png";
import home from "../imagine/home.png";
import reporte from "../imagine/reporte.png";
import movimiento from "../imagine/movimiento.png";
import lupa from "../imagine/lupa.png";
import ayuda from "../imagine/ayuda.png";
import cerrarsesion from "../imagine/cerrarsesion.png";

function Navbar() {
  //const { signin,user} = useAuth();
  
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
            <Link to="/loguin">Cerrar Sesión</Link>
            <img src={cerrarsesion} alt="img"/>
          </li>
        </ul>
        <div className={styles.User}>
        <Link className={styles.UserName} to="/userprofile">Pepito Perez</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
