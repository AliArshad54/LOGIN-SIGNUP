const mongoose=require('mongoose');
const ClientsSchema=new mongoose.Schema({
name:String,
lastname:String,
email:String,
password:String,
city:String,
state:String,
zip:String,
file:{
    filename: String, 
    contentType: String, 
    size: Number, 
    location: String 
}
})
const clientModel=mongoose.model("Clients",ClientsSchema);
module.exports=clientModel;