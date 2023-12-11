import { createContext, useEffect, useReducer, useState } from "react";

const VoteContext = createContext();
const VoteActionTypes = {
  get_all: 'get all votes from db',
  up: 'vote up for comment or post',
  down: 'vote down for comment or post',
};

const reducer = (state, action) => {
  switch (action.type) {
    case VoteActionTypes.get_all:
      return action.data;
    case VoteActionTypes.add:
      fetch(`http://localhost:8080/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case VoteActionTypes.remove:
      fetch(`http://localhost:8080/votes/${action.id}`, {
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case VoteActionTypes.edit:
      fetch(`http://localhost:8080/votes/${action.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return state.map(el => {
        if (el.id.toString() === action.id.toString()) {
          return { id: action.id, ...action.data };
        } else {
          return el;
        }
      });
    default:
      console.log("klaida: toks veiksmas nerastas", action.type);
      return state;
  }
}

const VoteProvider = ({ children }) => {

  const [votes, setVotes] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/votes`)
      .then(res => res.json())
      .then(data => setComments({
        type: VoteActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <VoteContext.Provider
      value={{
        votes,
        setVotes,
        VoteActionTypes
      }}
    >
      {children}
    </VoteContext.Provider>
  );
}

export { VoteProvider };
export default VoteContext;