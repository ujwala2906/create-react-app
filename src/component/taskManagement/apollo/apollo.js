import { gql } from "apollo-boost";

const GET_TASK = gql`
  query tasks{
    tasks {
    user
    title
    description
    assignTo
    status
    }
  }
`;

const ADD_TASK = gql`
  mutation addTask($input: AddNewTask) {
    addTask(taskInput: $input) {
    title
    description
    assignTo
    status
    user
    }
  }
`;

const TASK_SUBSCRIPTION = gql`
subscription {
  taskAdded {
    title
    description
    assignTo
    status
  }
}`;

export { GET_TASK, ADD_TASK, TASK_SUBSCRIPTION};
