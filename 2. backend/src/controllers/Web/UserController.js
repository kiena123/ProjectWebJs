import UserTable from "../../database/UserTable";

class UserController {
    // [Get] /user/list/:number
    async Get_Manage(req, res) {
        const params = req.params;
        const rowData = {
            number: (params && params.number >= 1) ? Number(params.number) : 1,
        }
            
        const [rowsUser, fieldsUser] = await UserTable.selectAllLimit(
            { 'start': (rowData.number - 1) * 10, 'end': (rowData.number - 1) * 10 + 10},
            (error) => {
                const result = {}
                switch (error.errno) {
                    case -4078:
                        result["message"] = "Server khong hoat dong"
                        break;
                    default:
                        console.log(error.errno + ":" + error.sqlMessage)
                        break;
                }

                return res.json(result)
            })

        const [rowsSumUser, fieldsSumUser] = await UserTable.select(`Select count(*) as count from users`)
        rowData.count = Math.ceil(rowsSumUser[0].count / 10)

        return res.render("users/manageUser", { data : rowsUser, keysData: [...Object.keys(rowsUser[0]), ""], pagination : rowData})
    }

    async Get_Add(req, res) {
        return res.render("users/formUser");
    }

    async Get_Update(req, res) {
        return res.render("Users/formUser");
    }

}

export default new UserController