import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";
import { Link } from "react-router-dom"
import CommentsContext from "../../contexts/CommentsContext";

const StyledSection = styled.section`
  > h1{
    text-align: center;
  }
  > p{
    text-align: center;
  }
`;

const Atsakymai = () => {

  const { loggedInUser } = useContext(UsersContext);
  const { comments } = useContext(CommentsContext);

  return ( 
    <StyledSection>
      <h1>Atsakymai:</h1>
      {
        !loggedInUser &&
        <p>Turite <Link to="/prisijungti">prisijungti</Link> arba <Link to="/registracija">užsiregistruoti</Link>, kad galėtumėte komentuoti</p>
      }
      {
        loggedInUser &&
        <div>
          <p>{comments.komentaras}</p>
        </div>
      }
    </StyledSection>
   );
}
 
export default Atsakymai;