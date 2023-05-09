import React from 'react';
import deleteIcon from './delete.png';

const Elements = ({ todos, setTodos }) => {
  const handleDelete = async (index, id) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

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

  return (
    <div className='todos-List'>
      {todos.map((element, index) => (
        <div className='todo-element' key={index}>
          <li>{element.note}</li>
          <button style={{padding: "0 1px"}}onClick={() => handleDelete(index, element.id)}>
            <img
              className='delete'
              src={deleteIcon} 
              alt='Delete'
            />
          </button>
          
        </div>
      ))}
    </div>

  )
}

export default Elements