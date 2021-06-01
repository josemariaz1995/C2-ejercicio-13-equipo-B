import { facturas } from "../datos/facturas.js";

const main = () => {
  const cuerpoTabla = document.querySelector(".cuerpo-tabla");

  const pieTabla = document.querySelector(".pie-tabla");

  const moldeHijos = Array.from(document.querySelectorAll(".filaMolde > td"));

  console.log(moldeHijos);

  const llamadaClase = (clase) =>
    moldeHijos.filter((factura) => factura.className.includes(clase))[0];

  const moldeObjeto = {
    numero: llamadaClase("numFila"),
    fecha: llamadaClase("fechaFila"),
    concepto: llamadaClase("conceptofila"),
    base: llamadaClase("baseFila"),
    iva: llamadaClase("ivaFila"),
    total: llamadaClase("totalFila"),
    estado: llamadaClase("estadoFila"),
    vence: llamadaClase("venceFila"),
  };
  const creacionFila = () => {
    for (const factura of facturas) {
      return;
    }
  };

  console.log(moldeObjeto);
};

main();
