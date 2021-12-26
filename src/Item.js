import "./Item.css";

function Item(props) {
  return (
    <div
      className="game-container--element"
      id={props.id}
      onClick={(event) => props.onClick(event)}
    >
      {props.value === "o" && <div className="o">O</div>}
      {props.value === "x" && <div className="x">X</div>}
    </div>
  );
}

export default Item;
