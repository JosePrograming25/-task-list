import React from 'react'
import { getData, ordenTareas, saveData } from './automatizacion'

const TareasForm = ({ changeTareas: setTareas }) => {
  const handleSave = (date) => {
    const respaldo = getData('tareas')
    saveData('tareas', [...respaldo, date])
  }

  const handlerSubmit = e => {
    e.preventDefault()
    let date = e.target.firstChild.value

    if (date) {
      date = {
        text: date,
        creacion: new Date(),
        completada: false
      }

      handleSave(date)
      const orden = document.getElementById('ordenarPor').value
      date = ordenTareas({ textCriterio: orden })
      saveData('tareas', date)
      setTareas(date)

      e.target.firstChild.value = ''
      return 0
    }
    console.log('No hay contenido en el imput ')
  }

  return (
        <form className='form' onSubmit={handlerSubmit}>
            <input
                className='formInput'
                type="text"
                placeholder='Agrega una nueva tarea...'
            />
            <button className='submit' type="submit">AGREGAR</button>
        </form>
  )
}

export default TareasForm
