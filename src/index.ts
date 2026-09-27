import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI_DB = process.env.URI_DB || "";

const client = new MongoClient(URI_DB);

const db = client.db("biblioteca");
const libros = db.collection("libros");

const args = process.argv.slice(2);
const action = args[0];

interface IBook {
  titulo: string;
  autor: string;
  precio: number;
  stock: number;
}

const createBook = async () => {
  try {
    const titulo = args[1];
    const autor = args[2];
    const precio = Number(args[3]);
    const stock = Number(args[4]);

    if (!titulo || !autor || isNaN(precio) || isNaN(stock)) {
      console.log('Uso: node index.js create "Título" "Autor" precio stock');
      return;
    }

    const newBook: IBook = {
      titulo,
      autor,
      precio,
      stock,
    };

    const result = await libros.insertOne(newBook);

    console.log("Libro creado correctamente:");
    console.log({
      _id: result.insertedId,
      ...newBook,
    });
  } catch (error) {
    console.log("Error al crear el libro:", error);
  }
};

const getBooks = async () => {
  try {
    const books = await libros.find().toArray();

    if (books.length === 0) {
      console.log("No hay libros almacenados.");
      return;
    }

    console.log("Libros:");

    books.forEach((book) => {
      console.log(book);
    });
  } catch (error) {
    console.log("Error al obtener los libros:", error);
  }
};

const updateBook = async () => {
  try {
    const id = args[1];
    const titulo = args[2];
    const autor = args[3];
    const precio = Number(args[4]);
    const stock = Number(args[5]);

    if (!id || !titulo || !autor || isNaN(precio) || isNaN(stock)) {
      console.log('Uso: node index.js update ID "Título" "Autor" precio stock');
      return;
    }

    if (!ObjectId.isValid(id)) {
      console.log("ObjectId inválido.");
      return;
    }

    const result = await libros.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          titulo,
          autor,
          precio,
          stock,
        },
      },
      {
        returnDocument: "after",
      },
    );

    if (!result) {
      console.log("Libro no encontrado.");
      return;
    }

    console.log("Libro actualizado correctamente:");
    console.log(result);
  } catch (error) {
    console.log("Error al actualizar el libro:", error);
  }
};

const deleteBook = async () => {
  try {
    const id = args[1];

    if (!id) {
      console.log("Debes proporcionar el ID del libro.");
      return;
    }

    if (!ObjectId.isValid(id)) {
      console.log("ObjectId inválido.");
      return;
    }

    const result = await libros.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      console.log("Libro no encontrado.");
      return;
    }

    console.log("Libro eliminado correctamente.");
  } catch (error) {
    console.log("Error al eliminar el libro:", error);
  }
};

const main = async () => {
  try {
    await client.connect();

    console.log("Conectado a MongoDB correctamente.");

    switch (action) {
      case "create":
        await createBook();
        break;

      case "read":
        await getBooks();
        break;

      case "update":
        await updateBook();
        break;

      case "delete":
        await deleteBook();
        break;

      default:
        console.log(`
Comandos disponibles:

create "Título" "Autor" precio stock
read
update ID "Título" "Autor" precio stock
delete ID
        `);
    }
  } catch (error) {
    console.log("Error:", error);
  } finally {
    await client.close();
  }
};

main();
