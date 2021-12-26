import React from "react";

function ButtonRewind(props) {
  return (
    <button
      className="button-rewind"
      id={props.id}
      onClick={props.onClick}
      disabled={props.moveNum.length === props.id ? false : true}
    >
      {props.id}
    </button>
  );
}

export default ButtonRewind;
