import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
import FormikInput from '../../UI/input/FormikInput';
import UsersContext from '../../contexts/UsersContext';
import CommentsContext from '../../contexts/CommentsContext';
import TopicContext from "../../contexts/TopicContext";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
`;

const RasytiKomentara = ({ questionId }) => {

  const { setComments, CommentsActionTypes } = useContext(CommentsContext);
  const { loggedInUser } = useContext(UsersContext);
  const { setTopics, topics, TopicActionTypes } = useContext(TopicContext);

  const values = {
    komentaras: '',
  };

  const specTopic = topics.find(topic => topic.id === questionId)

  const validationSchema = Yup.object({
    komentaras: Yup.string()
      .min(5, 'Komentare mažiausiai 5 simboliai')
      .max(600, 'Komentare daugiausiai 600 simbolių')
      .required('Laukas yra privalomas')
      .trim(),
  });

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const finalValues = {
        id: uuid(),
        userId: loggedInUser.id,
        ...values,
        autorius: loggedInUser.vartotojoVardas,
        publikuota: new Date().toLocaleDateString(),
        balsuSkaicius: 0,
        ivertinimas: 0,
        postId: questionId,
        redaguota: false
      };
      // setTopics({
      //   type: TopicActionTypes.keistiStatusa,
      //   id: questionId
      // });
      setTopics({
        type: TopicActionTypes.komentaruPadidinti,
        id: questionId
      });
      setComments({
        type: CommentsActionTypes.add,
        data: finalValues
      });
      resetForm();
    }
  })

  return (
    <StyledSection>
      <h1>Rašyti komentarą</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          type="text"
          name="komentaras"
          formik={formik}
        />
        <button type="Submit">Pateikti komentarą</button>
      </form>
    </StyledSection>
  );
}

export default RasytiKomentara;