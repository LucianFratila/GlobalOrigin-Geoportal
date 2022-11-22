const ButtonCtrl = (props) => (
  <button
    type={props.type}
    className={props.className}
    onClick={props.handleClick ? props.handleClick : ()=> {}}
  >
    {props.label}
  </button>
)

export default ButtonCtrl