import { useEffect, useState } from "react";
import { db } from "../firbase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null); // store editing item id
  const [newValue, setNewValue] = useState(""); // edited value

  const fetchList = async () => {
    const getItems = await getDocs(collection(db, "list"));
    setList(getItems.docs.map((item) => ({ id: item.id, ...item.data() })));
  };

  const addValue = async () => {
    try {
      if (value === "") {
        alert("Type project name");
      } else {
        await addDoc(collection(db, "list"), { value });
        setValue("");
        fetchList();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "list", id));
      fetchList();
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setNewValue(item.value);
  };

  const saveValue = async (id) => {
    try {
      await updateDoc(doc(db, "list", id), { value: newValue });
      setEditId(null);
      setNewValue("");
      fetchList();
    } catch (error) {
      console.error("Update error: ", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Project Manager</h1>
      <div className="input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter project name"
          className="input"
        />
        <button onClick={addValue} className="add-button">
          Add
        </button>
      </div>

      {list.length > 0 ? (
        <ul className="list">
          {list.map((item) => (
            <div key={item.id} className="list-item">
              {editId === item.id ? (
                <>
                  <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="input"
                  />
                  <button className="add-button" onClick={() => saveValue(item.id)}>Save</button>
                </>
              ) : (
                <>
                  <li className="project-name">{item.value}</li>
                  
                  <div><button style={{marginRight:"6px"}} onClick={() => handleDelete(item.id)} className="delete-button">
                    Delete
                  </button>
                  <button className="add-button" onClick={() => handleEdit(item)}>Edit</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p>There is no project</p>
      )}
    </div>
  );
}

export default App;
