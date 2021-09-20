import React, { useReducer } from "react";
import "./App.css";

const initialState = {
  counter: 15,
  userName: "",
  address: {
    city: "",
    street: "",
  },
};

type State = {
  counter: number;
  userName: string;
  address: { street: string; city: string };
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "resetState" }
  | { type: "updateUserName"; name: string }
  | {
      type: "updateAddress";
      data: {
        street: string;
        city: string;
      };
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        counter: state.counter + 1,
      };

    case "decrement":
      return {
        ...state,
        counter: state.counter - 1,
      };

    case "updateUserName":
      return {
        ...state,
        userName: action.name,
      };

    case "updateAddress":
      return {
        ...state,
        address: action.data,
      };

    case "resetState":
      return initialState;

    default:
      return state;
  }
}

function App() {
  const [{ counter, userName }, dispatch] = useReducer(reducer, initialState);

  function updateAddress() {
    dispatch({
      type: "updateAddress",
      data: {
        city: "Lisbon",
        street: "Rua das palmeiras",
      },
    });
  }

  return (
    <div className="container">
      <p>
        The counter is <span>{counter}</span>
      </p>

      <div>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      </div>

      <input
        type="text"
        value={userName}
        placeholder="Type your name"
        onChange={(ev) => {
          dispatch({ type: "updateUserName", name: ev.target.value });
        }}
      />

      <button onClick={() => dispatch({ type: "resetState" })}>
        RESETAR TUDO
      </button>
    </div>
  );
}

export default App;
