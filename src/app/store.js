import { createStore, combineReducers } from "redux";
import TaskEvent from "../components/TaskEvent";

const appReducer = combineReducers({
    taskReducer: TaskEvent,
});

const store = createStore(
    appReducer,
    undefined,
    undefined);

export default store;