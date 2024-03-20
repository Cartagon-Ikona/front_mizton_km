


export const obtenerItems = async () => {
    const url = 'https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==';
    const datos = {
        'monday_request': 'query{boards(ids: 6097786561) {items_page(limit: 25){cursor items{id name} }}}'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        if (!response.ok) throw new Error('La petición falló');
        const data = await response.json();
        console.log('items',data.data.boards[0].items_page.items)
        return data.data.boards[0].items_page.items; // Devuelve el array completo de ítems
    } catch (error) {
        console.error('Error en la petición:', error);
        return []; // Devuelve un arreglo vacío en caso de error
    }
};


export const cambiarKm = async (itemId, value) => {
    const url = 'https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==';
    const datos = {
        'monday_request': `mutation {change_column_value(board_id: 6097786561, item_id: ${itemId}, column_id: "numbers", value: "${value}") {id }}`
    };
    console.log('query', datos)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        if (!response.ok) throw new Error('La petición falló');
        const data = await response.json();
        console.log('Respuesta:', data); // Mejor práctica es loguear la respuesta completa para depuración
        return data;
    } catch (error) {
        console.error('Error en la petición:', error);
        return null; // Devuelve un arreglo vacío en caso de error
    }
};


export const getPass = async () => {
    const url = 'https://appfunction-funciones.azurewebsites.net/api/funciones?code=CWenVyUQLn_UDqagBnoDThEXlLuG-wh0yHSnZ-tBicTzAzFuzyRTKA==';
    
    const datos = {
    'get_pass': 'get_pass'
    };
    console.log('query', datos)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        if (!response.ok) throw new Error('La petición falló');
        const data = await response.json();
        console.log('Respuesta:', data); // Mejor práctica es loguear la respuesta completa para depuración
        return data;
    } catch (error) {
        console.error('Error en la petición:', error);
        return null; // Devuelve un arreglo vacío en caso de error
    }
};