import express from 'express';
import bodyParser from 'body-parser';
import './dbConnect.js';
import UsuarioController from './usuarioDb.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json("Hello World!"));

app.get("/usuarios/", UsuarioController.obterUsuarios);

app.get("/usuario", UsuarioController.encontrarUsuario);

app.post("/usuario", UsuarioController.adicionarUsuario);

app.put("/usuario", UsuarioController.atualizarUsuario);

app.delete("/usuario", UsuarioController.excluirUsuario);

app.listen(port, () => console.log(`o servidor está ouvindo na porta ${port}`));

// post - /usuario  { "nome": "Levir", "email": "levir@gmail.com", "senha": "senha"}
// get usuario?email=levir@gmail.com
// put - /usuario { "nome": "Levir", "email": "levir@gmail.com", "senha": "senha"}
// post usuario/del { "nome": "levir"}

