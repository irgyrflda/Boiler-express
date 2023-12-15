const { jsonFormat } = require("../../utils/jsonFormat");
const db = require('../../config/database');
const {
    UserRow
} = require("../../models/rowquery/index");

const GetAllRow = (req, res) => {
    const queryGetAll = UserRow({ "method": "GET_ALL" })
    db.query(queryGetAll,
        {
            type: db.QueryTypes.SELECT
        })
        .then((dataGetAll) => {
            if (!dataGetAll) {
                return jsonFormat(res, "failed", "Data Kosong[0]")
            }
            if (dataGetAll.length === 0) {
                return jsonFormat(res, 400, "failed", "Data Kosong[1]")
            }
            return jsonFormat(res, 200, "success", "Berhasil Memuat Data", dataGetAll)
        })
        .catch((error) => {
            return jsonFormat(res, 401, "failed", `Error: ${error}`)
        })
}

const GetByIdRow = (req, res) => {
    const paramsId = req.params.id_user
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
            return jsonFormat(res, 401, "failed", `Error: ${error}`)
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
            db.query(UserRow(
                {
                    "method": "POST",
                    "nama": nama
                }
            ),
                {
                    type: db.QueryTypes.INSERT
                })
                .then((dataCreate) => {
                    if (!dataCreate) {
                        return jsonFormat(res, "failed", "Gagal Membuat Data")
                    }
                    return jsonFormat(res, 200, "success", "Berhasil Menambah Data")
                })
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
            db.query(UserRow(
                {
                    "method": "PUT",
                    "id": paramsId,
                    "nama": nama
                }
            ),
                {
                    type: db.QueryTypes.UPDATE
                })
                .then((updateData) => {
                    if (!updateData) {
                        return jsonFormat(res, "failed", "Gagal Mengubah Data")
                    }
                    return jsonFormat(res, 200, "success", "Berhasil Mengubah Data")
                })
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
            db.query(UserRow
                (
                    {
                        "method": "DELETE",
                        "id": paramsId
                    }
                )
            ).then((deleteUser) => {
                if (!deleteUser) {
                    return jsonFormat(res, "failed", "Gagal Menghapus Data[0]")
                }
                return jsonFormat(res, 200, "success", "Berhasil Menghapus Data")
            })
        })
        .catch((error) => {
            return jsonFormat(res, 401, "failed", `Error: ${error}`)
        })
}

module.exports = {
    GetAllRow,
    GetByIdRow,
    CreateRow,
    UpdateRow,
    DeleteByIdRow
}