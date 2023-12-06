import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";
import { Link } from "react-router-dom"
import CommentsContext from "../../contexts/CommentsContext";
import Atsakymas from "../atsakymas/Atsakymas";

const StyledSection = styled.section`
  > h1{
    text-align: center;
  }
  > p{
    text-align: center;
  }
  .noComments{
    text-align: center;
  }
`;

const Atsakymai = ({ questionId }) => {

  const { loggedInUser } = useContext(UsersContext);
  const { comments } = useContext(CommentsContext);

  
  return (
    <StyledSection>
      {
        !loggedInUser &&
        <p>Turite <Link to="/prisijungti">prisijungti</Link> arba <Link to="/registracija">užsiregistruoti</Link>, kad galėtumėte komentuoti</p>
      }
      <div>
        {
          comments.filter(comment => comment.postId === questionId).map(comment => {
            return <Atsakymas
              key={comment.id}
              data={comment}
            />
          })
        }
      </div>
    </StyledSection>
  );
}

export default Atsakymai;
// comments.map(comment => {
//   if (questionId === comment.postId) {
//     return <Atsakymas
//       data={comment}
//       key={comment.id}
//     />
//   } else {
//     return <p className="noComments">Nėra atsakymų. Būkite pirmas ir parašykite!</p>
//   }
// })