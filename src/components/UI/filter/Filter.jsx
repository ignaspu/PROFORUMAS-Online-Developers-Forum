import styled from "styled-components";

const StyledFilter = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  border-bottom: 1px solid black;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
  return (
    <StyledFilter>
      <div>
        <h1>Filtravimas:</h1>
        <button>Rodyti neatsakytus</button>
        <button>Rodyti atsakytus</button>
      </div>
      <div>
        <h1>Rikiavimas (pagal atsakymus):</h1>
        <button>Nuo didžiausio</button>
        <button>Nuo mažiausio</button>
      </div>
    </StyledFilter>
  );
}

export default Filter;