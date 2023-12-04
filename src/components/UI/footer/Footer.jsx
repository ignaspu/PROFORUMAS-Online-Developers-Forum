import styled from "styled-components";

const StyledFooter = styled.footer`
background-color: #c9c8c8;
  > div{
    display: flex;
    justify-content: space-evenly;
    > div{
      > h1{
        font-size: 1rem;
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
            <li>Visi klausimai</li>
            <li>Mano klausimai</li>
            <li>Pagalba</li>
          </ul>
        </div>
        <div>
          <h1>KOMPANIJA</h1>
          <ul>
            <li>Apie mus</li>
            <li>Kontaktai</li>
            <li>Karjera</li>
          </ul>
        </div>
        <div>
          <h1>SOC. TINKLAI</h1>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <p>Site design / logo &copy; 2023 proforumas.lt</p>
    </StyledFooter>
  );
}

export default Footer;