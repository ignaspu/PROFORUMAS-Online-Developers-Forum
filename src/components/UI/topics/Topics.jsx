import Topic from "../topic/Topic";
import { useContext } from "react";
import styled from "styled-components";
import TopicContext from "../../contexts/TopicContext";

const StyledMain = styled.main`
  > :last-child{
    padding-bottom: 0;
  }
`;

const Topics = () => {

  const { filteredProductList } = useContext(TopicContext);

  return (
    <StyledMain>
      {
        filteredProductList.map(singleTopic => {
          return <Topic 
            key={singleTopic.id}
            data={singleTopic}
          />
        })
      }
    </StyledMain>
  );
}

export default Topics;