import styled from "styled-components";

const StyledMain = styled.main`
width: 70%;
margin: 0 auto;
height: 67.5vh;
  > h1{
    text-align: center;
  }
`;

const ApieMus = () => {
  return ( 
    <StyledMain>
      <h1>Apie forumą:</h1>
      <p>Forumas buvo sukurtas 2023 metais. Forumo tikslas sukurti programuotojų bendruomenę, kurioje viešai būtų galima dalintis naudingais patarimais, užduoti rūpimus klausimus bei padėti spręsti problemas. Norint pilnai naudotis forumo, prašome užsiregistruoti ir tik tuomet galėsite prisijungę rašyti komentaurs, užduoti klausimus. Prašome laikytis bendrųjų taisyklių, kad visiems būtų malonu čia lankytis.</p>
    </StyledMain>
   );
}
 
export default ApieMus;