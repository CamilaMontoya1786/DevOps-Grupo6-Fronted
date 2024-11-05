import React, { useEffect, useState } from 'react';
import MovimientoItem from './movementItem';
import styles from '../styles/movementHistory.module.css';
import SearchIcon from '../imagine/lupa.png'; // Asegúrate de que la ruta sea correcta

const MovementHistory = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  /*// Datos de prueba
  const sampleData = [
    { id: 1, fecha: '2024-01-15', monto: 150, categoria: 'Alimentos', formaPago: 'Efectivo', descripcion: 'Compra en el supermercado' },
    { id: 2, fecha: '2024-01-20', monto: -75, categoria: 'Entretenimiento', formaPago: 'Tarjeta', descripcion: 'Cine' },
    { id: 3, fecha: '2024-01-22', monto: 200, categoria: 'Salario', formaPago: 'Transferencia', descripcion: 'Pago de salario' },
    { id: 4, fecha: '2024-01-25', monto: -50, categoria: 'Transporte', formaPago: 'Efectivo', descripcion: 'Taxi' },
    { id: 5, fecha: '2024-01-30', monto: -30, categoria: 'Alimentos', formaPago: 'Tarjeta', descripcion: 'Comida rápida' },
  ];

  // Cargar los datos de prueba al iniciar el componente
  useEffect(() => {
    setMovimientos(sampleData);
  }, []);*/
  useEffect(() => {
    const fetchMovimientos = async () => {
      const data = await getMovimientos();
      setMovimientos(data);
    };
    fetchMovimientos();
  }, []);


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
