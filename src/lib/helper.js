
const validateValue = async (schema, value) => schema.validate(value);

const letters = /^[a-zA-Z ]*$/;

const URLRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const pattern = /image[/](?:jpg|jpeg|png|gif)/;

const handlePromiseError = async promise => {
  let errorMessage = "";
  await promise.catch(err => {
    errorMessage = err.message;
  });
  return errorMessage;
};

export { validateValue, handlePromiseError, letters, URLRegex};
