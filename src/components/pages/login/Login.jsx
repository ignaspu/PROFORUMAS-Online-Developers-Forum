import { useContext, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import UsersContext from "../../contexts/UsersContext";
import FormikInput from "../../UI/input/FormikInput";

const StyledLoginPage = styled.main`
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

const Login = () => {

  const navigate = useNavigate();
  const { users, setLoggedInUser } = useContext(UsersContext);
  const [failedToLogin, setFailedToLogin] = useState(false);

  const formValues = {
    email: '',
    slaptazodis: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Įveskite tinkamą el. pašto adresą')
      .required('Būtina užpildyti lauką')
      .trim(),
    slaptazodis: Yup.string()
      .required('Būtina užpildyti lauką')
      .trim()
  });

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loggedInUser = users.find(user => user.email === values.email && bcrypt.compareSync(values.slaptazodis, user.slaptazodis));
      if (loggedInUser === undefined) {
        setFailedToLogin(true);
      }
      else {
        setLoggedInUser(loggedInUser);
        navigate('/');
      }
    }
  });

  return (
    <StyledLoginPage>
      <h1>Prisijungti</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormikInput
          type="email"
          name="email"
          formik={formik}
          placeholder="Įveskite el. pašto adresą"
        />
        <FormikInput
          type="password"
          name="slaptazodis"
          formik={formik}
          placeholder="Įveskite slaptažodį"
        />
        <button type="submit">Pirmyn!</button>
      </form>
      {
        failedToLogin && <p>Vartotojas su tokiu el. paštu ar slaptažodžiu nerastas</p>
      }
    </StyledLoginPage>
  );
}

export default Login;