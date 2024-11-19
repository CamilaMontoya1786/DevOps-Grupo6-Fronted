
import React, { useEffect, useState } from 'react';
import MovimientoItem from './movementItem';
import styles from '../styles/movementHistory.module.css';
import SearchIcon from '../imagine/lupa.png';
import { fetchMovimientosConFiltro } from '../api/auth';  // Función para obtener los movimientos desde el backend


const MovementHistory = () => {
  const [movimientos, setMovimientos] = useState([]);  // Estado para almacenar los movimientos
  const [search, setSearch] = useState('');  // Estado para búsqueda
  const [dateFilter, setDateFilter] = useState('');  // Estado para el filtro por fecha

const refresh = async () => {
  setSearch ('')
  setDateFilter('')
  const movement = await fetchMovimientosConFiltro (null,null)
  setMovimientos (movement)
}



  // Función para hacer el GET y obtener los datos
  console.log(dateFilter)

  useEffect(() => {
    const fetchMovimientos = async () => {
      //console.log(dateFilter)
      if(!search && (!dateFilter || dateFilter === "" )){
        const movement = await fetchMovimientosConFiltro (null,null)
        setMovimientos (movement)
      }
    };
    fetchMovimientos();
  }, [search, dateFilter]); // Se ejecuta solo al montar el componente


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
            onChange={async(e) => {
              setSearch  (e.target.value)
              const movimientosPorPalabra = await fetchMovimientosConFiltro(e.target.value,new Date (dateFilter))
              setMovimientos(movimientosPorPalabra)
       
            }
          }  // Actualiza el estado de búsqueda
          />
          <img src={SearchIcon} alt="Buscar" className={styles.searchIcon} />
        </div>

        {/* Campo de filtro por fecha */}
        <input 
          type="date" 
          className={styles.dateInput} 
          value={dateFilter} 
          onChange={async(e) => {
            setDateFilter(e.target.value)
            const movimientosPorFecha = await fetchMovimientosConFiltro(search,new Date (e.target.value))
           
            setMovimientos(movimientosPorFecha)
          }}
          
        />
      </div>

      {/* Contenedor de la tabla y texto informativo */}
      <div className={styles.tableContainer}>
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

            {movimientos.length > 0 ? (
              movimientos.map(movimiento => (
                <MovimientoItem refresh={refresh}
                  
                  movimiento={movimiento} 
                  setMovimientos={setMovimientos} 
                />
              ))
            ) : (
              <tr>
                <td colSpan="7">No se encontraron movimientos.</td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovementHistory;
