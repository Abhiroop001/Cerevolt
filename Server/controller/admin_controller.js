var Admin = require("../db/admindb");
const bcrypt =require("bcrypt")
module.exports={

    async addadmin(req,res){

        const salt=await bcrypt.genSalt(10);

        const hp=await bcrypt.hash("123456",salt);

        var insobj={
            name:"jack",
            email:"jack@gmail.com",
            password:hp
        }

        await Admin.create(insobj);
        res.send("Admin Add");
    },
    async login(req,res){
        var e=req.body.email
        var p=req.body.pass
        var data=await Admin.findOne({email:e})
        if(data==null){
            res.json({msg:"invalid login"});
        }
        else{
            bcrypt.compare(p,data.password,async(err,result)=>{
                if(err){
                    throw err;
                }else{
                    if(result==true){
                        var udata={
                            name:data.name,
                            id:data._id
                        };
                        res.json(udata);
                    }
                    else{
                        res.json({msg:"invalid login"});
                    }
                }
            })
        }
    }

}