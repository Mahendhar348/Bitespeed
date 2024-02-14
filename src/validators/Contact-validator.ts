import { NextFunction } from 'express';
import Joi from 'joi';
export const contactValidator=(req:any,res:any,next:any)=>{
    try{
        const request={
            ...req.body,
            phoneNumber:req?.body?.phoneNumber.toString()
        }
        const contactSchema= Joi.object().keys({
            email:Joi.string().email().message('Invalid Email').optional(),
            phoneNumber:Joi.string().regex(/^[0-9]{10}$/).message('Invalid Phone Number').optional()
        })
        const response= contactSchema.validate(request);
        if(response.error){
            res.status(400).send(response.error);
        }
        else if(!request?.phoneNumber && !request?.email){
            res.status(400).send({message:'An email or phone number is mandatory.'});
        }
        else{
            console.log('heyy')
            next();
        }
    }
    catch(err:any){
        res.status(400).send(err);
    };
}