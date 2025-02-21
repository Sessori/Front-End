import './CampoTexto.css'

const CampoTexto = (props) => {
  return (
    <div class="Campo-Texto">
      <label>{props.label}</label>
      <input type="text" placeholder={props.placeholder}/>
    </div>
  )
}

export default CampoTexto