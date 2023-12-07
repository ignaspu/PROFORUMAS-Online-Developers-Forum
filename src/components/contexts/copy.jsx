import { createContext, useEffect, useReducer, useState } from "react";
import { orderBy } from 'natural-orderby';
import { sort } from "fast-sort";

const TopicContext = createContext();
const TopicActionTypes = {
  get_all: 'get all topics from db',
  add: 'add one new topic',
  remove: 'remove one specific topic',
  edit: 'edit one specific topic',
  keistiStatusa: 'pakeisti is neatsakyto i atsakyta',
  neatsakyti: 'rodyti neatsakytus klausimus',
  atsakyti: 'rodyti tik atsakytus klausimus',
  visi: 'visi postai',
  naujausi: 'seniausi postai',
  seniausi: 'naujausi postai'
};

const reducer = (state, action) => {
  switch (action.type) {
    case TopicActionTypes.get_all:
      return action.data;
    case TopicActionTypes.add:
      fetch(`http://localhost:8080/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case TopicActionTypes.remove:
      fetch(`http://localhost:8080/topics/${action.id}`, {
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case TopicActionTypes.edit:
      fetch(`http://localhost:8080/topics/${action.id}`, {
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
    case TopicActionTypes.keistiStatusa:
      return state.map(el => {
        if (el.id === action.id) {
          fetch(`http://localhost:8080/topics/${action.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ atsakyta: !el.atsakyta })
          })
          return {
            ...el,
            atsakyta: !el.atsakyta
          }
        } else {
          return el;
        }
      });
    case TopicActionTypes.neatsakyti:
      return state.filter(topic => topic.atsakyta !== true)
    case TopicActionTypes.atsakyti:
      return state.filter(topic => topic.atsakyta === true)
    case TopicActionTypes.visi:
      return state.filter(topic => topic.id !== -55851);
    case TopicActionTypes.naujausi:
      const naujausi = sort(state).desc(u => u.publikuota);
      return naujausi;
    case TopicActionTypes.seniausi:
      const seniausi = sort(state).asc(u => u.publikuota);
      return seniausi;
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
}

const TopicProvider = ({ children }) => {

  const [topics, setTopics] = useReducer(reducer, []);

  const [isLiked, setIsLiked] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/topics`)
      .then(res => res.json())
      .then(data => setTopics({
        type: TopicActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <TopicContext.Provider
      value={{
        topics,
        setTopics,
        TopicActionTypes,
        isLiked,
        setIsLiked
      }}
    >
      {children}
    </TopicContext.Provider>
  );
}

export { TopicProvider };
export default TopicContext;