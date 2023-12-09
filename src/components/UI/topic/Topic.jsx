import styled from "styled-components";
import { useNavigate } from "react-router";

const StyledDiv = styled.div`
  margin: 5px 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  align-items: center;
  > div{
    width: 300px;
  }
  div p:not(.textarea){
    margin: 5px;
  }
  > div.content{
    width: 50%;
    margin: 0 auto;
    > h1{
      font-size: 1.25rem;
    }
    > h1:hover{
      text-decoration: underline;
    }
    > p{
      font-size: 0.8rem;
    }
  }
`;

const Topic = ({ data }) => {

  const navigate = useNavigate();

  return (
    <StyledDiv>
      <div>
        <p>Žymos: {data.zymos.map(el => <> <span style={{backgroundColor: '#dec4c4'}} className="tagas">{el}</span></>)}</p>
        <p>Įvertinimas: {data.ivertinimas}</p>
      </div>
      <div className="content">
        <h1
          onClick={() => navigate(`/klausimas/${data.id}`)}
          style={{ cursor: 'pointer' }}
        >{data.pavadinimas}</h1>
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