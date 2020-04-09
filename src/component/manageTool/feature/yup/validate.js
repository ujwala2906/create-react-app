import { validateValue, handlePromiseError } from "../../../../lib/helper";
import { ToolNameSchema, UrlSchema, DescriptionSchema, EmailSchema, CountrySchema } from "./schema";

const validate = async (field, value) => {
    let promise = "";
    switch (field) {
        case "title":
            promise = validateValue(ToolNameSchema, { toolName: value });
            break;
        case "url":
            promise = validateValue(UrlSchema, { url: value });
            break;
        case "description":
            promise = validateValue(DescriptionSchema, { description: value });
            break;
        case "email":
            promise = validateValue(EmailSchema, { email: value });
            break;
        case "country":
            promise = validateValue(CountrySchema, { country: value });
            break;
        default:
            return "";
    }
    return handlePromiseError(promise);
}
export default validate;