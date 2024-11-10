import React, { useState, useEffect } from 'react';
import MovimientoItem from './movementItem';
import styles from '../styles/movementHistory.module.css';
import SearchIcon from '../imagine/lupa.png';
import { fetchMovimientosConFiltro } from '../api/auth';  // Función para obtener los movimientos desde el backend

const MovementHistory = () => {
  const [movimientos, setMovimientos] = useState([]);  // Estado para almacenar los movimientos
  const [allMovimientos, setAllMovimientos] = useState([]);  // Estado para almacenar todos los movimientos
  const [search, setSearch] = useState('');  // Estado para búsqueda
  const [dateFilter, setDateFilter] = useState('');  // Estado para el filtro por fecha


  /*// Datos quemados para prueba
  const sampleData = [
    { id: 1, fecha: '2024-01-15', monto: 150, categoria: 'Alimentos', formaPago: 'Efectivo', descripcion: 'Compra en el supermercado', type: 'income' },
    { id: 2, fecha: '2024-01-20', monto: 75, categoria: 'Entretenimiento', formaPago: 'Tarjeta', descripcion: 'Cine', type: 'expense' },
    { id: 3, fecha: '2024-01-22', monto: 200, categoria: 'Salario', formaPago: 'Transferencia', descripcion: 'Pago de salario', type: 'income' },
    { id: 4, fecha: '2024-01-25', monto: 50, categoria: 'Transporte', formaPago: 'Efectivo', descripcion: 'Taxi', type: 'expense' },
    { id: 5, fecha: '2024-01-30', monto: 30, categoria: 'Alimentos', formaPago: 'Tarjeta', descripcion: 'Comida rápida', type: 'expense' },
  ];

  // Simulamos la llamada al backend y asignamos los datos "quemados"
  useEffect(() => {
    // En lugar de la llamada al backend, usamos los datos "quemados"
    setAllMovimientos(sampleData);  // Guardamos todos los movimientos
    setMovimientos(sampleData);  // Inicializamos la tabla con todos los movimientos
  }, []);  // Se ejecuta solo una vez al cargar el componente*/



  // Llamada al backend para obtener todos los movimientos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await fetchMovimientosConFiltro();  // Llamada para obtener todos los movimientos
        setAllMovimientos(allData);  // Guardamos todos los movimientos
        setMovimientos(allData);  // Inicializamos la tabla con todos los movimientos
      } catch (error) {
        console.error("Error al obtener los movimientos:", error);
      }
    };
    fetchData();
  }, []);  // Se ejecuta solo una vez al cargar el componente

  // Filtrado local de los movimientos según la búsqueda y el filtro de fecha
  useEffect(() => {
    const filteredData = allMovimientos.filter(movimiento => 
      // Filtrado por búsqueda
      (movimiento.descripcion.toLowerCase().includes(search.toLowerCase()) || 
       movimiento.categoria.toLowerCase().includes(search.toLowerCase()) || 
       movimiento.formaPago.toLowerCase().includes(search.toLowerCase()) ||
       movimiento.fecha.includes(search)) &&
      // Filtrado por fecha
      (dateFilter === '' || movimiento.fecha === dateFilter)
    );
    setMovimientos(filteredData);  // Actualiza los movimientos con los filtrados
  }, [search, dateFilter, allMovimientos]);  // Se ejecuta cuando search o dateFilter cambian

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
            onChange={(e) => setSearch(e.target.value)}  // Actualiza el estado de búsqueda
          />
          <img src={SearchIcon} alt="Buscar" className={styles.searchIcon} />
        </div>

        {/* Campo de filtro por fecha */}
        <input 
          type="date" 
          className={styles.dateInput} 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}  // Actualiza el estado de la fecha
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
                <MovimientoItem 
                  key={movimiento.id} 
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
