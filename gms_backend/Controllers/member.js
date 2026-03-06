
const Member = require('../Modals/member');
const Membership = require('../Modals/membership');

exports.getAllMembers = async (req, res) => {
    try {
        const { skip, limit } = req.query;

        const members = await Member.find({ gym: req.gym._id });
        const totalMember = members.length;

        const limitedMembers = await Member.find({ gym: req.gym._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);

        res.status(200).json({
            message: members.length ? "Members retrieved successfully" : "No any member registered yet",
            members: limitedMembers,
            totalMembers: totalMember
        });
    } catch (err) {
        console.log('err')
        res.status(500).json({ error: "server error" })
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
    try {
        const { name, mobileNo, address, membership, profilePic, joiningDate } = req.body;

        const existingMember = await Member.findOne({
            gym: req.gym._id,
            mobileNo
        });

        if (existingMember) {
            return res.status(409).json({
                error: "Member with this mobile number already exists"
            });
        }

        const membershipPlan = await Membership.findOne({
            _id: membership,
            gym: req.gym._id
        });

        if (!membershipPlan) {
            return res.status(404).json({
                error: "Membership plan not found"
            });
        }

        const joinDate = new Date(joiningDate);

        if (isNaN(joinDate)) {
            return res.status(400).json({
                error: "Invalid joining date format"
            });
        }

        const nextBillDate = new Date(joinDate);
        nextBillDate.setMonth(joinDate.getMonth() + membershipPlan.months);

        const newMember = await Member.create({
            name,
            mobileNo,
            address,
            membership,
            gym: req.gym._id,
            profilePic,
            lastPayment: joinDate,
            nextBillDate
        });

        res.status(201).json({
            message: "Member registered successfully",
            member: newMember
        });

    } catch (err) {
        console.log("Register Member Error:", err);
        res.status(500).json({
            error: "Server error"
        });
    }
};






exports.searchMember = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const member = await Member.find({
            gym: req.gym._id,
            $or: [{ name: { $regex: '^' + searchTerm, $options: "i" } }, { mobileNo: { $regex: searchTerm, $options: "i" } }]
        })



        res.status(200).json({
            message: member.length ? "Members retrieved successfully" : "No such member found",
            members: member,
            totalMembers: member.length
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}



exports.monthlyMembers = async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        console.log(startOfMonth, endOfMonth);

        const member = await Member.find({
            gym: req.gym._id,
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: member.length ? "Members retrieved successfully" : "No member registered this month",
            members: member,
            totalMembers: member.length
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}





exports.expiringWithin3Days = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextThreeDays = new Date(today);
        nextThreeDays.setDate(today.getDate() + 3);
        nextThreeDays.setHours(23, 59, 59, 999);

        const members = await Member.find({
            gym: req.gym._id,
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

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}







exports.expiringWithin4To7Days = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const fourDaysLater = new Date(today);
        fourDaysLater.setDate(today.getDate() + 4);

        const sevenDaysLater = new Date(today);
        sevenDaysLater.setDate(today.getDate() + 7);
        sevenDaysLater.setHours(23, 59, 59, 999);

        const members = await Member.find({
            gym: req.gym._id,
            nextBillDate: {
                $gte: fourDaysLater,
                $lte: sevenDaysLater
            }
        });

        res.status(200).json({members});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.expiredMember = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const members = await Member.find({
            gym: req.gym._id,
            status: "Active",
            nextBillDate: { $lt: today }
        });

        res.status(200).json({
            message: members.length
                ? "Members retrieved successfully"
                : "No expired members",
            members,
            totalMembers: members.length
        });

    } catch (err) {
        res.status(500).json({ error: "server error" });
    }
};




exports.inactiveMember = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);   // start of day

        const members = await Member.find({
            gym: req.gym._id,
            nextBillDate: { $lt: today }
        });

        res.status(200).json({
            members,
            totalMembers: members.length
        });

    } catch (err) {
        console.log("Inactive Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};



exports.getMemberDetails = async (req, res) => {
    try {

        const { id } = req.params;
        const member = await Member.findOne({ _id: id, gym: req.gym._id }).populate('membership');

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json({ message: "Member details retrieved successfully", member: member });



    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}




exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const member = await Member.findOne({ _id: id, gym: req.gym._id });

        if (!member) {
            return res.status(404).json({ error: "Member not found" });
        }

        member.status = status;
        await member.save();


        res.status(200).json({ message: "Member status updated successfully", member: member });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "server error" });
    }
}






exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;

    const member = await Member.findOne({
      _id: req.params.id,
      gym: req.gym._id
    });

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const membershipPlan = await Membership.findOne({
      _id: membership,
      gym: req.gym._id
    });

    if (!membershipPlan) {
      return res.status(404).json({ error: "Membership plan not found" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newNextBillDate = new Date(today);
    newNextBillDate.setMonth(today.getMonth() + membershipPlan.months);

    member.membership = membership;
    member.lastPayment = today;
    member.nextBillDate = newNextBillDate;

    await member.save();

    res.status(200).json({
      message: "Membership renewed successfully",
      member
    });

  } catch (err) {
    console.log("Renew Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};