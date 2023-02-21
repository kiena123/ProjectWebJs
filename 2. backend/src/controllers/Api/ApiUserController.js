import promisePool from "../../configs/connectDB";

class ApiUserController {
    //  Get /user/
    async getAll(req, res) {
        const [ rows, fields, err] = await promisePool.query("Select * from users")
        
        if(!err){
            res.json(rows)
        } else {
            res.json(err)
        }
    }
}

export default new ApiUserController;