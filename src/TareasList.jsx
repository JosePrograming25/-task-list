import { buscaTarea, getData, ordenTareas, saveData } from './automatizacion'
import deleteImg from './assets/delete.svg'
import React from 'react'

const TareasList = ({ changeTareas: setTareas }) => {
  const tareas = () => getData('tareas') || []
  const funcTerminada = (direc) => {
    const terminal = buscaTarea(direc)

    let dat = getData('tareas').map((item, i) => {
      if (i === terminal) {
        return {
          text: item.text,
          creacion: item.creacion,
          completada: !item.completada
        }
      }
      return item
    })

    const orden = document.getElementById('ordenarPor').value
    saveData('tareas', dat)
    dat = ordenTareas({ textCriterio: orden })

    saveData('tareas', dat)
    setTareas(dat)

    return 1
  }

  const handlerclick = e => {
    funcTerminada(e.target)
  }

  const handlerChange = (e) => {
    funcTerminada(e.target.parentElement.previousElementSibling)
  }

  const handlerDelete = e => {
    const deleter = e.target.parentElement.parentElement.previousElementSibling

    const terminal = buscaTarea(deleter)

    const dat = getData('tareas').filter((item, i) => i !== terminal)

    setTareas(dat)
    saveData('tareas', dat)
  }

  const formatFecha = param => new Date(param).toLocaleString(
    'es-Ve',
    { dateStyle: 'medium', timeStyle: 'short' }
  )

  return (
        <ul className='listTareas'>
            {tareas().map((list, indice) => {
              return <li
                    className={list.completada ? 'tarea tareaCompletada' : 'tarea'}
                    key={indice}>

                    <p onClick={handlerclick}>{list.text}<span className="fecha">{formatFecha(list.creacion)}</span></p>

                    <div className="options">
                        <input type="checkbox"
                            checked={list.completada}
                            onChange={handlerChange}
                            name="List" id={indice} />
                        <span onClick={handlerDelete}>
                            <img className='delete' src={deleteImg} alt="delete" />
                        </span>
                    </div>

                </li>
            }
            )}

        </ul>
  )
}

export default TareasList
