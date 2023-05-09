import React, { useState , useEffect} from 'react';
import Header from "./components/Header"
import Form from "./components/Form"
import Elements from './components/Elements';
import './App.css';

function App() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

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
        <div>
          <Header/>
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
          />
        </div>
        <div style={{overflowY: "auto"}}>
          <Elements
            todos={todos}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
