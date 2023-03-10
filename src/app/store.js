import { createStore, combineReducers } from "redux";
import TaskEvent from "../components/TaskEvent";
import addCartEvent from "../components/addCartEvent";

const appReducer = combineReducers({
    taskReducer: TaskEvent,
    cartReducer: addCartEvent
});

const store = createStore(
    appReducer,
    undefined,
    undefined);

export default store;