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
`;

const SingleQuestion = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const { setTopics, TopicActionTypes } = useContext(TopicContext);
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
        <>
          <button
            onClick={() => navigate(`/klausimai/redaguoti/${id}`)}
          >Redaguoti</button>
          <button
            onClick={() => {
              setTopics({ type: TopicActionTypes.remove, id: id });
              navigate("/");
            }}
          >Ištrinti</button>
        </>
      }
      <p>{question.aprasymas}</p>
      <div>
        <div>
          <Link className="linkas" to={question.nuotrauka !== "" ? question.nuotrauka : null} target="_blank"><img
            src={question.nuotrauka !== "" ? question.nuotrauka : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
            alt={`${question.pavadinimas} poster`}
          /></Link>
        </div>
        <div>
          <p>Publikuota: {question.publikuota}</p>
          <p>Balsų skaičius: {question.balsuSkaicius}</p>
          <p>Įsimintas: {question.isiminta}</p>
          <p>Įvertinimas: {question.ivertinimas}</p>
          <p>Autorius: {question.autorius}</p>
          <p>Ar klausimas atsakytas?: {question.atsakyta ? 'Atsakytas' : 'Neatsakytas'}</p>
          <p>Žymos: {question.zymos.map(el => <> <span className="tagas">{el}</span></>)}</p>
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