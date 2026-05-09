import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

interface Dato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipo: string;
}

function useDatos() {
  const [datos, setDatos] = useState<Dato[]>([]);

  const traer = async () => {
    const { data } = await supabase
      .from("farmacia")
      .select("*");

    if (data) setDatos(data);
  };

  const insertar = async (
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    tipo: string
  ) => {
    await supabase
      .from("farmacia")
      .insert([{ nombre, descripcion, precio, stock, tipo }]);

    traer();
  };

  const actualizar = async (
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    stock: number,
    tipo: string
  ) => {
    await supabase
      .from("farmacia")
      .update({ nombre, descripcion, precio, stock, tipo })
      .eq("id", id);

    traer();
  };

  const eliminar = async (id: number) => {
    await supabase
      .from("farmacia")
      .delete()
      .eq("id", id);

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