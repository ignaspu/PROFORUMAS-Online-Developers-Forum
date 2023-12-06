import styled from "styled-components";

const StyledComments = styled.div`
  margin: 5px 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  display: flex;
  padding: 5px 10px;
  gap: 30px;
  > .rating {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >span{
      font-size: 2rem;
    }
    > p {
      margin: 0;
      > i{
        font-size: 3rem;
      }
    }
  }
  > div.comment{
    > div.name{
      > p{
        font-size: 1.2rem;
      }
    }
    > div:last-child{
      >p{
        margin: 0;
      }
    }
  }
`;

const Atsakymas = ({ data }) => {
  return (
    <StyledComments>
      <div className="rating">
        <p><i class="bi bi-hand-thumbs-up"></i></p>
        <span>{data.ivertinimas}</span>
        <p><i class="bi bi-hand-thumbs-down"></i></p>
      </div>
      <div className="comment">
        <div className="name">
          <p>{data.komentaras}</p>
        </div>
        <div>
          <p>Autorius: {data.autorius}</p>
          <p>Publikuotas: {data.publikuota}</p>
          <p>Balsų skaičius: {data.balsuSkaicius}</p>
        </div>
      </div>
    </StyledComments>
  );
}

export default Atsakymas;