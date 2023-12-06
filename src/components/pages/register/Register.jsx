import { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import UsersContext from "../../contexts/UsersContext";
import FormikInput from "../../UI/input/FormikInput";

const StyledRegisterPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  height: 69vh;
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

const Register = () => {

  const navigate = useNavigate();
  const { users, setUsers, UsersActionTypes, setLoggedInUser } = useContext(UsersContext);
  const [failedToRegister, setFailedToRegister] = useState({
    email: '',
    name: ''
  });

  const formValues = {
    vartotojoVardas: '',
    email: '',
    slaptazodis: '',
    pakartotiSlaptazodi: '',
    amzius: '',
    profilioNuotrauka: ''
  };

  const validationSchema = Yup.object({
    vartotojoVardas: Yup.string()
      .min(5, 'Vartotojo varde mažiausiai 5 simboliai')
      .max(20, 'Vartotojo varde daugiausiai 20  simboliai')
      .required('Būtinai užpildykite lauką')
      .trim(),
    email: Yup.string()
      .email('Įveskite teisingą el. paštą')
      .required('Būtinai užpildykite lauką')
      .trim(),
    slaptazodis: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        'Slaptažodis turi būti 5-20 simbolių. Privalo būti viena didžioji raidė, viena mažoji, vienas skaitmuo ir spec. simbolis'
      )
      .required('Būtinai užpildykite lauką')
      .trim(),
    pakartotiSlaptazodi: Yup.string()
      .oneOf([Yup.ref('slaptazodis')], 'Slaptažodžiai turi sutapti')
      .required('Būtinai užpildykite lauką')
      .trim(),
    amzius: Yup.number()
      .moreThan(13, 'Jūsų amžius privalo būti bent 14 metų')
      .required('Būtinai užpildykite lauką'),
    profilioNuotrauka: Yup.string()
      .url('Privalo būti tinkamas URL adresas')
      .required('Būtinai užpildykite lauką')
      .trim()
  });

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {

      if (users.find(user => user.vartotojoVardas === values.vartotojoVardas)) {
        setFailedToRegister(prevState => {
          return {
            ...prevState,
            name: 'Vartotojas su tokiu vardu jau egzistuoja'
          }
        });
      } else {
        setFailedToRegister(prevState => {
          return {
            ...prevState,
            name: ''
          }
        });
      }
      if (users.find(user => user.email === values.email)) {
        setFailedToRegister(prevState => {
          return {
            ...prevState,
            email: 'Vartotojas su tokiu el. paštu jau egzistuoja'
          }
        });
      } else {
        setFailedToRegister(prevState => {
          return {
            ...prevState,
            email: ''
          }
        });
      }

      if (!users.find(user => user.vartotojoVardas === values.vartotojoVardas) && !users.find(user => user.email === values.email)) {
        const workingUser = {
          id: uuid(),
          vartotojoVardas: values.vartotojoVardas,
          email: values.email,
          slaptazodis: bcrypt.hashSync(values.slaptazodWis, 8),
          amzius: values.amzius,
          registracijosData: new Date().toISOString().slice(0, 10),
          profilioNuotrauka: values.profilioNuotrauka,
          likedIds: ''
        };
        setUsers({
          type: UsersActionTypes.add,
          data: workingUser
        });
        setLoggedInUser(workingUser);
        navigate('/');
      }
    }
  });

  return (
    <StyledRegisterPage>
      <h1>Registracija</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          type="text"
          name="vartotojoVardas"
          formik={formik}
          placeholder="Įveskite vartotojo vardą..."
        />
        <FormikInput
          type="email"
          name="email"
          formik={formik}
          placeholder="Įveskite el. paštą..."
        />
        <FormikInput
          type="password"
          name="slaptazodis"
          formik={formik}
          placeholder="Sugalvokite slaptažodį"
        />
        <FormikInput
          type="password"
          name="pakartotiSlaptazodi"
          formik={formik}
          placeholder="Pakartokite slaptažodį"
        />
        <FormikInput
          type="number"
          name="amzius"
          formik={formik}
          placeholder="Įveskite savo amžių..."
        />
        <FormikInput
          type="url"
          name="profilioNuotrauka"
          formik={formik}
          placeholder="Įveskite avataro URL adresą..."
        />
        <button type="submit">Registruotis</button>
      </form>
      {
        failedToRegister.name && <p>{failedToRegister.name}</p>
      }
      {
        failedToRegister.email && <p>{failedToRegister.email}</p>
      }
    </StyledRegisterPage>
  );
}

export default Register;