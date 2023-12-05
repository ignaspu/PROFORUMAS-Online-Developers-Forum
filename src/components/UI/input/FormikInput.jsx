const FormikInput = ({ type, name, formik, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
      <input
        type={type}
        name={name} id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder?placeholder:''}
      />
      {
        formik.touched[name] && formik.errors[name] &&
        <p
          style={{ color:"red", fontSize: '0.7rem' }}
        >{formik.errors[name]}</p>
      }
    </div>
  );
}
 
export default FormikInput;