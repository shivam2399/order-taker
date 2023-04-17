import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formState, setFormState] = useState({
    orderId: "",
    price: "",
    dish: "",
    table: "",
  });

  const [tableData, setTableData] = useState({
    table1: [],
    table2: [],
    table3: [],
  });

  useEffect(() => {
    const savedData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      if (value) {
        if (savedData[value.table]) {
          savedData[value.table].push({ ...value, id: key });
        } else {
          savedData[value.table] = [{ ...value, id: key }];
        }
      }
    }
    setTableData(savedData);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...formState,
      // date: new Date().toString(),
    };
    localStorage.setItem(formData.orderId, JSON.stringify(formData));
    setFormState({
      orderId: "",
      price: "",
      dish: "",
      table: "",
    });
    if (tableData[formData.table]) {
      setTableData({
        ...tableData,
        [formData.table]: [...tableData[formData.table], formData],
      });
    } else {
      setTableData({
        ...tableData,
        [formData.table]: [formData],
      });
    }
  };

  const handleDelete = (table, id) => {
    localStorage.removeItem(id);
    const newData = tableData[table].filter((item) => item.id !== id);
    setTableData({
      ...tableData,
      [table]: newData,
    });
  };

  return (
    <>
     <h1>Order Taking Website</h1>
     <form onSubmit={handleSubmit}>
        <label>
          Unique order id:
          <input
            type="text"
            name="orderId"
            value={formState.orderId}
            onChange={(event) =>
              setFormState({
                ...formState,
                orderId: event.target.value,
              })
            }
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formState.price}
            onChange={(event) =>
              setFormState({
                ...formState,
                price: event.target.value,
              })
            }
          />
        </label>
        <label>
          Dish:
          <input
            type="text"
            name="dish"
            value={formState.dish}
            onChange={(event) =>
              setFormState({
                ...formState,
                dish: event.target.value,
              })
            }
          />
        </label>
        <label>
          Table:
          <select
            name="table"
            value={formState.table}
            onChange={(event) =>
              setFormState({
                ...formState,
                table: event.target.value,
              })
            }
          >
            <option value="">Select table</option>
            <option value="table1">Table 1</option>
            <option value="table2">Table 2</option>
            <option value="table3">Table 3</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Table 1</h2>
        {tableData.table1 && tableData.table1.map((item) => (
        <div key={item.id}>
         <p>{item.price}</p>
         <p>{item.dish}</p>
         <button onClick={() => handleDelete("table1", item.id)}>Delete</button>
        </div>
        ))}
      </div>
      <div>
        <h2>Table 2</h2>
        {tableData.table2 && tableData.table2.map((item) => (
        <div key={item.id}>
          <p>{item.price}</p>
          <p>{item.dish}</p>
          <button onClick={() => handleDelete("table2", item.id)}>Delete</button>
        </div>
        ))}
      </div>
      <div>
        <h2>Table 3</h2>
        {tableData.table3 && tableData.table3.map((item) => (
        <div key={item.id}>
          <p>{item.price}</p>
          <p>{item.dish}</p>
          <button onClick={() => handleDelete("table3", item.id)}>Delete</button>
        </div>
        ))} 
      </div>
    </>
  );
}

export default App;
