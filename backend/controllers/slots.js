const Slots = require('../models/slots')

module.exports.getSlots = (req,res)=>{
    Slots.findAll().then((user)=>{
        //console.log(user)
        res.json(user)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.getUserByEmail = (req,res)=>{
    Slots.findAll({where: {email:req.params.email}}).then((user)=>{
        //console.log(user)
        res.json(user[0])
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.createSlots = (req,res)=>{
    const user = req.body.data
    Slots.create({time:user.time,count:user.count}).then((slot)=>{
        //console.log(user.dataValues)
        res.json(slot.dataValues)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.deleteSlots = (req,res)=>{
    Slots.destroy({where:{id:req.params.id}}).then((slot)=>{
        //console.log(user)
        res.json(slot)
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports.editSlots = (req,res)=>{
    const {count} = req.body
    Slots.update({count:count},{where:{id:req.params.id}}).then((slot)=>{
        console.log(slot)
    }).catch((err)=>{
        console.log(err)
    })
}