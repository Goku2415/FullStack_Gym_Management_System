import api from "../../api/api";const getMonthlyJoined = async () => {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/members/monthly-members`, {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


const threeDayExpire = async () => {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/members/Expiring_within_2_weeks`, {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


const fourToSevenDaysExpire = async () => {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/members/within-4-7-expiring`, {withCredentials:true});

        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};
const expired = async () => {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/members/expired-member`, {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


const inActiveMembers = async () => {
    try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/members/inactive-member`, {withCredentials:true});
        return res.data.members || [];
    } catch (err) {
        console.log("Error fetching data",err);
        throw err;
    }
};


export  { getMonthlyJoined, threeDayExpire,fourToSevenDaysExpire, inActiveMembers, expired} ;