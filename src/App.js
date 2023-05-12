import React, { useState , useEffect} from 'react';
import Header from "./components/Header"
import Form from "./components/Form"
import Elements from './components/Elements';
import './App.css';
import FilterSelector from './components/FilterSelector';

function App() {
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    fetch("/api/getNotes").then(
      response => response.json()
    ).then(
      data=> {
        setTodos(data.notes)
      }
    )
  }, [])

  return (
    <div className="container">
      <div className="app-wrapper">
        <Header/>
        <FilterSelector
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
        <Form
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
        />
        <div style={{overflowY: "auto"}}>
          <Elements
            todos={todos}
            filter={filter}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
