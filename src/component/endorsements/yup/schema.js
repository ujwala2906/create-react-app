import * as yup from "yup";
import { letters } from "../../../lib/helper";

const firstNameSchema = yup.object().shape({
    firstName: yup.string()
    .max(20, "Endorsement must be at most 20 characters")
    .matches(letters, "Only alphabetical characters"),
  });

export default firstNameSchema;