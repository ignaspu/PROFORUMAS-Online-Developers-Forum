import styled from "styled-components";
import Filter from "../filter/Filter";
import Topics from "../topics/Topics";
import Banner from "../banner/Banner";

const StyledMain = styled.main`

`;

const Main = () => {
  return (
    <StyledMain>
      <Banner />
      <Filter />
      <Topics />
    </StyledMain>
  );
}

export default Main;