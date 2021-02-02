import { createStore } from "redux";
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

/* 
redux toolkit 사용전 

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};
 
const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== parseInt(action.payload));
    default:
      return state;
  }
};
*/

// redux-toolkit 사용
// createReducer는 새로운 state를 return할수도 있고 기존의 state를 mutate(변경)할 수도 있다.
// redux-toolkit에서는 기존의 state를 mutate하면 뒤에서 알아서 새로운 state로 변형해서 return 해준다.
// 뭔가를 return 할때는 반드시 새로운 state여야만 한다. mutate 할 때에는 리턴하지 않는다.
/* redux-toolkit- creatAction, creatReducer 사용
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter((toDo) => toDo.id !== parseInt(action.payload)),
});
 */

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== parseInt(action.payload)),
  },
});

/* redux-toolkit 사용전 
const store = createStore(reducer);
 */

const store = configureStore({ reducer: toDos.reducer });

/* redux-toolkit - createSlice 사용전 
export const actionCreateors = {
  addToDo,
  deleteToDo,
};
 */
export const { add, remove } = toDos.actions;

export default store;
