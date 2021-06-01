import { facturas } from "../datos/facturas.js";

const extraerEstado = (estado) => (estado ? "Abonada" : "Pendiente");

const calcularTotal = (base, iva) => base + iva;

const extraerVence = (estado, fecha, vencimiento) => {
  if (estado) {
    return "-";
  } else {
    return `${extraerFecha(vencimiento)} hace ${Math.floor(
      (Date.now() - vencimiento) / (1000 * 3600 * 24)
    )} dias`;
  }
};

const extraerFecha = (fecha) => {
  const date = new Date(fecha);
  const fechaDiaMesAnyo = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return fechaDiaMesAnyo;
};

const extraerConcepto = () => {};

const calcularIva = (base, iva) => (base * iva) / 100;

const calcularIvaTabla = (ivatotal) => {};

const calcularToltalTabla = (totaltabla) => {};

const calcularBaseTabla = (basetabla) => {};
const baseTotal = [];
const ivaTotal = [];
const totalTabla = [];

const main = () => {
  const cuerpoTabla = document.querySelector(".cuerpo-tabla");

  const facturasFiltradas = facturas.filter(
    (factura) => factura.tipo === "ingreso"
  );

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
  } of facturasFiltradas) {
    baseTotal.push(base);
    ivaTotal.push(tipoIva);
    totalTabla.push(base + (tipoIva * base) / 100);

    const filaClonada = fila.cloneNode();
    filaClonada.classList.remove("d-none");
    moldeObjeto.base.textContent = `${base}€`;
    moldeObjeto.numero.textContent = numero;
    moldeObjeto.fecha.textContent = extraerFecha(fecha);
    moldeObjeto.concepto.textContent = concepto;
    moldeObjeto.iva.textContent = `${calcularIva(
      base,
      tipoIva
    )}€ (${tipoIva} %)`;

    
    moldeObjeto.vence.textContent = extraerVence(abonada, fecha, vencimiento);
   

    if (extraerEstado(abonada) !== "Abonada") {
      moldeObjeto.estado.classList.add("no-abonada");
      moldeObjeto.estado.classList.remove("abonada");
    } else {
      moldeObjeto.estado.classList.remove("no-abonada");
      moldeObjeto.estado.classList.remove("table-success");
      moldeObjeto.estado.classList.add("abonada");
    }
    moldeObjeto.vence.textContent = extraerVence(abonada, fecha, vencimiento);
    if (extraerVence(abonada, fecha, vencimiento) !== "-") {
      moldeObjeto.vence.classList.add("no-abonada");
      moldeObjeto.vence.classList.remove("abonada");
    } else {
      moldeObjeto.vence.classList.remove("no-abonada");
      moldeObjeto.vence.classList.remove("table-success");
      moldeObjeto.vence.classList.add("abonada");
    }
    moldeObjeto.total.textContent = `${calcularTotal(
      base,
      (base * tipoIva) / 100
    )}€`;


    creacionFila(cuerpoTabla, filaClonada, moldeObjeto);
  }
};

console.log(totalTabla, baseTotal, ivaTotal);

const creacionFila = (cuerpo, fila, columnaObjeto) => {
  for (const [propiedad, valor] of Object.entries(columnaObjeto)) {
    fila.append(valor.cloneNode(true));
  }

  cuerpo.append(fila);
};

main();
