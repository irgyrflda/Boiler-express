const { jsonFormat } = require("../../utils/jsonFormat"); //import dari folder utils untuk handel response json
const db = require('../../config/database'); //kalau mengguankan raw query wajib import connection databse
const {
    UserRow
} = require("../../models/rowquery/index"); //mengambil query yang ada di models dengan nama file ./rowquery/index

const GetAllRow = (req, res) => {
    const queryGetAll = UserRow({ "method": "GET_ALL" }) // using raw query dengan mengirim object method GET_ALL
    db.query(queryGetAll,
        {
            type: db.QueryTypes.SELECT
        }) //implementasi raw query in sequelize
        .then((dataGetAll) => { //callback response data dari dababase
            if (!dataGetAll) {//validation jika tidak ada calbackan
                return jsonFormat(res, "failed", "Data Kosong[0]")//lempar respons error ke depan
            }
            if (dataGetAll.length === 0) { //validasi jika array data kosong
                return jsonFormat(res, 400, "failed", "Data Kosong[1]") //lempar error jika data tidak ada
            }
            return jsonFormat(res, 200, "success", "Berhasil Memuat Data", dataGetAll) //lempar respons jika ada data nya
        })
        .catch((error) => { //callbackan error
            return jsonFormat(res, 400, "failed", `Error: ${error}`)// lempar error ke depan dengan respons
        })
}

const GetByIdRow = (req, res) => {
    const paramsId = req.params.id_user //defined params yang di lempar
    db.query(UserRow(
        {
            "method": "GET_BY_ID",
            "id": paramsId
        }
    ), {
        type: db.QueryTypes.SELECT
    })
        .then((dataById) => {
            if (!dataById) {
                return jsonFormat(res, "failed", "Data Kosong[0]")
            }
            if (dataById.length === 0) {
                return jsonFormat(res, 400, "failed", "Data Kosong[1]")
            }
            return jsonFormat(res, 200, "success", "Berhasil Memuat Data", dataById)
        })
        .catch((error) => {
            return jsonFormat(res, 400, "failed", `Error: ${error}`)
        })
}

const CreateRow = (req, res) => {
    const nama = req.body.nama
    db.query(UserRow(
        {
            "method": "GET_BY_NAMA",
            "nama": nama
        }
    ), {
        type: db.QueryTypes.SELECT
    })
        .then((validationUser) => {
            if (!validationUser) {
                return jsonFormat(res, "failed", "Data Sudah Ada[0]")
            }
            if (validationUser.length !== 0) {
                return jsonFormat(res, 400, "failed", "Data Sudah Ada[1]")
            }
            return db.query(UserRow(
                {
                    "method": "POST",
                    "nama": nama
                }
            ),
                {
                    type: db.QueryTypes.INSERT
                })
        })
        .then((dataCreate) => {
            if (!dataCreate) {
                        return jsonFormat(res, "failed", "Gagal Membuat Data")
            }
            return jsonFormat(res, 200, "success", "Berhasil Menambah Data")
        })
        .catch((error) => {
            return jsonFormat(res, 400, "failed", `Error: ${error}`)
        })
}

const UpdateRow = (req, res) => {
    const paramsId = req.params.id_user
    const nama = req.body.nama
    db.query(UserRow(
        {
            "method": "GET_BY_ID",
            "id": paramsId
        }
    ), {
        type: db.QueryTypes.SELECT
    })
        .then((validationUser) => {
            if (!validationUser) {
                return jsonFormat(res, "failed", "Data Tidak Ditemukan[0]")
            }
            if (validationUser.length === 0) {
                return jsonFormat(res, 400, "failed", "Data Tidak Ditemukan[1]")
            }
            return db.query(UserRow(
                {
                    "method": "PUT",
                    "id": paramsId,
                    "nama": nama
                }
            ),
                {
                    type: db.QueryTypes.UPDATE
                })
                
        })
        .then((updateData) => {
            if (!updateData) {
                return jsonFormat(res, "failed", "Gagal Mengubah Data")
            }
            return jsonFormat(res, 200, "success", "Berhasil Mengubah Data")
        })
        .catch((error) => {
            return jsonFormat(res, 400, "failed", `Error: ${error}`)
        })
}

const DeleteByIdRow = (req, res) => {
    const paramsId = req.params.id_user
    db.query(UserRow(
        {
            "method": "GET_BY_ID",
            "id": paramsId
        }
    ),
        {
            type: db.QueryTypes.SELECT
        })
        .then((validationUser) => {
            if (!validationUser) {
                return jsonFormat(res, "failed", "Data Tidak Ditemukan[0]")
            }
            if (validationUser.length === 0) {
                return jsonFormat(res, 400, "failed", "Data Tidak Ditemukan[1]")
            }
            return db.query(UserRow
                (
                    {
                        "method": "DELETE",
                        "id": paramsId
                    }
                )
            )
        })
        .then((deleteUser) => {
            if (!deleteUser) {
                return jsonFormat(res, "failed", "Gagal Menghapus Data[0]")
            }
            return jsonFormat(res, 200, "success", "Berhasil Menghapus Data")
        })
        .catch((error) => {
            return jsonFormat(res, 400, "failed", `Error: ${error}`)
        })
}

module.exports = {
    GetAllRow,
    GetByIdRow,
    CreateRow,
    UpdateRow,
    DeleteByIdRow
} // exports module untuk di import di /controller/index.js
