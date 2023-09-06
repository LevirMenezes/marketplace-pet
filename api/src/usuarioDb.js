import { usuariosColecao } from "./dbConnect.js";

class UsuarioController {
  static async obterUsuarios(req, res) {
    try{
      const usuarios = await usuariosColecao.find().toArray();

      return res.status(200).json({ usuarios: usuarios });
    } catch (e) {
      return res.status(500).json({ erro: e.message, tipo: e.name })
    }
  }

  // post - /usuario  { "nome": "Levir", "email": "levir@gmail.com", "senha": "senha"}
  static async adicionarUsuario(req, res) {
    try {
      const nome  = String(req.body.nome);
      const email = String(req.body.email).toLowerCase();
      const senha = String(req.body.senha);

      let usuario = await usuariosColecao.findOne({
        email: email
      });

      if (usuario)
        throw new Error("Esse email já está cadastrado na base de dados!")

      const resultado = await usuariosColecao.insertOne({
        nome:  nome,
        email: email,
        senha: senha
      });

      usuario = await usuariosColecao.findOne({
        email: email
      });

      return res.status(200).json({ mensagem: "Usuario inserido com sucesso na base de dados.", novoUsuairo: usuario });
    } catch (e) {
      return res.status(500).json({ erro: e.message, tipo: e.name })
    }
  }

  // get usuario?email=levir@gmail.com
  static async encontrarUsuario(req, res) {
    try {
      const email = String(req.query.email).toLowerCase();

      const usuario = await usuariosColecao.findOne({
        email: email
      });

      if (!usuario)
        return res.status(404).json({ erro: `Não foi encontrado nenhum usuário com esse email: ${email}! \nVerifique o email e tente novamente.`})

      return res.status(200).json({ mensagem: "Usuario encontrado com sucesso!", usuario: usuario});
    } catch (e) {
      return res.status(500).json({ erro: e.message, tipo: e.name })
    }
  }
  // put - /usuario { "nome": "Levir", "email": "levir@gmail.com", "senha": "senha"}
  static async atualizarUsuario(req, res) {
    try {
      const nome  = String(req.body.nome);
      const email = String(req.body.email).toLowerCase();
      const senha = String(req.body.senha);

      let usuario = await usuariosColecao.findOne({
        email: email
      })

      if (!usuario)
        throw new Error(`Esse email não corresponde a nenhum usuário cadastrado! \nPor favor, verifique o email e tente novamente.`)

      const atualizacao = await usuariosColecao.updateOne(
        {
          email: email
        },
        {
          $set: { nome: nome, senha: senha },
        }
      );

      usuario = await usuariosColecao.findOne({
        email: email
      })

      return res.status(200).json({ mensagem: "Usuario atualizado com sucesso!", usuario: usuario })
    } catch (e) {
      return res.status(500).json({ erro: e.message, tipo: e.name })
    }
  }
  // post usuario/del { "nome": "levir"}
  static async excluirUsuario(req, res) {
    try {
      const email = String(req.body.email).toLowerCase();

      let usuario = await usuariosColecao.findOne({
        email: email
      });

      if (!usuario)
        throw new Error("Esse email não corresponde a nenhum usuário cadastrado!\nVerifique o email e tente novamente.");

      const resultado = await usuariosColecao.deleteOne({
        email: email
      });

      return res.status(200).json({ mensagem: `O registro com a propriedade nome: ${usuario.nome} foi excluído com sucesso!` });
    } catch (e) {
      return res.status(500).json({ erro: e.message, tipo: e.name })
    }
  }

}

export default UsuarioController;
