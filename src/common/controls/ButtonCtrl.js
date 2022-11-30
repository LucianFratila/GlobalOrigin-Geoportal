const ButtonCtrl = (props) => (
  <button
    type={props.type}
    className=' bg-green-600 hover:bg-green-700 w-full p-3 rounded-md'
    onClick={props.handleClick ? props.handleClick : ()=> {}}
  >
    {props.label}
  </button>
)

export default ButtonCtrl

