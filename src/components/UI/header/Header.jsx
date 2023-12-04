import styled from "styled-components";
import OffNav from "../offNav/OffNav";

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
  return (
    <StyledHeader>
      <div>
        <h1>PROFORUMAS.lt</h1>
      </div>
      <OffNav/>
    </StyledHeader>
  );
}

export default Header;