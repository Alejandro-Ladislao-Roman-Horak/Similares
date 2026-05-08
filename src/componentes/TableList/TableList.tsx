import "./TableList.css";

interface Props {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo: string;
  onEditar: () => void;
  onEliminar: () => void;
}

function TableList({
  id,
  nombre,
  descripcion,
  precio,
  stock,
  tipo,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <div className={`table-list ${stock < 5 ? "stock-bajo" : ""}`}>
      <p>{id}</p>
      <p>{nombre}</p>
      <p className="descripcion">{descripcion}</p>
      <p>${precio}</p>
      <p>{stock}</p>
      <p>{tipo}</p>

      <div className="acciones">
        {stock < 5 && (
          <span className="alerta">⚠ Stock Bajo</span>
        )}

        <button onClick={onEditar}>Editar</button>

        <button
          onClick={() => {
            const confirmar = window.confirm(
              `¿Seguro que deseas eliminar ${nombre}?`
            );

            if (confirmar) onEliminar();
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TableList;