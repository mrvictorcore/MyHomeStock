/**
 * Utilidad para manejar respuestas de base de datos de manera uniforme.
 */
export function handleDbResponse(err, res, result) {
    if (typeof result !== 'function') {
        console.error('result no es una función');
        return;
    }

    if (err) {
        console.log('error: ', err);
        result(err, null);
    } else {
        result(null, Array.isArray(res) && res.length === 1 ? res[0] : res);
    }
}

/**
 * Centraliza y estandariza las respuestas HTTP.
 */
export function handleResponse(res, promiseFunction) {
    if (typeof promiseFunction !== 'function') {
        console.error('promiseFunction no es una función');
        res.status(500).json({ error: true, message: 'promiseFunction no es una función' });
        return;
    }

    promiseFunction()
        .then(data => {
            const serializedData = serializeData(data);
            res.status(200).json({ error: false, data: serializedData });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: true, message: err.message });
        });
}

/**
 * Serializa los datos antes de enviarlos como respuesta HTTP.
 */
function serializeData(data) {
    if (Array.isArray(data)) {
        return data.map(item => serializeItem(item));
    } else {
        return serializeItem(data);
    }
}

function serializeItem(item) {
    // delete item.sensitiveField; // Suponiendo que 'sensitiveField' es un campo que no debe exponerse.
    // delete item.password;
    // delete item.email;

    // if (item.dateField) {
    //     item.dateField = item.dateField.toISOString(); // Asegurarse que las fechas están en formato ISO 8601. '2020-05-18T12:00:00.000Z'
    // }
    return item;
}

/**
 * Función para verificar si un objeto es una función.
 */
export function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
