import { createContext, useEffect, useReducer, useState } from "react";

const TopicContext = createContext();
const TopicActionTypes = {
  get_all: 'get all topics from db',
  add: 'add one new topic',
  remove: 'remove one specific topic',
  edit: 'edit one specific topic'
};

const reducer = (state, action) => {
  switch(action.type){
    case TopicActionTypes.get_all:
      return action.data;
    case TopicActionTypes.add:
      fetch(`http://localhost:8080/topics`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case TopicActionTypes.remove:
      fetch(`http://localhost:8080/topics/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case TopicActionTypes.edit:
      fetch(`http://localhost:8080/topics/${action.id}`, {
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return state.map(el => {
        if(el.id.toString() === action.id.toString()){
          return { id:action.id, ...action.data };
        } else {
          return el;
        }
      });
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
      { children }
    </TopicContext.Provider>
  );
}

export { TopicProvider };
export default TopicContext;