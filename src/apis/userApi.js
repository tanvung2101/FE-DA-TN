import axiosClient from "./axiosClient";

const userApis = {
    loadUserApi: (params) =>
    axiosClient.get(`api/v1/me`, {params}),
};

export default userApis;
