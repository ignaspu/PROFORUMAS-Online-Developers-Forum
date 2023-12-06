import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormikInput from '../../UI/input/FormikInput';
import TopicContext from "../../contexts/TopicContext";

const StyledRedagavimas = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70.5vh;
  justify-content: center;
  > form{
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 2px solid black;
    padding: 30px;
    background-color: #e2f4fa;
    > button{
      border: 0;
      background-color: #c1bebe;
      padding: 5px;
      border-radius: 10px;
    }
    > div{
      display: grid;
      grid-template-columns: 1fr 3fr;
      
      > p{
        grid-column: span 2;
      }
    }
  }
`;

const RedaguotiKlausima = () => {

  const { setTopics, TopicActionTypes } = useContext(TopicContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    pavadinimas: '',
    aprasymas: '',
    zymos: '',
    nuotrauka: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/topics/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.pavadinimas) {
          navigate('/');
        }
        setFormValues({
          ...data,
          zymos: data.zymos.join('; ')
        });
      })
  }, []);


  const validationSchema = Yup.object({
    pavadinimas: Yup.string()
      .min(5, 'Pavadinime mažiausiai 5 simboliai')
      .max(50, 'Pavadinime daugiausiai 50 simbolių')
      .required('Laukas yra privalomas')
      .trim(),
    nuotrauka: Yup.string()
      .url('Privalo būti tinkamas URL adresas')
      .trim(),
    aprasymas: Yup.string()
      .min(10, 'Aprašyme mažiausiai 10 simbolių')
      .required('Laukas yra privalomas')
      .trim(),
    zymos: Yup.string()
      .min(3, 'Žymoje mažiausiai 3 simboliai')
      .required('Laukas yra privalomas')
      .trim(),
  });

  return (
    <StyledRedagavimas>
      <h1>Redaguoti klausimą</h1>
      {
        formValues.pavadinimas && <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const finalValues = {
              ...values,
              redaguota: true,
              zymos: values.zymos.split(';').map(el => el.trim())
            };
            setTopics({
              type: TopicActionTypes.edit,
              id: id,
              data: finalValues
            });
            navigate(`/klausimas/${id}`);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FormikInput
                type="text"
                name="pavadinimas"
                formik={props}
              />
              <FormikInput
                type="url"
                name="nuotrauka"
                formik={props}
              />
              <FormikInput
                type="text"
                name="aprasymas"
                formik={props}
              />
              <FormikInput
                type="text"
                name="zymos"
                formik={props}
                placeholder="Zyma; antra zyma; trecia zyma; ..."
              />
              <button type="Submit">Redaguoti</button>
            </form>
          )}
        </Formik>
      }
    </StyledRedagavimas>
  );
}

export default RedaguotiKlausima;