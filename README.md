## 프로젝트 목적(react-redux)
react-redux 및 redux toolkit 적용

## 설치
react-redux 설치
```shell
# npm 
npm install react-redux

#yarn
yarn add react-redux
```
redux-toolkit 설치
```shell
#npm 
npm install @reduxjs/toolkit

#yarn
yarn add @reduxjs/toolkit
```

## 기본 함수
  ### connect? : (mapStateToPros? : mapDispatchToProps?, mergeProps?, options?)
   components들을 store에 연결시켜 준다.
   
   #### mapStateToProps? : (state:Object, ownProps?:Object) => Object
      - store에서 state를 가져와 components의 props에 넣는다.
      - 첫번째 파라미터는 Redux store에서 온 state
      - 두번째 파라미터는 components의 props
    ```javascript
      import {connect} from "react-redux";
      ...
      function mapStateToProps(state, ownProps) {return {toDos:state}}
      
      export default connect(mapStateToProps)(Component)
    ```
   ### mapDispatchToProps? (dispatch:function, ownProps?:Object) => Object:
      - 첫번째 파라미터는 Redux store에서 온 dispatch
      - 두번쨰 파라미터는 components의 props
      ```javascript
        import {connect} from "react-redux";
        ...
        function mapStateToProps(state) {return {toDos:state}}

        function mapDispatchToProps(dispatch) {
          return {
            addToDo: (text) => dispatch(add(text)),
          };
        }
      
        export default connect(mapStateToProps,mapDispatchToProps)(Component)
        // mapDispatchToPros만 필요할 경우
        // export default connect(null,mapDispatchToProps)(Component)
      ```
   
## 예제
   ### Redux Toolkit 적용 전
   store변화에 따라 subscribe하고 store가 변경될때 모든게 다시 render하기 위해 index.js에 다음과 같이 `Provider, store` 추가
      ```javascript
        import React from "react";
        import ReactDOM from "react-dom";
        import App from "./components/App";
        import { Provider } from "react-redux";
        import store from "./store";
          
        ReactDOM.render(
          <Provider stroe={store}>
            <App />
          </Provider>,
          document.getElementById("root")
        );   
      ```
   [index.js]
        
      ```javascript
        import {createStore} from "redux";
        const ADD = "ADD"
         // action creator
         const addToDo = (text) => {
           return {
             type: ADD_TODO,
             text,
           };
         };
         const reducer = (state =[], action) => {
           switch(action.type) {
             case ADD:
               return [{text:action.text, id:Date.now() }, ...state];
             ...
             default: return state;
           }
         }
         const store = createStore(reducer);
         export const actionCreateors = {
           addToDo,
           deleteToDo,
         };
         export default store;
      ```
   [store.js]

   ### Redux Toolkit 적용 
    createAction() 적용
     ```javascript
       import {createStore} from "redux";
       import{createAction} from "@reduxjs/toolkit";
       const addToDo = createAction("ADD");
       const reducer = (state =[], action) => {
         switch(action.type) {
           case addToDo.type:
             return [{text:action.payload, id:Date.now() }, ...state];
           ...
           default: return state;
         }
       }
         
     ```
    createReducer() 적용 
      - createReducer에서 작업할때는 새로운 state를 리턴할 수 있고, state를 mutate 할 수 있다. 
      - return할 떄는 꼭 새로운 state여야 하고, state를 mutate할 때는 아무거도 return을 하지 않아야 한다.
      
     ```javascript
        import {createStore} from "redux";
        import{createAction} from "@reduxjs/toolkit";
        
        const addToDo = createAction("ADD");
        
        const reducer = createReducer([],{
          [addTodo] : (state,action) => {
            state.push({text:action.payload, id:Date.now() });
          }
          ...
        }
        ...
     ```    
    configureStore() / createSlice() 적용
     ```javascript
       import { createSlice, configureStore} from "@reduxjs/toolkit";
      
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

   ```
  

    
  
