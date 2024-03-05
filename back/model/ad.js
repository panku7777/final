const mongoose=require('mongoose')

const adSchema=mongoose.Schema(
{


    name:{
        type:String,
        required:true
    },

    email:
    {
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    }

   

   
},
{
    timestamps:true
})

const adminModel= mongoose.model('admin',adSchema)

module.exports=adminModel