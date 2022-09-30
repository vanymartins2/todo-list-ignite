import { ChangeEvent, FormEvent, useState } from 'react'
import { TaskList } from './TaskList'

import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdAddCircleOutline } from 'react-icons/md'

import styles from './Tasks.module.css'

interface Task {
  id: number
  content: string
  isComplete: boolean
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem('@TodoList:tasks')

    if (storedTasks) {
      return JSON.parse(storedTasks)
    } else {
      return []
    }
  })
  const [newTaskContent, setNewTaskContent] = useState('')

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    if (newTaskContent.length === 0) return

    const newTask = {
      id: Math.floor(Math.random() * 100),
      content: newTaskContent,
      isComplete: false
    }

    setTasks([newTask, ...tasks])
    setNewTaskContent('')
    localStorage.setItem('@TodoList:tasks', JSON.stringify(newTask))
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskContent(event.target.value)
  }

  function handleDeleteTask(id: number) {
    const newList = tasks.filter(tasks => tasks.id !== id)

    setTasks(newList)
  }

  function handleToggleTaskStatus(id: number) {
    const updatedList = tasks.map(task => {
      return task.id === id
        ? { ...task, isComplete: !task.isComplete }
        : { ...task }
    })

    setTasks(updatedList)
    localStorage.setItem('@TodoList:tasks', JSON.stringify(updatedList))
  }

  const completedTasksAmount = tasks.filter(
    task => task.isComplete === true
  ).length

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.newTaskContainer}>
        <input
          type="text"
          name="taskContent"
          placeholder="Adicione uma nova tarefa"
          value={newTaskContent}
          onChange={handleNewTaskChange}
        />
        <button type="submit">
          Criar
          <MdAddCircleOutline size={16} />
        </button>
      </form>

      <div className={styles.tasksHeader}>
        <p className={styles.createdTasks}>
          Tarefas criadas <span>{tasks.length}</span>
        </p>
        <p className={styles.completedTasks}>
          Concluídas
          <span>
            {completedTasksAmount} de {tasks.length}
          </span>
        </p>
      </div>

      <ul>
        {tasks.map(task => (
          <TaskList
            key={task.id}
            taskId={task.id}
            taskContent={task.content}
            taskStatus={task.isComplete}
            toggleTaskStatus={handleToggleTaskStatus}
            deleteTask={handleDeleteTask}
          />
        ))}
      </ul>

      {tasks.length === 0 && (
        <div className={styles.tasksContainer}>
          <HiOutlineClipboardList size={56} />
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      )}
    </>
  )
}
