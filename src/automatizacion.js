const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getData = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

const buscaTarea = (elemento) => {
  if (!elemento) {
    console.log('el parameto es falso')
    return undefined
  }

  const top = elemento.offsetTop

  const diferenciaStyles = (param1, param2) => param1 === param2 || (param1 > param2 && param1 - 4 < param2) || (param1 < param2 && param1 + 4 > param2)

  let terminal

  let elementos = document.getElementsByClassName('tarea')
  elementos = Array.from(elementos)

  elementos.forEach((e, i) => {
    if (diferenciaStyles(e.offsetTop, top)) {
      terminal = i
    }
  })
  return terminal
}

const ordenTareas = ({ textCriterio, ubiCriterio }) => {
  let criterio

  if (textCriterio) criterio = textCriterio
  else if (ubiCriterio) criterio = ubiCriterio.value

  let info = getData('tareas')

  info = info.sort((a, b) => {
    if (criterio === 'fechaDec') {
      return new Date(a.creacion) - new Date(b.creacion)
    } else if (criterio === 'fechaAcen') {
      return new Date(b.creacion) - new Date(a.creacion)
    } else if (criterio === 'completadas') {
      return (b.completada === true ? 1 : -1) - (a.completada === true ? 1 : -1)
    } else if (criterio === 'noCompletadas') {
      return (b.completada === true ? -1 : 1) - (a.completada === true ? -1 : 1)
    } else if (criterio === 'alfabeticamenteDec') {
      return a.text.localeCompare(b.text)
    } else if (criterio === 'alfabeticamenteAcen') {
      return b.text.localeCompare(a.text)
    }
  })

  return info
}

export { saveData, getData, buscaTarea, ordenTareas }
