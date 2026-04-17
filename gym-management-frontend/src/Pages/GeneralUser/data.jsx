import api from "../../api/api";

const getMonthlyJoined = async () => {
  try {
    const res = await api.get("/members/monthly-members");
    return res.data.members || [];
  } catch (err) {
    console.log("Error fetching data", err);
    throw err;
  }
};

const threeDayExpire = async () => {
  try {
    const res = await api.get("/members/Expiring_within_2_weeks");
    return res.data.members || [];
  } catch (err) {
    console.log("Error fetching data", err);
    throw err;
  }
};

const fourToSevenDaysExpire = async () => {
  try {
    const res = await api.get("/members/within-4-7-expiring");
    return res.data.members || [];
  } catch (err) {
    console.log("Error fetching data", err);
    throw err;
  }
};

const expired = async () => {
  try {
    const res = await api.get("/members/expired-member");
    return res.data.members || [];
  } catch (err) {
    console.log("Error fetching data", err);
    throw err;
  }
};

const inActiveMembers = async () => {
  try {
    const res = await api.get("/members/inactive-member");
    return res.data.members || [];
  } catch (err) {
    console.log("Error fetching data", err);
    throw err;
  }
};

export {
  getMonthlyJoined,
  threeDayExpire,
  fourToSevenDaysExpire,
  inActiveMembers,
  expired,
};