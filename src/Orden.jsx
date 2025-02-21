import React, { useEffect } from 'react'
import { ordenTareas, saveData } from './automatizacion'

const Orden = ({ changeTareas: setTareas }) => {
  useEffect(() => {
    const ordenadas = ordenTareas({ textCriterio: 'noCompletadas' })
    setTareas(ordenadas)
    saveData('tareas', ordenadas)
  }, [])

  const ordenarTareas = e => {
    const ordenadas = ordenTareas({ ubiCriterio: e.target })
    setTareas(ordenadas)
    saveData('tareas', ordenadas)
  }
  return (
    <div className='orden'>
      <span>Ordenar por: </span>
      <select id='ordenarPor' onChange={ordenarTareas}>
        <option value='noCompletadas'>No completadas</option>
        <option value='completadas'>Completadas</option>
        <option value='fechaDec'>Fecha⏷</option>
        <option value='fechaAcen'>Fecha⏶</option>
        <option value='alfabeticamenteDec'> Alfabéticamente⏷ </option>
        <option value='alfabeticamenteAcen'> Alfabéticamente⏶</option>
      </select>
    </div>

  )
}
export default Orden
