import { validateValue, handlePromiseError, letters } from "../../../lib/helper";
import firstNameSchema from "./schema";

const validate = async (field, value) => {
    let promise = "";
    if (field === "firstName") {
        promise = validateValue(firstNameSchema, { firstName: value });
    }
    return handlePromiseError(promise);
}
export default validate;