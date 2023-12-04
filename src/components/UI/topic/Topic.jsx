import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 5px 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  align-items: center;
  div p:not(.textarea){
    margin: 5px;
  }
  > div.content{
    width: 50%;
    margin: 0 auto;
    > h1{
      font-size: 1.25rem;
    }
    > p{
      font-size: 0.8rem;
    }
  }
`;

const Topic = () => {
  return (
    <StyledDiv>
      <div>
        <p>Balsų skaičius: 12</p>
        <p>Įsimintas: 3 kartus</p>
        <p>Įvertinimas: 8</p>
      </div>
      <div className="content">
        <h1>Kaip sukurti ToDo aplikacija naudojant React?</h1>
        <p className="textarea">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam libero saepe consequuntur ab obcaecati ipsam, perferendis dolore iure in placeat unde magni eaque delectus doloribus quasi vitae, distinctio vel! Architecto...</p>
      </div>
      <div>
        <p>Autorius: mouse558</p>
        <p>Publikuota: 2023-01-02</p>
        <i class="bi bi-heart-fill"> Įsimintas</i>
      </div>
    </StyledDiv>
  );
}

export default Topic;