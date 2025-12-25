const Membership = require('../Modals/membership');



exports.addMembership = async (req, res) => {
    try{
        const {months, price} = req.body;
        const membership= await Membership.findOne({gym:req.gym._id, months});
        
        if(membership){
            membership.price = price;
            await membership.save();
            res.status(200).json({message: "Membership plan updated successfully", data: membership});
        }else{
            const newMembership = new Membership({
                gym: req.gym._id,
                months,
                price
            });
            await newMembership.save();
            res.status(200).json({message: "Membership plan added successfully", data: newMembership});
        }

    }catch(err){
        console.log('err')
        res.status(500).json({error: "server error"})
    }
}




exports.getMemberships = async (req, res) => {
    try{
        const memberships = await Membership.find({gym: req.gym._id});
        res.status(200).json({message: "Memberships retrieved successfully", membership: memberships});
    }catch(err){
        console.log('err')
        res.status(500).json({error: "server error"})
    }
} 

