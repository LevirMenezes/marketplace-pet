import { MongoClient, ServerApiVersion } from "mongodb";

const cliente = new MongoClient("mongodb://localhost:27017", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let usuariosColecao;

try
{
  await cliente.connect();

  const db = await cliente.db("marketplace");
  usuariosColecao = db.collection("usuario");

  console.log("Conectado ao banco com sucesso.");
} catch (erro) {
  console.log(erro);
}

export { usuariosColecao };
