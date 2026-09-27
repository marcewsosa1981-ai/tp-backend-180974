# CRUD de Libros con MongoDB

Aplicación de consola desarrollada con **TypeScript** y **MongoDB** que permite administrar una colección de libros mediante operaciones CRUD.

El proyecto utiliza el paquete oficial `mongodb` y `ObjectId` para identificar los documentos almacenados en la base de datos.

---

## Funcionalidades

La aplicación permite realizar las siguientes operaciones:

- **Crear** un libro.
- **Leer** y mostrar todos los libros.
- **Actualizar** un libro mediante su `ObjectId`.
- **Eliminar** un libro mediante su `ObjectId`.

Cada libro contiene:

- `titulo`
- `autor`
- `precio`
- `stock`

---

## Tecnologías utilizadas

- **TypeScript**
- **Node.js**
- **MongoDB**
- **MongoDB Driver**
- **dotenv**

---

## Estructura del proyecto

```text
CRUD-LIBROS/
│
├── index.ts
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
```

---

## Configuración

Primero instalar las dependencias:

```bash
npm install
```

El proyecto utiliza una variable de entorno para la conexión con MongoDB.

Crear un archivo `.env`:

```env
URI_DB=mongodb://localhost:27017
```

La aplicación utiliza:

```text
Base de datos: biblioteca
Colección: libros
```

---

## Ejecución

Una vez configurado MongoDB, ejecutar la aplicación mediante los comandos correspondientes.

### Crear un libro

```bash
node index.js create "El Principito" "Antoine de Saint-Exupéry" 15000 10
```

Esto crea un documento con:

```text
Título: El Principito
Autor: Antoine de Saint-Exupéry
Precio: 15000
Stock: 10
```

MongoDB genera automáticamente un `ObjectId` para el libro.

---

### Leer los libros

```bash
node index.js read
```

Muestra todos los libros almacenados en la colección `libros`.

Ejemplo:

```text
{
  _id: new ObjectId('68d7a123456789abcdef1234'),
  titulo: 'El Principito',
  autor: 'Antoine de Saint-Exupéry',
  precio: 15000,
  stock: 10
}
```

---

### Actualizar un libro

Para actualizar un libro es necesario utilizar su `ObjectId`.

```bash
node index.js update ID "El Principito" "Antoine de Saint-Exupéry" 18000 15
```

Por ejemplo:

```bash
node index.js update 68d7a123456789abcdef1234 "El Principito" "Antoine de Saint-Exupéry" 18000 15
```

La aplicación modifica los datos y muestra el libro actualizado.

---

### Eliminar un libro

También se necesita el `ObjectId`:

```bash
node index.js delete ID
```

Ejemplo:

```bash
node index.js delete 68d7a123456789abcdef1234
```

Si el libro existe, se elimina de la colección y se muestra un mensaje confirmando la operación.

---

## Operaciones CRUD

El proyecto utiliza las operaciones principales de MongoDB:

| Operación | MongoDB              |
| --------- | -------------------- |
| Create    | `insertOne()`        |
| Read      | `find()`             |
| Update    | `findOneAndUpdate()` |
| Delete    | `deleteOne()`        |

---

## ObjectId

Cada documento almacenado en MongoDB posee un identificador único llamado `ObjectId`.

Para trabajar con los IDs recibidos desde la terminal se utiliza:

```typescript
import { MongoClient, ObjectId } from "mongodb";
```

Antes de realizar una actualización o eliminación se verifica que el ID sea válido:

```typescript
ObjectId.isValid(id);
```

Y posteriormente se convierte:

```typescript
new ObjectId(id);
```

---

## Objetivo del proyecto

El objetivo es comprender cómo implementar un **CRUD utilizando MongoDB directamente desde una aplicación de consola desarrollada con TypeScript**.

El proyecto permite practicar:

- Conexión con MongoDB.
- Uso de `MongoClient`.
- Creación de documentos.
- Consulta de documentos.
- Actualización de documentos.
- Eliminación de documentos.
- Uso de `ObjectId`.
- Manejo de argumentos de línea de comandos.
- Uso de variables de entorno con `dotenv`.
- Manejo básico de errores.

---

## Autor

**Marcelo Walter Sosa**

Proyecto realizado como práctica de **TypeScript + MongoDB + Node.js**.

```

```
