const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirm,
  listadoTareasCompletarChkList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        //console.log(tareas._listado);
        break;
      case "3":
        tareas.listadoCompletadas();
        break;
      case "4":
        tareas.listadoPendientes();
        break;
      case "5":
        const ids = await listadoTareasCompletarChkList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const confirmDelete = await confirm(
            "¿Está seguro de que desea continuar con la eliminación?"
          );
          confirmDelete
            ? tareas.borrarTarea(id) && console.log("Tarea Eliminada.")
            : console.log("Cancelando eliminación...");
        }
        break;
      case "0":
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
