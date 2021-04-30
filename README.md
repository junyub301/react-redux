## 프로젝트 목적(react-redux)
react-redux 공부

## 설치
```shell
# npm 
npm install react-redux

#yarn
yarn add react-redux
```

## 기본 함수
  ### connect()
  > components들을 store에 연결시켜 준다.
   
   #### mapStateToProps? : (state, ownProps?) => Object
      - store에서 state를 가져와 components의 props에 넣는다.
      - 첫번째 파라미터는 Redux store에서 온 state
      - 두번째 파라미터 components의 props
    ```
      import {connect} from "react-redux";
      ...
      function mapStateToProps(state, ownProps) {return {toDos:state}}
      
      export default connect(mapStateToProps)(Component)
    ```

## 예제

```javascript
import {createStore} from "redux";

const ADD_TODO = "ADD_TODO";

// action creator
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const reducer = (state =[], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [{text:action.text, id:Date.now() }, ...state];
    ...
    default: return state;
  }
}

const store = createStore(reducer);
export default store
```
[store.js]

store변화에 따라 subscribe하고 store가 변경될때 모든게 다시 render하기 위해 index.js에 다음과 같이 ```Provider, store```추가
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

