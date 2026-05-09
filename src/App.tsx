import { TableList, Formulario } from "./componentes";
import useDatos from "./hooks/useDatos";
import { useState } from "react";
import "./App.css";

interface Dato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo: string;
}

function App() {
  const { datos, insertar, actualizar, eliminar } = useDatos();

  const [datoEditar, setDatoEditar] =
    useState<Dato | null>(null);

  const [filtro, setFiltro] =
    useState<string>("Todos");

  const [orden, setOrden] =
    useState<string>("nombre");

  const filtrados = datos
    .filter((item) =>
      filtro === "Todos"
        ? true
        : item.tipo === filtro
    )
    .sort((a, b) => {
      if (orden === "precio") return a.precio - b.precio;
      return a.nombre.localeCompare(b.nombre);
    });

  const totalInventario = datos.reduce(
    (acc, item) => acc + item.precio * item.stock,
    0
  );

  return (
    <div>
      <h1>Farmacia</h1>

      <Formulario
        insertar={insertar}
        actualizar={actualizar}
        datoEditar={datoEditar}
      />

      <hr />

      <select onChange={(e) => setFiltro(e.target.value)}>
        <option>Todos</option>
        <option>Analgésico</option>
        <option>Antihistamínico</option>
        <option>Antiinflamatorio</option>
        <option>Respiratorios</option>
      </select>

      <select onChange={(e) => setOrden(e.target.value)}>
        <option value="nombre">Ordenar Nombre</option>
        <option value="precio">Ordenar Precio</option>
      </select>

      <h2>Valor Total Inventario: ${totalInventario}</h2>

      {filtrados.map((dato) => (
        <TableList
          key={dato.id}
          id={dato.id}
          nombre={dato.nombre}
          descripcion={dato.descripcion}
          precio={dato.precio}
          stock={dato.stock}
          tipo={dato.tipo}
          onEditar={() => setDatoEditar(dato)}
          onEliminar={() => eliminar(dato.id)}
        />
      ))}
    </div>
  );
}

export default App;