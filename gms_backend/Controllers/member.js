
const Member = require('../Modals/member');
const Membership = require('../Modals/membership');

exports.getAllMembers = async (req, res) => {
    try{
        const {skip, limit} = req.query;
         
        const members = await Member.find({gym: req.gym._id});
        const totalMember = members.length;
        
        const limitedMembers = await Member.find({gym: req.gym._id}).sort({createadAt: -1}).skip(skip).limit(limit);

        res.status(200).json({message:members.length? "Members retrieved successfully":"No any member registered yet", 
        members : limitedMembers, 
        totalMembers:totalMember
    });

    }catch(err){
        console.log('err')
        res.status(500).json({error: "server error"})
    }
}



function addMonths(date, months) {
    let today = date;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const futuerMonth = currentMonth + months;
    const futuerYear = currentYear + Math.floor(futuerMonth / 12);

    const adjustedMonth = futuerMonth % 12;

    const futureDate = new Date(futuerYear, adjustedMonth, 1);

    const lastDayOffFutureMonth = new Date(futuerYear, adjustedMonth + 1, 0).getDate();

    const adjustedDay = Math.min(currentDay, lastDayOffFutureMonth);

    futureDate.setDate(adjustedDay);

    return futureDate;
}





exports.registerMember = async (req, res) => {

    try{
        const {name,mobileNo, address, membership, profilePic,joiningDate } = req.body;

        const member = await Member.findOne({gym:req.gym._id,mobileNo});

        if(member){
            return res.status(409).json({error: "Member with this mobile number already exists"});
        }
        
        const memberShip = await Membership.findOne({_id: membership, gym:req.gym._id});
        
        console.log(membership);

        const membershipMonth = memberShip.months;

        if(memberShip){
            let jngDate = new Date(joiningDate);
            const nextBillDate= addMonths(jngDate, membershipMonth);

            let newMember = new Member({
                name,
                mobileNo,
                address,
                membership,
                gym:req.gym._id,
                profilePic,
                lastPayment: jngDate,
                nextBillDate: nextBillDate 
            })
            await newMember.save();
            res.status(200).json({message: "Member registered successfully", newMember});


        }else{
            return res.status(409).json({error: "Membership plan not found"});
        }
    }
    catch(err){
        console.log('err')
        res.status(500).json({error: "server error"})
    }
};






exports.searchMember = async(req,res) => {
    try{
        const {searchTerm} = req.query;
        const member = await Member.find({gym:req.gym._id,
            $or:[{name:{$regex:'^'+ searchTerm, $options:"i"}}, {mobileNo: {$regex: searchTerm, $options:"i"}}]})
    


        res.status(200).json({
            message:member.length?"Members retrieved successfully":"No such member found", 
            members:member,
            totalMembers: member.length
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: "server error"});
    }
}



exports.monthlyMembers = async(req,res)=>{
    try{
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0,23 ,59,59, 999);

        console.log(startOfMonth, endOfMonth);

        const member = await Member.find({gym:req.gym._id, 
            createdAt:{
                $gte: startOfMonth, 
                $lte: endOfMonth
            }
        }).sort({createdAt: -1});

        res.status(200).json({
            message:member.length?"Members retrieved successfully":"No member registered this month", 
            members:member,
            totalMembers: member.length
        });




}catch(err){
        console.log(err);
        res.status(500).json({error: "server error"});
    }   
}





exports.expiringWithin3Days= async(req,res)=>{
    try{
        const today = new Date();
        const nextThreeDays = new Date(today.getDate()+3);
        nextThreeDays.setDate(today.getDate() + 3);

        const members = await Member.find({
            gym:req.gym._id,
            nextBillDate: {
                $gte: today,     //Greater than or equal to today
                $lte: nextThreeDays      //Less than or equal to 3 days for today
            }
        });

        res.status(200).json({
            message: members.length ? "Members retrieved successfully" : "No members expiring within 3 days",
            members: members,
            totalMembers: members.length
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: "server error"});
    }
}







exports.expiringWithin4To7Days = async(req,res)=>{
    try{
        const today = new date();
        const nextFourDays = new Date(today);
        nextFourDays.setDate(today.getDate() + 4);

        const next7Days = new Date(today);
        next7Days.setDate(today.getDate() + 7);

        const members = await Member.find({
            gym:req.gym._id,
            nextBillDate: {
                $gte: nextFourDays,     //Greater than or equal to 4 days from today
                $lte: next7Days      //Less than or equal to 7 days from today
            }
        });

        res.status(200).json({
            message: members.length ? "Members retrieved successfully" : "No members expiring within 4 to 7 days",
            members: members,
            totalMembers: members.length
        });



    }catch(err){
        console.log(err);
        res.status(500).json({error: "server error"});
    }
}








exports.expiredMember = async(req,res)=>{
    try{
        const today = new Date();
        const members = await Member.find({
            gym:req.gym._id,status:"Active",
            nextBillDate: {
                $lt: today     //Less than today means expired
            }
        });
        
        res.status(200).json({
            message: members.length ? "Members retrieved successfully" : "No expired members",
            members: members,
            totalMembers: members.length
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: "server error"});
    }
}





exports.inactiveMember = async(req,res)=>{
    try{
        const members = await Member.find({
            gym:req.gym._id,
            status:"Inactive",
        });
        
        res.status(200).json({  
            message: members.length ? "Members retrieved successfully" : "No inactive members",
            members: members,
            totalMembers: members.length
        }); 
    }catch(err){
        console.log(err);
        res.status(500).json({error: "server error"});
    }
}