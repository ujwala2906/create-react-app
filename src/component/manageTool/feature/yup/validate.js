import { validateValue, handlePromiseError } from "../../../../lib/helper";
import { NameSchema, ToolNameSchema, UrlSchema, DescriptionSchema, EmailSchema, SeatsSchema, EmptySchema, QuestionSchema, LimitSchema, ContactSchema, InstructionSchema } from "./schema";

const validate = async (field, value, length) => {
    let promise = "";
    switch (field) {
        case "tool":
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
        case "seats":
            promise = validateValue(SeatsSchema, { seats: value });
            break;
        case "superUser":
            promise = validateValue(LimitSchema, { superUser: value });
            break;
        case "emailContact":
            promise = validateValue(ContactSchema, { email: value });
            break;
        case "whitelist":
            promise = validateValue(ContactSchema, { email: value });
            break;
        case "instruction":
            promise = validateValue(InstructionSchema, { instruction: value });
            break;
        case "name":
            promise = validateValue(NameSchema, { name: value });
            break;
        case "questionField":
            if (!length) {
                promise = validateValue(QuestionSchema, { question: value });
                break;
            }
            promise = validateValue(EmptySchema, { "": "" })
            break;
        default:
            return "";
    }
    return handlePromiseError(promise);
}
export default validate;