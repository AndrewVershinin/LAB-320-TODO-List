import { useReducer, useState } from 'react'
import TodoList from './components/TodoList';
import './App.css'


const initialState = [
  { id: 1, task: 'Get out of bed', isComplete: false, isEditing: false },
  { id: 2, task: 'Finish todo project', isComplete: false, isEditing: false },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [{ id: Date.now(), task: action.payload, isComplete: false, isEditing: false }, ...state];
    case 'TOGGLE_COMPLETE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, isComplete: !todo.isComplete } : todo
      );
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, isEditing: true } : todo
      );
    case 'SAVE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, task: action.payload, isEditing: false } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};

function App() {

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo(''); // Clear input after adding
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
      <TodoList todos={state} dispatch={dispatch} />
    </div>
  )
}

export default App
