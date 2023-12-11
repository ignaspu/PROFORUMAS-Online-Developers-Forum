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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  background-color: #eae8e8;
  padding: 10px;
  margin-bottom: 10px;
  > h1{
    font-size: 1.25rem;
  }
  > form{
    display: flex;
    flex-direction: column;
    gap: 5px;
    > button{
      background-color: #DEC4C4;
      border: 0;
      border-radius: 10px;
    }
    > button:hover{
      background-color: #8e8787; 
      cursor: pointer;    
    }
  }
`;

const RasytiKomentara = ({ questionId }) => {

  const { setComments, CommentsActionTypes } = useContext(CommentsContext);
  const { loggedInUser } = useContext(UsersContext);
  const { setTopics, TopicActionTypes } = useContext(TopicContext);

  const values = {
    komentaras: '',
  };

  const data = new Date().toISOString().slice(0,16).replace("T", " ");

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
        publikuota: data,
        balsuSkaicius: 0,
        ivertinimas: 0,
        postId: questionId,
        redaguota: false
      };
      setTopics({
        type: TopicActionTypes.keistiStatusa,
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