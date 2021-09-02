const { createStudentDatabase, getStudents, getStudent, updateStudent, deleteStudent } = require("./controllers/db.controllers");

const [accion, ...params] = process.argv.slice(2);


const main = async() => {

    switch (accion) {
        case 'nuevo':
            if (params.length === 4) {
                const { nombre } = await createStudentDatabase(params)
                console.log(`Estudiante ${nombre} agregado correctamente`);
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        case 'consulta':
            if (params.length === 0) {
                const students = await getStudents();
                console.log(students);
            } else {
                console.log('No es necesario enviar parámetros');
            }
            break;
        case 'rut':
            if (params.length === 1) {
                const student = await getStudent(params);
                console.log(student);
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        case 'editar':
            if (params.length === 4) {
                const { nombre } = await updateStudent(params)
                console.log(`Estudiante ${nombre} actualizado correctamente`);
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        case 'eliminar':
            if (params.length === 1) {
                const { nombre } = await deleteStudent(params);
                console.log(`Estudiante ${nombre} eliminado correctamente`);
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        default:
            console.log('Acción no reconocida');
    }



}

main();