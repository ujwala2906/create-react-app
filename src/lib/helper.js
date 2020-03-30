
const validateValue = async (schema, value) => schema.validate(value);

const letters = /^[a-zA-Z][a-zA-Z ]+$/;


const handlePromiseError = async promise => {
  let errorMessage = "";
  await promise.catch(err => {
    errorMessage = err.message;
  });
  return errorMessage;
};

export { validateValue, handlePromiseError, letters };
