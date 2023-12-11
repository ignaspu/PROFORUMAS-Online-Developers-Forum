import styled from "styled-components";
import OffNav from "../offNav/OffNav";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";
import OnNav from "../onNav/OnNav";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  height: 70px;
  > div > h1{
    font-family: 'Press Start 2P';
    font-size: 1rem;
    letter-spacing: -2px;
    padding: 5px;
    border-right: 1px solid black;
  }
  > div{
    width: 30%;
  }
  
`;

const Header = () => {

  const { loggedInUser } = useContext(UsersContext)

  return (
    <StyledHeader>
      <div>
        <h1>PROFORUMAS.lt</h1>
      </div>
      {
        !loggedInUser
          ? <OffNav />
          : <OnNav />
      }
    </StyledHeader>
  );
}

export default Header;