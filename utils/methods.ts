import axios from "axios";

const getAll = async (url: string) => {
    return await axios.get(`${url}`).then((res: any) => {
        return res.data.data
    });
};

const postAll = async (url: string, data: any, headers: any = {}) => {
    return await axios.post(`${url}`, data, headers);
};

const getId = async (url: string) => {
    return await axios.get(`${url}`).then((res: any) => {
        return res.data;
    });
};

const updateAll = async (url: string, data: any) => {
    return await axios.put(url, data);
};

const deleteOne = async (url: string, id: number | string) => {
    return await axios.delete(`${url}/${id}`);
};

export { getAll, postAll, getId, updateAll, deleteOne};
