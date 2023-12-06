import { createContext, useEffect, useReducer, useState } from "react";

const CommentsContext = createContext();
const CommentsActionTypes = {
  get_all: 'get all topics from db',
  add: 'add one new topic',
  remove: 'remove one specific topic',
  edit: 'edit one specific topic'
};

const reducer = (state, action) => {
  switch(action.type){
    case CommentsActionTypes.get_all:
      return action.data;
    case CommentsActionTypes.add:
      fetch(`http://localhost:8080/comments`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case CommentsActionTypes.remove:
      fetch(`http://localhost:8080/comments/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case CommentsActionTypes.edit:
      fetch(`http://localhost:8080/comments/${action.id}`, {
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

const CommentsProvider = ({ children }) => {

  const [comments, setComments] = useReducer(reducer, []);

  const [isLiked, setIsLiked] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/comments`)
      .then(res => res.json())
      .then(data => setComments({
        type: CommentsActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        CommentsActionTypes,
        isLiked, 
        setIsLiked
      }}
    >
      { children }
    </CommentsContext.Provider>
  );
}

export { CommentsProvider };
export default CommentsContext;