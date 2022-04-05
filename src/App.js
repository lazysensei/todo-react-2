import React, {useState, useEffect} from 'react';
import './index.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFiltredTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  }, []);

  useEffect(()=>{    
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  


  const filterHandler =()=>{
    switch (status) {
      case "completed":
        setFiltredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFiltredTodos(todos.filter((todo) => todo.completed === false))
        break;
      default:
        setFiltredTodos( todos );
        break;  
    }
  }  

  const saveLocalTodos = () =>{
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(!localStorage.getItem("todos")){
      localStorage.setItem("todos",JSON.stringify([]))
    }
    else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal)
    }    
  }

  return (
    <div>
      <header>
        <h1>Lazysensei's Todo List</h1>
      </header>
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} setStatus={setStatus}  />
      <TodoList status={status} setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />      
    </div>
  );
}

export default App;
