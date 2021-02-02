import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../componets/ToDo";
import { add } from "./store";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// Redux state로부터 home(component)에 prop으로써 전달한다.
function mapStateToProps(state) {
  return { toDos: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(add(text)),
  };
}

// connect()는 Home으로 보내는 prpos에 추가될 수 있도록 허용해준다.
// mapState는 필요하지 않고 mapDispatch만 필요할 경우는 connect(null,mapDispatchToPros)로 사용한다.
export default connect(mapStateToProps, mapDispatchToProps)(Home);
