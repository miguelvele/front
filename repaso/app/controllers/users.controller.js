import { pool } from "../config/database/db"

export const findAllUser = async (req, res) => {
        try {
                const [rows] = await pool.query("CALL spFindAllUsers();");
                res.json(rows);
        } catch (error) {
                console.error("ha ocurrido un error")

        }

}
export const findUser = async (req, res) => {
        const id = req.params.id;
        try {
                const [rows] = await pool.query(`CALL spFindUser('${id}');`);
                res.json(rows);
        } catch (error) {
                console.error("ha ocurrido un error")

        }
}
export const insertUser = async (req, res) => {
        const name = req.body.name;
        const result = await pool.query(`CALL spInsertUser('${name}');`);
        res.json(result);
        console.log("Registro insertado correctamente");
}
export const deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
                const result = await pool.query(`CALL spDeleteUser(${id})`);
        } catch (error) {
                if (result[0].affectedRows == 1)
                        res.json(result);
                else
                        res.json({ "Error": "No se pudo borrar" });
        }
}


export const updateUser = async (req, res) => {
        const name = req.body.name;
        const id = req.body.id;

        try {
                const result = await pool.query(`CALL spUpdateUser(${id}'${name}');`);
                if (result[0].affectedRows != 0)
                        res.json(result);
                else
                        res.json({ "Error": "No actualizo" });
        } catch (error) {
                console.error("ha ocurrido un error, no se pudo actualizar")

        }
}