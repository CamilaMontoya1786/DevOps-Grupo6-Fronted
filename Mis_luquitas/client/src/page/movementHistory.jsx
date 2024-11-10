import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios
import MovimientoItem from './movementItem';
import styles from '../styles/movementHistory.module.css';
import SearchIcon from '../imagine/lupa.png'; // Asegúrate de que la ruta sea correcta

const MovementHistory = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Función para hacer el GET y obtener los datos
  const getMovimientos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/income/createIncome');
      console.log("hola" + response)
      return response.data; // Devuelve los datos recibidos
      
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
      return []; // En caso de error, devuelve un array vacío
    }
  };

  useEffect(() => {
    const fetchMovimientos = async () => {
      const data = await getMovimientos();
      setMovimientos(data); // Establece los datos recibidos en el estado
    };
    fetchMovimientos();
  }, []); // Se ejecuta solo al montar el componente

  const filteredMovimientos = movimientos.filter(movimiento => 
    (movimiento.descripcion.toLowerCase().includes(search.toLowerCase()) || 
     movimiento.categoria.toLowerCase().includes(search.toLowerCase()) || 
     movimiento.formaPago.toLowerCase().includes(search.toLowerCase()) ||
     movimiento.fecha.includes(search)) &&
    (dateFilter === '' || movimiento.fecha === dateFilter)
  );

  return (
    <div className={styles.historialContainer}>
      <h2 className={styles.header}>Historial de movimientos</h2>

      {/* Contenedor de búsqueda y filtro */}
      <div className={styles.searchFilterContainer}> 
        <p className={styles.infoText2}>Filtrar por palabra clave o fecha</p>
        
        {/* Campo de búsqueda con ícono de lupa */}
        <div className={styles.searchInputContainer}>
          <input 
            type="text" 
            placeholder="Buscar" 
            className={styles.searchInput} 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <img src={SearchIcon} alt="Buscar" className={styles.searchIcon} />
        </div>

        {/* Campo de filtro por fecha */}
        <input 
          type="date" 
          className={styles.dateInput} 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)} 
        />
      </div>

      {/* Contenedor de la tabla y texto informativo */}
      <div className={styles.tableContainer}>
        {/* Texto informativo */}
        <p className={styles.infoText1}>
          Aquí encontrarás el historial de tus ingresos y gastos. Puedes gestionarlos para editarlos o eliminarlos.
        </p>

        {/* Tabla de movimientos */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Categoría</th>
              <th>Forma de pago</th>
              <th>Descripción</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovimientos.map(movimiento => (
              <MovimientoItem 
                key={movimiento.id} 
                movimiento={movimiento} 
                setMovimientos={setMovimientos} 
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovementHistory;
