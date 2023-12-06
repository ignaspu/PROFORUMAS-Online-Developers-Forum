import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormikInput from '../../UI/input/FormikInput';
import UsersContext from '../../contexts/UsersContext';
import CommentsContext from '../../contexts/CommentsContext';

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

  const values = {
    komentaras: '',
  };

  const validationSchema = Yup.object({
    komentaras: Yup.string()
      .min(5, 'Komentare mažiausiai 5 simboliai')
      .max(200, 'Komentare daugiausiai 200 simbolių')
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