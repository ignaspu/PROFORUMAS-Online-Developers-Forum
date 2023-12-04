import styled from "styled-components";
import Filter from "../filter/Filter";
import Topics from "../topics/Topics";

const StyledMain = styled.main`

`;

const Main = () => {
  return ( 
    <StyledMain>
      <Filter/>
      <Topics/>
    </StyledMain>
   );
}
 
export default Main;