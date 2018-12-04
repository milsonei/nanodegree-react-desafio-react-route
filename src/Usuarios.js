import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import Usuario from "./Usuario";
/**
 * Pàgina Usuários
 */
class Usuarios extends Component {
  /**
   * Lista de Usuários
   */
  state = {
    usuarios: [
      { id: 1, nome: "Maria Leite", email: "maria.leite@kmail.com" },
      { id: 2, nome: "Marcos Silva", email: "marcos.silva@kmail.com" },
      { id: 3, nome: "André Lara", email: "andre.lara@kmail.com" },
      { id: 4, nome: "Carlos Telus", email: "carlos.telus@kmail.com" }
    ]
  };
  /**
   * Recupera um objeto vazio
   */
  novo = () => ({ id: 0, nome: "", email: "" });

  /**
   * Recupera um usuário pelo ud
   */
  recuperar = id => {
    if (id === "novo") return this.novo();
    const usr = this.state.usuarios.find(usr => usr.id === parseInt(id));
    return usr || this.novo();
  };

  /**
   * Grava os dados do novo usuário no estado
   */
  adicionarUsuario = usr => {
    usr.id = this.state.usuarios.length + 1;
    if (!this.existe(usr.email)) {
      this.setState(oldState => ({
        usuarios: [...oldState.usuarios, usr]
      }));
    } else {
      console.log("Existe um usuário com este mesmo e-mail");
    }
  };
  /**
   * Verifica se determinado email já foi cadastrado
   */
  existe = email => {
    var usr = this.state.usuarios.find(usr => usr.email === email);
    if (usr === undefined) return false;
    return true;
  };
  /**
   * Função comparativa para ordenação de uma lista
   * @param {object} a
   * @param {object} b
   */
  comparar = (a, b) => {
    if (a.nome > b.nome) {
      return 1;
    }
    if (a.nome < b.nome) {
      return -1;
    }
    // a must be equal to b
    return 0;
  };

  /**
   * Renderiza o compomente
   */
  render() {
    /**
     * Desestruturação do objeto props para capturar o objeto match
     */
    const { match } = this.props;
    return (
      <div>
        <h1>Usuários</h1>
        <strong>Selecione um usuário</strong>
        <ul>
          {this.state.usuarios.sort(this.comparar).map(usr => (
            <li key={`usuario-${usr.id}`}>
              <Link to={`${match.url}/${usr.id}`}>{usr.nome}</Link>
            </li>
          ))}
          <li style={{ paddingTop: 10 }}>
            <Link to={`${match.url}/novo`}>Novo Usuário</Link>
          </li>
        </ul>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <Usuario
              {...props}
              dataSource={this.recuperar}
              onAdicionarUsuario={this.adicionarUsuario}
            />
          )}
        />
      </div>
    );
  }
}
export default Usuarios;
