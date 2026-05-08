import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

function useDatos() {
  const [datos, setDatos] = useState([]);

  const traer = async () => {
    const { data } = await supabase.from("farmacia").select("*");
    if (data) setDatos(data);
  };

  const insertar = async (nombre, descripcion, precio, stock, tipo) => {
    await supabase
      .from("farmacia")
      .insert([{ nombre, descripcion, precio, stock, tipo }]);

    traer();
  };

  const actualizar = async (id, nombre, descripcion, precio, stock, tipo) => {
    await supabase
      .from("farmacia")
      .update({ nombre, descripcion, precio, stock, tipo })
      .eq("id", id);

    traer();
  };

  const eliminar = async (id) => {
    await supabase.from("farmacia").delete().eq("id", id);
    traer();
  };

  useEffect(() => {
    traer();
  }, []);

  return {
    datos,
    insertar,
    actualizar,
    eliminar,
  };
}

export default useDatos;