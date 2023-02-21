import { AccountTable, UserTable } from "../../database";

class AccountController {

    // [Get] /login
    Get_Login(req, res) {
        res.render("login")
    }

    // [Post] /login
    async Post_Login(req, res) {
        const data = req.body;
        const result = {};

        const [rowsAccount, fieldsAccount] = await AccountTable.selectAllWhere({
            "email": data.email,
            "password": data.password
        }, (error) => {
            switch (error.errno) {
                case -4078:
                    result["message"] = "Server khong hoat dong"
                    break;
                default:
                    break;
            }
        })

        if(rowsAccount.length < 1){
            result["message"] = "Mat khau khong dung hoac email khong ton tai"
        }

        return res.json(result)
    }

    // [Get] /register
    Get_Register(req, res) {
        res.render("register")
    }

    // [Post] /register
    async Post_Register(req, res) {
        const data = req.body;
        const result = {};
        
        const [rowsUser, fieldsUser] = await UserTable.insert({
            "email": data.email,
            "name": data.name,
            "age": data.age,
            "address": data.address,
        }, (error) => {
            switch (error.errno) {
                case 1062:
                    result["message"] = "Email da ton tai"
                    break;
                case -4078:
                    result["message"] = "Server khong hoat dong"
                    break;
                default:

                    break;
            }
        })

        // Handle Account
        const [rowsAccount, fieldsAccount] = await AccountTable.insert({
                "email": data.email,
                "password": data.password,
        }, (error) => {
            switch (error.errno) {
                case 1062:
                    result["message"] = "Email da ton tai"
                    break;
                case -4078:
                    result["message"] = "Server khong hoat dong"
                    break;
                default:
                    break;
            }
        })

        if(!result["message"]){
            result["message"] = "Dang ky thanh cong"
        }

        return res.json(result)
    }

    manage(req, res) {
        res.render("account")
    }
}

export default new AccountController