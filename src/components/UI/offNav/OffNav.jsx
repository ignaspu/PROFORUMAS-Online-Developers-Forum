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
        <li>Apie mus</li>
        <li>Visi klausimai</li>
        <li>Prisijungti</li>
        <li>Užsiregistruoti</li>
      </ul>
    </StyledNav>
  );
}

export default OffNav;