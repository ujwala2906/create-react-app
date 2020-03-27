import * as yup from "yup";
import { letters } from "../../../lib/helper";

const FieldSchema = yup.object().shape({
    endorsementField: yup.string()
    .max(20, "Endorsement must be at most 20 characters")
    .matches(letters, "Only alphabetical characters"),
  });

export default FieldSchema;