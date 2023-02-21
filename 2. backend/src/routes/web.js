import express from 'express'; 
import ProductController from "../controllers/Web/ProductController";
import AccountController from "../controllers/Web/AccountController";

let router = express.Router();

const initWebRoute = (app) => {
    /**
     *      Account
     */
    // [Get] /login
    router.get("/login", AccountController.Get_Login)
    // [Post] /login
    router.post("/login", AccountController.Post_Login)
    // [Get] /register
    router.get("/register", AccountController.Get_Register)
    // [Post] /register
    router.post("/register", AccountController.Post_Register)

    /**
     *      User
     */

    // [Get] /user/list/:number
    router.get("/user/list/:number", UserController.Get_Manage)
    // [Get] /user/add
    router.get("/user/add", UserController.Get_Add)
    // [Post] /user/add
    router.post("/user/add", UserController.Post_Add)
    // [Get] /user/update/:id
    router.get("/user/update/:id", UserController.Get_Update)
    // [Post] /user/update/:id
    router.post("/user/update/:id", UserController.Post_Update)
    // [Get] /user/delete/:id
    router.get("/user/delete/:id", UserController.Get_Delete)

    /**
     *      Product
     */

    // [Get] /product/list/:number
    router.get("/product/list/:number", ProductController.Get_Manage)
    // [Get] /product/add
    router.get("/product/add", ProductController.Get_Add)
    // [Post] /product/add
    router.post("/product/add", ProductController.Post_Add)
    // [Get] /product/update/:id
    router.get("/product/update/:id", ProductController.Get_Update)
    // [Post] /product/update/:id
    router.post("/product/update/:id", ProductController.Post_Update)
    // [Get] /product/delete/:id
    router.get("/product/delete/:id", ProductController.Get_Delete)

    router.get("/", function (req, res){
        res.render("home")
    })
    
    return app.use("/", router)
}


export default initWebRoute;