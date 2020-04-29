
const validateValue = async (schema, value) => schema.validate(value);

const letters = /^[a-zA-Z ]*$/;

const URLRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const pattern = /image[/](?:jpg|jpeg|png|gif)/;

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const handlePromiseError = async promise => {
  let errorMessage = "";
  await promise.catch(err => {
    errorMessage = err.message;
  });
  return errorMessage;
};

export { validateValue, handlePromiseError, letters, URLRegex, emailRegex};
