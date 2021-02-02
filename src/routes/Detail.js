import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { remove } from "./store";

function Detail({ toDo, delBtnClick }) {
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at : {toDo?.id}</h5>
      <Link to="/">
        <button onClick={delBtnClick}>DEL</button>
        <button>이전</button>
      </Link>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { toDo: state.find((toDo) => toDo.id === parseInt(id)) };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return {
    delBtnClick: () => dispatch(remove(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
