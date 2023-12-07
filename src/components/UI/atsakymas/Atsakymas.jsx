import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";
import CommentsContext from "../../contexts/CommentsContext";
import RedaguotiKomentara from "../redaguotiKomentara/RedaguotiKomentara";
import TopicContext from "../../contexts/TopicContext";

const StyledComments = styled.div`
  margin: 5px 0;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  display: flex;
  padding: 5px 10px;
  gap: 30px;
  justify-content: flex-start;
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

  const { loggedInUser } = useContext(UsersContext);
  const { setComments, CommentsActionTypes, setArRedaguota, arRedaguota } = useContext(CommentsContext);
  const { setTopics, TopicActionTypes } = useContext(TopicContext);

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
          <i>{data.redaguota !== false ? `(Atsakymas buvo redaguotas)` : null}</i>
        </div>
        <div>
          <p>Autorius: {data.autorius}</p>
          <p>Publikuotas: {data.publikuota}</p>
          <p>Balsų skaičius: {data.balsuSkaicius}</p>
        </div>
      </div>
      {
        loggedInUser.id === data.userId &&
        <div>
          <button
            onClick={() => setArRedaguota({ id: data.id })}
          >Redaguoti</button>
          <button
            onClick={() => {
              setComments({ type: CommentsActionTypes.remove, id: data.id });
              setTopics({
                type: TopicActionTypes.komentaruSumazinti,
                id: data.postId
              });
            }}>Ištrinti</button>
        </div>
      }
      {
        arRedaguota.id === data.id &&
        <RedaguotiKomentara
          id={data.id}
        />
      }
    </StyledComments >
  );
}

export default Atsakymas;