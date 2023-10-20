import { useState, useEffect } from 'react'

export default function App() {

  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState<string[]>([])
  const [editTask, setEditTask] = useState({
    enabled: false,
    task: ''
  })

  useEffect( () => {
    const tarefasSalvas = localStorage.getItem('register')

    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas))
    }
  }, [])

  function handleRegister(){
    if (!input){
      return
    }

    if(editTask.enabled){
      handleSaveEdit()
      return
    }

    setTasks(tarefas => [...tarefas, input])
    setInput('')

    localStorage.setItem('register', JSON.stringify([...tasks, input]))
  }

  function handleSaveEdit(){
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [...tasks]

    allTasks[findIndexTask] = input
    setTasks(allTasks)

    setEditTask({
      enabled: false,
      task: ''
    })

    setInput('')

    localStorage.setItem('register', JSON.stringify(allTasks))
  }
  
  function handleDelete(item: string) {
    const removeTask = tasks.filter(task => task !== item)
    setTasks(removeTask)

    localStorage.setItem('register', JSON.stringify(removeTask))
  }

  function handleEdit(item: string) {
    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input
        placeholder='Digite a descrição da tarefa'
        value={input}
        onChange={ (e) => setInput(e.target.value)}
      />

      <button onClick={handleRegister}>
        {editTask.enabled ? 'Alterar' : 'Adicionar'}
      </button>
      <hr />

      {tasks.map( (item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={() => handleDelete(item)}>Remover</button>
          <button onClick={() => handleEdit(item)}>Editar</button>
        </section>
      ))}
    </div>
  )
}
