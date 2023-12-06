import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";
import TopicContext from "../../contexts/TopicContext";

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

const Topic = ({ data }) => {

  const { loggedInUser, setLoggedInUser } = useContext(UsersContext);
  
  return (
    <StyledDiv>
      <div>
        <p>Balsų skaičius: {data.balsuSkaicius}</p>
        <p>Įsimintas: {data.isiminta} kartus</p>
        <p>Įvertinimas: {data.ivertinimas}</p>
      </div>
      <div className="content">
        <h1>{data.pavadinimas}</h1>
        <p className="textarea">
          {
            data.aprasymas.length > 200
              ? data.aprasymas.substring(0, 200 - 3) + " ..."
              : data.aprasymas
          }
        </p>
      </div>
      <div>
        <p>Autorius: {data.autorius}</p>
        <p>Publikuota: {data.publikuota}</p>
      </div>
    </StyledDiv>
  );
}

export default Topic;