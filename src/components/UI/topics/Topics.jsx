import Topic from "../topic/Topic";
import styled from "styled-components";

const StyledMain = styled.main`
  > :last-child{
    padding-bottom: 0;
  }
`;

const Topics = () => {
  return (
    <StyledMain>
      <Topic/>
      <Topic/>
      <Topic/>
      <Topic/>
      <Topic/>
      <Topic/>
      <Topic/>
      <Topic/>
      <Topic/>
    </StyledMain>
  );
}

export default Topics;