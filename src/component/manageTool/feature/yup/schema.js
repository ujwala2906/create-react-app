import * as yup from "yup";
import { URLRegex, emailRegex } from "../../../../lib/helper";

const ToolNameSchema = yup.object().shape({
    toolName: yup.string()
        .required("Tool Name is required")
        .max(50, "Tool name must be at most 50 characters")
});

const UrlSchema = yup.object().shape({
    url: yup.string()
        .matches(URLRegex, "viewUrl must be a valid URL")
});

const DescriptionSchema = yup.object().shape({
    description: yup.string()
        .required("Description is required")
        .min(50, " Description must have at least 50 characters")
        .max(300, " Description must be at most 300 characters")
})

const EmailSchema = yup.object().shape({
    email: yup.string()
        .required("Enter a valid email")
        .matches(emailRegex, "Enter a valid email")
})

const SeatsSchema = yup.object().shape({
    seats: yup.number()
        .positive()
        .max(9999)
        .typeError("Seats must be positive number")
})

const LimitSchema = yup.object().shape({
    superUser: yup.string().email("SuperUser must be a valid email")
        .required("SuperUser must be a valid email")
});

const ContactSchema = yup.object().shape({
    email: yup.string().email("Contact Email is a required field")
        .required("Contact Email is a required field")
});

const InstructionSchema = yup.object().shape({
    instruction: yup.string().required("General Instruction is required")
});

const QuestionSchema = yup.object().shape({
    question: yup.string().required("Enter at least one question").max(200, "Question must be at most 200 characters")
});

const NameSchema = yup.object().shape({
    name: yup.string().required("Logo is Required")
});

const EmptySchema = yup.object().shape();

export { NameSchema, QuestionSchema, ToolNameSchema, UrlSchema, DescriptionSchema, EmailSchema, SeatsSchema, LimitSchema, ContactSchema, InstructionSchema, EmptySchema };