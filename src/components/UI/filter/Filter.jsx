import styled from "styled-components";
import TopicContext from "../../contexts/TopicContext";
import { useContext } from "react";

const StyledFilter = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  margin: 5px 0;
  > div > h1{
    font-size: 0.75rem;
    display: inline-block;
    font-weight: 400;
  }
  > div > button{
    font-size: 0.75rem;
    margin: 3px;
    background-color: #9293926b;
    border: none;
    padding: 3px 10px;
    border-radius: 10px;
  }
  > div > button:hover{
    background-color: #b6b6b66b;
    cursor: pointer;
  }
`;

const Filter = () => {

  const { TopicActionTypes, setTopics, topics } = useContext(TopicContext);

  const naujausi = topics.slice().sort((a, b) => new Date(b.publikuota) - new Date(a.publikuota));
  const seniausi = topics.slice().sort((a, b) => new Date(a.publikuota) - new Date(b.publikuota));

  return (
    <>
      <StyledFilter>
        <div>
          <h1>Filtravimas:</h1>
          <button onClick={() => setTopics({ type: TopicActionTypes.neatsakyti})}>Rodyti neatsakytus</button>
          <button onClick={() => setTopics({ type: TopicActionTypes.atsakyti})}>Rodyti atsakytus</button>
          <button onClick={() => window.location.reload(false)}>Rodyti visus</button>
        </div>
        <div>
          <h1>Rikiavimas (pagal data):</h1>
          <button onClick={() => setTopics({ type: TopicActionTypes.naujausi})}>Nuo naujausių</button>
          <button onClick={() => setTopics({ type: TopicActionTypes.seniausi})}>Nuo seniausių</button>

        </div>
      </StyledFilter>
    </>
  );
}

export default Filter;