import { useState, useEffect } from "react";
import "./Formulario.css";

interface Dato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo: string;
}

interface Props {
  insertar: (
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    tipo: string
  ) => void;

  actualizar: (
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    tipo: string
  ) => void;

  datoEditar: Dato | null;
}

function Formulario({
  insertar,
  actualizar,
  datoEditar,
}: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    if (datoEditar) {
      setNombre(datoEditar.nombre);
      setDescripcion(datoEditar.descripcion);
      setPrecio(datoEditar.precio);
      setStock(datoEditar.stock);
      setTipo(datoEditar.tipo);
    }
  }, [datoEditar]);

  const manejarSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!nombre.trim()) {
      return alert("Nombre requerido");
    }

    if (precio <= 0) {
      return alert("Precio mayor a 0");
    }

    if (stock < 0) {
      return alert("Stock no puede ser negativo");
    }

    if (datoEditar) {
      actualizar(
        datoEditar.id,
        nombre,
        descripcion,
        precio,
        stock,
        tipo
      );
    } else {
      insertar(
        nombre,
        descripcion,
        precio,
        stock,
        tipo
      );
    }

    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setStock(0);
    setTipo("");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) =>
          setPrecio(Number(e.target.value))
        }
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(Number(e.target.value))
        }
      />

      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />

      <button type="submit">
        {datoEditar ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default Formulario;