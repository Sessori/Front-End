import CampoTexto from "../CampoTexto"

const Formulario = () => {
  return (
    <section>
      <form>
        <CampoTexto label="Codigo" placeholder="Codigo" />
        <CampoTexto label="Nome" placeholder="Digite seu nome" />
        <CampoTexto label="Sobrenome" placeholder="Digite seu sobrenome" />
        <CampoTexto label="Email" placeholder="Digite seu e-mail" />
        <CampoTexto label="Senha" placeholder="Digite a senha temporaria" />
      </form>
    </section>
  )
}

export default Formulario
