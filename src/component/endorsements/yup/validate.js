import { validateValue, handlePromiseError } from "../../../lib/helper";
import FieldSchema from "./schema";

const validate = async (field, value) => {
    let promise = "";
    if (field === "field") {
        promise = validateValue(FieldSchema, { endorsementField: value });
    }
    return handlePromiseError(promise);
}
export default validate;