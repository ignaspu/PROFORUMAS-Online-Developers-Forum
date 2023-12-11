import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 5px auto;
  width: 50%;
  > h1{
    text-align: center;
  }
`;

const Banner = () => {
  return ( 
    <StyledDiv>
      <h1>Čia gali buti jūsų reklama</h1>
    </StyledDiv>
   );
}
 
export default Banner;