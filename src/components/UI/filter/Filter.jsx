import styled from "styled-components";
import TopicContext from "../../contexts/TopicContext";
import { useContext, useState } from "react";
import FilterProduct from "../filterproduct/FilterProduct";

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
  > div{
    display: flex;
    align-items: center;
    gap: 10px;
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

  const { TopicActionTypes, setTopics, topics, onFilterValueSelection } = useContext(TopicContext);

  return (
    <>
      <StyledFilter>
        <div>
          <h1>Filtravimas:</h1>
          <FilterProduct filterValueSelected={onFilterValueSelection} />
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