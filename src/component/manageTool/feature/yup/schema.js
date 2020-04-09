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
    .required("Description Name is required")
    .min(50," Description must have at least 50 characters")
    .max(300," Description must be at most 300 characters")
})

const EmailSchema = yup.object().shape({
    email: yup.string()
    .required("Enter a valid email")
    .matches(emailRegex, "Enter a valid email")
})

const CountrySchema = yup.object().shape({
    email: yup.string()
    .required("Region is required")
})

export { ToolNameSchema, UrlSchema , DescriptionSchema, EmailSchema, CountrySchema};