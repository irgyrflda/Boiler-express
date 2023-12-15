//menggunakan raw query database
const UserRow = (val) => {
//dengan kondisi
    let query
    switch (val.method) {
        case 'GET_ALL':
            query = 'SELECT id_user, nama FROM ref_user'
            break;
        case 'GET_BY_ID':
            query = `SELECT id_user, nama FROM ref_user WHERE id_user = ${val.id}`
            break;
        case 'GET_BY_NAMA':
            query = `SELECT id_user, nama FROM ref_user WHERE nama = ${JSON.stringify(val.nama)}`
            break;
        case 'POST':
            query = `INSERT INTO ref_user (nama) VALUES (${JSON.stringify(val.nama)})`
            break;
        case 'PUT':
            query = `UPDATE ref_user SET nama = ${JSON.stringify(val.nama)} WHERE id_user = ${val.id}`
            break;
        case 'DELETE':
            query = `DELETE FROM ref_user WHERE id_user = ${val.id}`
            break;
    }
    return query;
}

module.exports = UserRow; //exports module userraw
//module ini di import di ./src/models/rowquery/index.js