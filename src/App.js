import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addpeople,
  decrement,
  deletepeople,
  increment,
  updatepeople,
} from "./Actions/Actions";
function App() {
  const counter = useSelector((e) => e.CounterReducer);
  const dispatch = useDispatch();
  const peoples = useSelector((e) => e.PeopleReducer.peoples);
  const [name, setname] = useState("");
  const [edit, setedit] = useState("");
  const [idholder, setidholde] = useState(0);
  const [modal, setmodal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addpeople({ name, id: Math.random() }));
  };
  const openmodal = (id) => {
    setmodal(true);
    setidholde(id);
  };
  const handleedit = (e) => {
    e.preventDefault();
    dispatch(updatepeople({ edit, idholder }));
  };
  return (
    <div className="App">
      {counter}
      <button
        onClick={() => {
          dispatch(increment());
        }}>
        add
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}>
        minus
      </button>
      <form action="submit" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </form>
      {modal && (
        <form action="submit" onSubmit={handleedit}>
          <input
            type="text"
            value={edit}
            onChange={(e) => {
              setedit(e.target.value);
            }}
          />
        </form>
      )}
      {peoples.map((e) => (
        <div key={e.id}>
          {e.name}{" "}
          <button
            onClick={() => {
              dispatch(deletepeople(e.id));
            }}>
            delete
          </button>
          <button
            onClick={() => {
              openmodal(e.id);
            }}>
            edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
