import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  > ul{
    margin: 0;
    padding: 0;
    display: flex;
    gap: 20px;
    > li{
      padding: 5px;
      list-style-type: none;
    }
    li:hover{
      cursor: pointer;
      text-shadow: 0px 1px 9px rgba(0,0,0,0.35);
    }
  }
`;


const OffNav = () => {
  return (
    <StyledNav>
      <ul>
        <li><Link style={{textDecoration: 'none', color: 'black'}} to="/">Pagrindinis</Link></li>
        <li><Link style={{textDecoration: 'none', color: 'black'}} to="/apie">Apie mus</Link></li>
        <li><Link style={{textDecoration: 'none', color: 'black'}} to="/prisijungti">Prisijungti</Link></li>
        <li><Link style={{textDecoration: 'none', color: 'black'}} to="/registracija">Užsiregistruoti</Link></li>
      </ul>
    </StyledNav>
  );
}

export default OffNav;