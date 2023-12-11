import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FormikInput from '../../UI/input/FormikInput';
import UsersContext from '../../contexts/UsersContext';
import TopicContext from '../../contexts/TopicContext';

const StyledAddFormPage = styled.main`
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

const AddGame = () => {

  const data = new Date().toISOString().slice(0,16).replace("T", " ");

  const { setTopics, TopicActionTypes } = useContext(TopicContext);
  const { loggedInUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const values = {
    pavadinimas: '',
    aprasymas: '',
    zymos: '',
    nuotrauka: ''
  };

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
      .trim(),
  });

  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const finalValues = {
        id: uuid(),
        userId: loggedInUser.id,
        ...values,
        zymos: values.zymos.split(';'),
        autorius: loggedInUser.vartotojoVardas,
        publikuota: data,
        balsuSkaicius: 0,
        isiminta: 0,
        ivertinimas: 0,
        redaguota: false,
        atsakyta: false,
      };
      setTopics({
        type: TopicActionTypes.add,
        data: finalValues
      });
      navigate('/');
    }
  })

  return (
    <StyledAddFormPage>
      <h1>Užduoti klausimą</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput 
          type="text"
          name="pavadinimas"
          formik={formik}
        />
        <FormikInput 
          type="url"
          name="nuotrauka"
          formik={formik}
        />
        <FormikInput 
          type="text"
          name="aprasymas"
          formik={formik}
        />
        <FormikInput 
          type="text"
          name="zymos"
          formik={formik}
          placeholder="Zyma; antra zyma; trecia zyma; ..."
        />
        <button type="Submit">Pateikti klausimą</button>
      </form>
    </StyledAddFormPage>
  );
}
 
export default AddGame;