var mongoose=require('mongoose');
var contactSchema = new mongoose.Schema({
  id:Number,               
  phoneNumber:String,
  email:String,
  linkedId:Number, // the ID of another Contact linked to this one
  linkPrecedence:{type:String, enum:["secondary","primary"]}, // "primary" if it's the first Contact in the link
  createdAt:Date,          
  updatedAt:Date,           
  deletedAt:Date
});

export const Contacts=mongoose.model('contacts',contactSchema);