
const validateValue = async (schema, value) => schema.validate(value);

const letters = /^[A-Za-z]+$/;

const handlePromiseError = async promise => {
  let errorMessage = "";
  await promise.catch(err => {
    errorMessage = err.message;
  });
  return errorMessage;
};

export { validateValue, handlePromiseError, letters };
