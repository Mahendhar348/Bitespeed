import { Router, request, response } from "express";
import { contactValidator } from "./validators/Contact-validator";
import { postContacts } from "./controllers/Contact.controller";

class Routes{
    public routes:Router;
    constructor(){
        this.routes=Router();
    }
    configureRoutes(){
        this.routes.route('/identify')
        .post(contactValidator,postContacts);
        return this.routes;
   }
}

export const routes = new Routes();