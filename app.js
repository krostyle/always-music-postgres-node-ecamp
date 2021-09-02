const { createStudentDatabase, getStudents, getStudent, updateStudent, deleteStudent } = require("./controllers/db.controllers");

const [accion, ...params] = process.argv.slice(2);


const main = async() => {

    switch (accion) {
        case 'nuevo':
            if (params.length === 4) {
                await createStudentDatabase(params)
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        case 'consulta':
            if (params.length === 0) {
                await getStudents();
            } else {
                console.log('No es necesario enviar parámetros');
            }
            break;
        case 'rut':
            if (params.length === 1) {
                await getStudent(params);
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        case 'editar':
            if (params.length === 4) {
                await updateStudent(params)
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        case 'eliminar':
            if (params.length === 1) {
                await deleteStudent(params);
            } else {
                console.log('Cantidad de parámetros incorrectos');
            }
            break;
        default:
            console.log('Acción no reconocida');
    }



}

main();