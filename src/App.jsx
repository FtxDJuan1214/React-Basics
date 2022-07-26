import React, {useState, Fragment, useRef, useEffect} from "react"
import { TodoList } from "./components/TodoList"
import { v4 as uuid } from 'uuid'

const KEY = 'todoApp.todos'

export function App()
{
    //Estado
    const [todos, setTodos] = useState([])

    //Referencia del input
    const todoTaskRef = useRef()

    //Recuperar 
    useEffect( () => {
        const storedTodos =  JSON.parse(localStorage.getItem(KEY))
        if(storedTodos) {
            setTodos(storedTodos)
        }
       
    }, [])
    

    //Guardar 
    useEffect( ()=> {
        localStorage.setItem(KEY, JSON.stringify(todos))

    }, [todos])


    //Hook
    const handleTodoAdd = () =>{
        const task = todoTaskRef.current.value
        if(task === '') return

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuid(), task, completed: false}]
        })

        todoTaskRef.current.value = null
    }

    const toggleTodo = (id) => {
        const newTodos = [...todos]
        const todo = newTodos.find( (todo)=> todo.id === id)
        todo.completed = !todo.completed
        setTodos(newTodos)
        
    }

    const handleTodoClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed )
        setTodos(newTodos)
    }

    return (
    <Fragment>
        < TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
        <button onClick={handleTodoAdd}>➕</button>
        <button onClick={handleTodoClearAll}>🗑</button>
        <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por finalizar</div>
    </Fragment>
    )
}                                                                   