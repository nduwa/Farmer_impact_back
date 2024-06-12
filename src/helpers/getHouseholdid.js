export const getHouseholdid = (kf = "", arr = []) => {
  for (const key of arr) {
    if (key.KF === kf) return key.ID;
  }
};
