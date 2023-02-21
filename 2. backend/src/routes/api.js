import express from 'express';
import { ApiProductController, ApiUserController } from '../controllers/Api';

let router = express.Router();

const initAPIRoute = (app) => {
    /**
     *      Users
     */
    // /user
    router.get("/user", ApiUserController.getAll)

    /**
     *      Products
     */
    // /product/:id
    router.get("/product/:id", ApiProductController.getId)
    // /product
    router.get("/product", ApiProductController.getAll)

    return app.use("/api/v1", router)     
}  

export default initAPIRoute;