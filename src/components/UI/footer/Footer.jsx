import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
background-color: #c9c8c8;
padding: 10px 0px 5px 0px;
  > div{
    display: flex;
    justify-content: space-evenly;
    > div{
      > h1{
        font-size: 1rem;
        margin: 2px;
      }
      > ul{
        margin: 0;
        padding: 0;
        > li{
          list-style-type: none;
        }
      }
    }
  }
  > p{
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <div>
          <h1>PROFORUMAS</h1>
          <ul>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="/">Visi klausimai</Link></li>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="/manoklausimai">Mano klausimai</Link></li>
          </ul>
        </div>
        <div>
          <h1>KOMPANIJA</h1>
          <ul>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="/apie">Apie mus</Link></li>
          </ul>
        </div>
        <div>
          <h1>SOC. TINKLAI</h1>
          <ul>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="https://www.facebook.com">Facebook</Link></li>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="https://www.instagram.com">Instagram</Link></li>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="https://www.x.com">X</Link></li>
            <li><Link style={{ textDecoration: 'none', color: 'black' }} to="https://www.linkedin.com">LinkedIn</Link></li>
          </ul>
        </div>
      </div>
      <p>Site design / logo &copy; 2023 proforumas.lt</p>
    </StyledFooter>
  );
}

export default Footer;