import { combineReducers } from "redux";

import auth from "./auth/reducer";
import { reducer as user } from "./user";

const reducers = combineReducers({
  auth,
  user
});

export default reducers;
