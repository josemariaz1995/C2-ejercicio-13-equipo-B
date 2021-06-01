import { facturas } from "../datos/facturas.js";

const extraerEstado = () => {};

const calcularTotal = (base, iva) => base + iva;

const extraerVence = () => {};

const extraerFecha = (fecha) => {
  const date = new Date(fecha);
  const fechaDiaMesAnyo = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return fechaDiaMesAnyo;
};

const extraerConcepto = () => {};

const extraerIva = (base, iva) => (base * iva) / 100;

const calcularIvaTabla = (ivatotal) => {};

const calcularToltalTabla = (totaltabla) => {};

const calcularBaseTabla = (basetabla) => {};

const main = () => {
  const cuerpoTabla = document.querySelector(".cuerpo-tabla");

  const pieTabla = document.querySelector(".pie-tabla");

  const fila = document.querySelector(".filaMolde");

  const moldeHijos = Array.from(document.querySelectorAll(".filaMolde > td"));

  const llamadaClase = (clase) =>
    moldeHijos
      .filter((factura) => factura.className.includes(clase))[0]
      .cloneNode();

  const moldeObjeto = {
    numero: llamadaClase("numFila"),
    fecha: llamadaClase("fechaFila"),
    concepto: llamadaClase("conceptoFila"),
    base: llamadaClase("baseFila"),
    iva: llamadaClase("ivaFila"),
    total: llamadaClase("totalFila"),
    estado: llamadaClase("estadoFila"),
    vence: llamadaClase("venceFila"),
  };
  for (const {
    numero,
    fecha,
    vencimiento,
    concepto,
    base,
    tipoIva,
    tipo,
    abonada,
  } of facturas) {
    const filaClonada = fila.cloneNode();
    filaClonada.classList.remove("d-none");
    moldeObjeto.base.textContent = `${base} €`;
    moldeObjeto.numero.textContent = numero;
    creacionFila(cuerpoTabla, filaClonada, moldeObjeto);
  }
};

const creacionFila = (cuerpo, fila, columnaObjeto) => {
  for (const [propiedad, valor] of Object.entries(columnaObjeto)) {
    fila.append(valor.cloneNode(true));
  }

  cuerpo.append(fila);
};

main();
