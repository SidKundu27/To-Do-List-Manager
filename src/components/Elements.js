import React from 'react';
import deleteIcon from './delete.png';

const Elements = ({ todos, filter, setTodos }) => {
  const handleDelete = async (id) => {
    const response = await fetch("/api/deleteNote", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })

    if (response.status === 200){
      const jsonResponse = await response.json();
      setTodos(jsonResponse.notes)
    }
  };

  const handleSelect = async (id) => {
    const response = await fetch("/api/taskComplete", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })

    if (response.status === 200){
      const jsonResponse = await response.json();
      setTodos(jsonResponse.notes)
    }
  };

  const handleArchive = async (id) => {
    const response = await fetch("/api/taskArchive", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    })

    if (response.status === 200){
      const jsonResponse = await response.json();
      setTodos(jsonResponse.notes)
    }
  }

  const filteredTodos = todos.filter((element) => {
    if (filter === "completed") {
      return element.completed;
    } else if (filter === "archived") {
      return element.archived;
    } else {
      return !element.archived;
    }
  });

  return (
    <div className='todos-List'>
      {filteredTodos.map((element, index) => (
        <div 
          className='todo-element'
          style={{opacity: element.completed ? "0.5" : "1"}}
          key={index}
        >
          <div 
            className='todo-name' 
            style={{textDecoration: element.completed ? "line-through" : "none"}}
          >
            <input 
              className='todo-check' 
              type="checkbox" onChange={() => handleSelect(element.id)} 
              checked={element.completed}
            />
            <li>{element.note}</li>
          </div>
          <div className='todo-buttons'>
            <button 
              onClick={() => handleArchive(element.id)}
              style={{textDecoration: element.archived ? "line-through" : "none"}}
              className='archive'  
            >
              Archive
            </button>
            <button
              onClick={() => handleDelete(element.id)}
              className='delete-button'
            >
              <img
                className='delete'
                src={deleteIcon} 
                alt='Delete'
              />
            </button>
          </div>
          
        </div>
      ))}
    </div>

  )
}

export default Elements