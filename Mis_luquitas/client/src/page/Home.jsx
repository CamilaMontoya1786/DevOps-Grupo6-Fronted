import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Home.module.css";
import { useAuth } from "../context/authContext";

function Home() {
  const { user } = useAuth();
  console.log(user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        console.log("Intentando obtener el consejo...");
        const response = await axios.get("http://localhost:3000/tip/showRandomTip");
        
        setTitle(response.data.title);
        setContent(response.data.content);
        setPhoto(response.data.photo); // Asume que `photo` es la clave en el objeto de respuesta
      } catch (error) {
        console.error("Error al obtener el consejo:", error);
      }
    };
    fetchAdvice();
  }, []);

  return (
    <div className={styles.todo}>
      <div className={styles.header}>
        <h2> Bienvenidos a Mis Luquitas</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.advice}>
          <p className={styles.consejo}>
          <p>{title + "." || "Cargando consejo..." }</p>
            <br></br>
            <p>{ content || "Cargando consejo..." }</p>
          </p>
        </div>
        <div className={styles.imagen}>
          {photo ? ( <img src={photo} alt="Consejo visual" />) : (<p>Cargando imagen...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
