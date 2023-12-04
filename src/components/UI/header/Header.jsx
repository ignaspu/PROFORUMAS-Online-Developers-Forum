import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid black;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
  > nav {
    > ul{
      margin: 0;
      padding: 0;
      display: flex;
      gap: 20px;
      > li{
        padding: 5px;
        list-style-type: none;
      }
    }
  }
  
`;

const Header = () => {
  return (
    <StyledHeader>
      <div>
        <h1>PROFORUMAS.lt</h1>
      </div>
      <nav>
        <ul>
          <li>Apie mus</li>
          <li>Visi klausimai</li>
          <li>Prisijungti</li>
          <li>Užsiregistruoti</li>
        </ul>
      </nav>
    </StyledHeader>
  );
}

export default Header;