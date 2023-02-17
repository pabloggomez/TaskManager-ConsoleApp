/**
 *  _listado:
 *      {   'uuid-765132-765164-2': { id:12 , desc: asd, completadoEn:92231 }  },
 */
const colors = require("colors");

const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(listado = this.listadoArr) {
    listado.forEach((tarea, i) => {
      const index = `${i + 1}`;
      console.log(
        colors.green(index + "."),
        tarea.desc,
        "::",
        !tarea.completadoEn
          ? "Pendiente".red
          : "Completado".green + " en: " + colors.blue(tarea.completadoEn)
      );
    });
  }

  listadoCompletadas() {
    const arrCompletadas = this.listadoArr.filter((tarea) => {
      return tarea.completadoEn;
    });
    this.listadoCompleto(arrCompletadas);
  }

  listadoPendientes() {
    const arrPendientes = this.listadoArr.filter((tarea) => {
      return !tarea.completadoEn;
    });

    this.listadoCompleto(arrPendientes);
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
