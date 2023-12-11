import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import TopicContext from "../../contexts/TopicContext";
import { Link } from "react-router-dom";
import Atsakymai from "../../UI/atsakymai/Atsakymai";
import RasytiKomentara from "../../UI/rasytiKomentara/RasytiKomentara";

const StyledMain = styled.main`
  width: 80%;
  margin: 0 auto;
  .rating {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    >span{
      font-size: 2rem;
    }
    > p {
      margin: 0;
      > i{
        font-size: 2.5rem;
      }
    }
  }
  span.tagas{
    background-color: #dec4c4;
  }
  > h1{
    text-align: center;
  }
  > div{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    > div:last-child > p{
    margin: 2px;
  }
  }
  > div > div > .linkas > img{
    display: flex;
    width: 200px;
    height: auto;
    margin: 0 auto;
  }
  > div.mygtukai{
    justify-content: flex-end;
    gap: 5px;
  }
`;

const SingleQuestion = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const { setTopics, TopicActionTypes, topics, liked, setLiked } = useContext(TopicContext);
  const { loggedInUser } = useContext(UsersContext);


  useEffect(() => {
    fetch(`http://localhost:8080/topics/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.pavadinimas) {
          navigate('/');
        }
        setQuestion(data);
      })
  }, []);

  return (
    question &&
    <StyledMain>
      <h1>{question.pavadinimas}</h1>
      {
        loggedInUser.id === question.userId &&
        <div className="mygtukai">
          <button
            onClick={() => navigate(`/klausimas/redaguoti/${id}`)}
          >Redaguoti</button>
          <button
            onClick={() => {
              setTopics({ type: TopicActionTypes.remove, id: id });
              navigate("/");
            }}
          >Ištrinti</button>
        </div>
      }
      <p>{question.aprasymas}</p>
      <p><i>{question.redaguota !== false ? `(Klausimas buvo redaguotas)` : null}</i></p>
      <div>
        <div>
          <Link className="linkas" to={question.nuotrauka !== "" ? question.nuotrauka : null} target="_blank"><img
            src={question.nuotrauka !== "" ? question.nuotrauka : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
            alt={`${question.pavadinimas} poster`}
          /></Link>
        </div>
        <div className="ratingAndInfo">
          <div className="rating">
            {
              loggedInUser &&
              <p><i
              onClick={() => {
                if (question.userId === loggedInUser.id) {
                  window.alert('Savo pranešimo vertinti negalima')
                } else if (liked.find(el => el.postId === question.id) !== undefined) {
                  window.alert('Jūs jau įvertinote šį pranešimą')
                } else {
                  const newLiked = { id: liked.length + 1, authorId: loggedInUser.id, postId: question.id }
                  setLiked([...liked, newLiked])
                  setTopics({
                    type: TopicActionTypes.patinka,
                    id: question.id
                  })
                }
              }}
                className="bi bi-hand-thumbs-up"></i></p>
            }
            <span>{topics.find(element => element.id === id).ivertinimas}</span>
            <p>Įvertinimas</p>
            {
              loggedInUser &&
              <p><i
                onClick={() => {
                  if (question.userId === loggedInUser.id) {
                    window.alert('Savo pranešimo vertinti negalima')
                  } else if (liked.find(el => el.postId === question.id) !== undefined) {
                    window.alert('Jūs jau įvertinote šį pranešimą')
                  } else {
                    const newLiked = { id: liked.length + 1, authorId: loggedInUser.id, postId: question.id }
                    setLiked([...liked, newLiked])
                    setTopics({
                      type: TopicActionTypes.nepatinka,
                      id: question.id
                    })
                  }
                }}
                className="bi bi-hand-thumbs-down"></i></p>
            }
          </div>
          <div>
            <p>Autorius: {question.autorius}</p>
            <p>Publikuota: {question.publikuota}</p>
            <p>Žymos: {question.zymos.map(el => <> <span className="tagas">{el}</span></>)}</p>
          </div>
        </div>
      </div>
      <h1>Atsakymai:</h1>
      {
        loggedInUser &&
        <RasytiKomentara
          questionId={question.id}
        />
      }
      <Atsakymai
        questionId={question.id}
      />
    </StyledMain>
  );
}

export default SingleQuestion;