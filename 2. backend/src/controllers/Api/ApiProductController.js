import promisePool from "../../configs/connectDB";

class ApiProductController {
    //  Get /product
    async getAll(req, res) {
        const [rows, fields, err] = await promisePool.query("Select * from products")

        if(!err){
            res.json(rows)
        } else {
            res.json(err)
        }
    }

    //  Get /product/:id
    async getId(req, res) {
        const [rows, fields, err] = await promisePool.query("Select * from products where id = " + req.params.id)
        
        if(!err){
            res.json(rows)
        } else {
            res.json(err)
        }
    }
}

export default new ApiProductController;