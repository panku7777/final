const mongoose=require("mongoose")
var mongoUrl="mongodb+srv://swethalakshmi995:123@cluster0.oyudmey.mongodb.net/Elibrary"
mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Database Connected")

})

.catch(err =>
    {
        console.log(err)
    })

    module.exports=mongoose