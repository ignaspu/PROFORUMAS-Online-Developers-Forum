import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import FormikInput from '../../UI/input/FormikInput';
import CommentsContext from '../../contexts/CommentsContext';

const StyledRedagavimas = styled.div`

`;

const RedaguotiKomentara = ({ id }) => {
  const { setComments, CommentsActionTypes, setArRedaguota } = useContext(CommentsContext);
  const [formValues, setFormValues] = useState({
    komentaras: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/comments/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormValues({
          ...data
        });
      })
  }, []);

  const validationSchema = Yup.object({
    komentaras: Yup.string()
      .min(5, 'Komentare mažiausiai 5 simboliai')
      .max(50, 'Komentare daugiausiai 50 simbolių')
      .required('Laukas yra privalomas')
      .trim(),
  });

  return (
    <StyledRedagavimas>
      <h1>Redaguoti komentarą</h1>
      {
        formValues.komentaras && <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const finalValues = {
              ...values,
              redaguota: true
            };
            setArRedaguota({ id: '' })
            setComments({
              type: CommentsActionTypes.edit,
              id: id,
              data: finalValues
            });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormikInput
                type="text"
                name="komentaras"
                formik={props}
              />
              <button className='submitBttn' type="Submit">Redaguoti</button>
            </form>
          )}
        </Formik>
      }
    </StyledRedagavimas>
  );
}

export default RedaguotiKomentara;