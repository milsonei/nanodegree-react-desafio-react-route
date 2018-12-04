import React, { Component } from "react";

/**
 * Formulário para cadastro de novo usuário
 */
class Usuario extends Component {
  state = {
    usuario: {
      id: 0,
      nome: "",
      email: ""
    },
    hasInputChange: false
  };

  /**
   * Este método é chamado imediatamente após a atualização do componente.
   */
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasInputChange) {
      this.focusNome();
    }
  }
  /**
   * getDerivedStateFromPropsé chamado logo antes de chamar o método de renderização, tanto na montagem inicial quanto nas atualizações subseqüentes.
   * Ele deve retornar um objeto para atualizar o estado ou nulo para atualizar nada.
   * @param {object} nextProps
   * @param {object} prevState
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { match, dataSource } = nextProps;

    /**
     * Se estiver ocorrendo atualização dos inputs, o prevState será retornado
     */
    if (prevState.hasInputChange) {
      return prevState;
    }
    /**
     * Verifica se ocorreu mudança do identificador do usuário para efetuar nova pesquisa
     */
    if (parseInt(match.params.id) !== prevState.usuario.id) {
      const usr = dataSource(match.params.id);
      /**
       * Faz desestruração do objeto usuário recuperado
       */
      const { id, nome, email } = usr;
      return {
        usuario: {
          id,
          nome,
          email
        },
        onInputChange: false
      };
    }

    // Retorn null, caso nenhuma atualização seja necessária
    return null;
  }

  /**
   * componentDidMount é invocado imediatamente após um componente ser montado (inserido na árvore).
   * Inicialização que requer nós DOM deve ir aqui.
   * Se você precisar carregar dados de um endpoint remoto, este é um bom local para instanciar a solicitação de rede.
   */
  componentDidMount() {
    /**
     * Faz desestruração do objeto props
     */
    const { match, dataSource } = this.props;
    /**
     * Faz desestruração do objeto params de match
     */
    const { id } = match.params;
    /**
     * Recupera o usuário de acordo com o identificador passado na url
     */
    const usr = dataSource(id);

    this.setState({
      usuario: usr,
      hasInputChange: false
    });

    this.focusNome();
  }

  // Usa `ref` callback para armazenar uma referência para o elemento text input DOM em um campo de instância (por exemplo, this.inputNome).
  setNomeRef = element => {
    this.inputNome = element;
  };

  /**
   * Redireciona o foco do elemente input usando a raw DOM API
   */
  focusNome = () => {
    // Focus the text input using the raw DOM API
    if (this.inputNome) this.inputNome.focus();
  };
  /**
   * Envia os dados para gravação
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.onAdicionarUsuario(this.state.usuario);
    /**
     * Redireciona para a lista de usuários
     */
    this.props.history.push("/usuarios");
  };
  /**
   * Atualiza o state com os dados inputados pelo usuário
   */
  handleChange = e => {
    e.preventDefault();
    /**
     * Faz desestruturação do input
     */
    const { name, value } = e.target;
    /**
     * Atualiza o estado com o valor fornecido pelo input
     */
    this.setState(oldState => ({
      usuario: {
        ...oldState.usuario,
        [name]: value
      },
      hasInputChange: true
    }));
  };

  /**
   * Verifica se todos os campos estão vazios
   */
  vazio = () =>
    this.state.usuario.nome === "" && this.state.usuario.email === "";

  /**
   * Renderiza um formulário
   */
  render() {
    const usuario = this.state.usuario;
    /**
     * Desestruturação do objeto usuário
     */
    const { nome, email } = usuario;
    /**
     * Desestruturação do props afim de recuperar o objeto match
     */
    const { match } = this.props;
    /**
     * Desestruturação do objeto params contido em match
     */
    const { id } = match.params;

    return usuario.id > 0 ? (
      <div>
        <h2>Usuário {id}</h2>
        <p>Nome: {nome}</p>
        <p>email: {email}</p>
      </div>
    ) : (
      <div>
        <h1>Novo Usuário</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="nome"
            ref={this.setNomeRef}
            placeholder="nome"
            type="text"
            value={nome}
            onChange={this.handleChange}
          />
          <br />
          <input
            name="email"
            placeholder="email"
            type="email"
            value={email}
            onChange={this.handleChange}
          />
          <br />
          <button disabled={this.vazio()}>Salvar</button>
        </form>
      </div>
    );
  }
}

export default Usuario;
