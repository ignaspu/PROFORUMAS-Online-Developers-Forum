import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 50px 20px 50px;
  > h1{
    text-align: center;
  }
  > p{
    text-align: center;
  }
  > img{
    width: auto;
    height: 46vh;
    border-radius: 10px;
    border: 1px solid black;
  }
`;

const ApieMus = () => {
  return ( 
    <StyledMain>
      <h1>Apie forumą:</h1>
      <p>Forumas buvo sukurtas 2023 metais. Forumo tikslas sukurti programuotojų bendruomenę, kurioje viešai būtų galima dalintis naudingais patarimais, užduoti rūpimus klausimus bei padėti spręsti problemas. Norint pilnai naudotis forumo, prašome užsiregistruoti ir tik tuomet galėsite prisijungę rašyti komentaurs, užduoti klausimus. Prašome laikytis bendrųjų taisyklių, kad visiems būtų malonu čia lankytis.</p>
      <img src="https://img-9gag-fun.9cache.com/photo/ay2mR2q_460swp.webp"/>
    </StyledMain>
   );
}
 
export default ApieMus;