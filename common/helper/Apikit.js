import HttpKit from "./HttpKit";

export const uploadSettings = {
  headers: {
    Accept: "*/*",
    "content-type": "multipart/form-data",
  },
};

const ApiKit = {
  user: {
    getUser: (params = {}) => HttpKit.get(`users`, { params }),
    getUserById: (id) => HttpKit.get(`users/${id}`),
  },
};

export default ApiKit;
