import axios from "axios";

const getMonthlyJoined = async () => {
    try {
        const res = await axios.get("http://localhost:4000/members/monthly-members", {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


const threeDayExpire = async () => {
    try {
        const res = await axios.get("http://localhost:4000/members/Expiring_within_2_weeks", {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


const fourToSevenDaysExpire = async () => {
    try {
        const res = await axios.get("http://localhost:4000/members/within-4-7-expiring", {withCredentials:true});

        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};
const expired = async () => {
    try {
        const res = await axios.get("http://localhost:4000/members/expired-member", {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


const inActiveMembers = async () => {
    try {
        const res = await axios.get("http://localhost:4000/members/inactive-member", {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


export  { getMonthlyJoined, threeDayExpire,fourToSevenDaysExpire, inActiveMembers, expired} ;