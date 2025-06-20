import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducers";

const thunk_middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...thunk_middleware))
);

export default store;
