import React, { useEffect, useState } from 'react'
import './App.css'
import { saveData, getData } from './automatizacion'
import TareasForm from './TareasForm'
import TareasList from './TareasList'
import Orden from './Orden'

function App () {
  const [tareas, setTareas] = useState([])

  useEffect(() => {
    const tareasStorage = getData('tareas')
    if (tareasStorage) {
      setTareas(tareasStorage)
      return undefined
    }
    saveData('tareas', tareas)
  }, [])

  const changeTareas = state => {
    setTareas(state)
  }

  return (
    <>
      <h1>Lista de tareas</h1>
      <TareasForm changeTareas={changeTareas} />
      <Orden changeTareas={changeTareas} />
      <TareasList changeTareas={changeTareas} />
    </>
  )
}

export default App
