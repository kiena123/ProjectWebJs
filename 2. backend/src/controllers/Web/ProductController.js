import promisePool from "../../configs/connectDB";

class ProductController {
    
    // [Get] /product/list/:number
    async Get_Manage(req, res) {
        const params = req.params;
        const rowData = {
            number: (params && params.number >= 1) ? Number(params.number) : 1,
        }
            
        try {
            const [rowsProduct, fieldsProduct] = await promisePool.query(`Select * from products limit ${(rowData.number - 1) * 10}, ${(rowData.number - 1) * 10 + 10}`)
            const [rowsSumProduct, fieldsSumProduct] = await promisePool.query(`Select count(*) as count from products`)
            rowData.count = Math.ceil(rowsSumProduct[0].count / 10)

            res.render("products/manageProduct", { data : rowsProduct, keysData: [...Object.keys(rowsProduct[0]), ""], pagination : rowData})
        } catch (error) {
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
        }
    }

    // [Get] /product/add
    Get_Add(req, res) {
        return res.render("products/formProduct");
    }

    // [Post] /product/add
    async Post_Add(req, res) {
        const data =  req.body;
        const result = {}
        try {
            const [rowsUser, fieldsUser] = await promisePool.query("Insert into products( `name`, `quantity` ) " + `values( "${data.name}", ${data.quantity} )`)
            if(rowsUser.affectedRows > 0){
                result["message"] = "Them thanh cong"
            } else {
                result["message"] = "Them that bai"
            }
        } catch (error) {
            switch (error.errno) {
                case -4078:
                    result["message"] = "Server khong hoat dong"
                    break;
                default:
                    console.log(error.errno + ":" + error.sqlMessage)
                    break;
            }
        }

        return res.json(result)
    }

    // [Get] /product/update/:id
    async Get_Update(req, res) {
        const params = req.params
        try {
            const [rowsProduct, fieldsProduct] = await promisePool.query(`Select * from products where id = ${params.id}`)
            res.render("products/formProduct", { data : rowsProduct[0], keysData: [...Object.keys(rowsProduct[0])]})
        } catch (error) {
            const result = {}
            switch (error.errno) {
                case -4078:
                    result["message"] = "Server khong hoat dong"
                    console.log("Loi sql")
                    break;
                default:
                    console.log(error.errno + ":" + error.sqlMessage)
                    break;
            }

            res.json(result)
        }
    }

    // [Post] /product/update/:id
    async Post_Update(req, res) {
        const data =  req.body;
        const params =  req.params;
        const result = {}
        try {
            const [rowsUser, fieldsUser] = await promisePool.query(`Update products set name = "${data.name}", quantity = ${data.quantity} where id = ${params.id} `)
            if(rowsUser.affectedRows > 0){
                result["message"] = "Sua thanh cong"
            } else {
                result["message"] = "Sua that bai"
            }
        } catch (error) {
            switch (error.errno) {
                case -4078:
                    result["message"] = "Server khong hoat dong"
                    break;
                default:
                    console.log(error.errno + ":" + error.sqlMessage)
                    break;
            }
        }

        return res.json(result)
    }

    // [Get] /product/delete/:id
    async Get_Delete(req, res) {
        const params = req.params

        try {
            const [rowsUser, fieldsUser] = await promisePool.query(`delete from products where id = ${params.id} `)

        } catch (error) {
            console.log(error.errno + ":" + error.sqlMessage)
        }

        return res.redirect("/product")
    }

}

export default new ProductController