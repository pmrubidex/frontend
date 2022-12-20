import axios from "axios";
import { IBlocksetFields } from "../interfaces";

const serverUrl = "https://rubitwo.rubidex.co:8081";

const v3BaseUrl = `${serverUrl}/api/v3`;
const axiosV1Instance = axios.create({ baseURL: v3BaseUrl });

const login = (name: string, password: string) => {
  return axiosV1Instance.get(
    `/user/login?username=${name}&password=${password}`
  );
};

const logout = () => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(`/user/logout?access_token=${token}`);
};

const checkLoggedIn = () => {
  return readUserBlock(0);
};

const readUserBlock = (blocknum: number) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/user/readblock?access_token=${token}&blocknum=${blocknum}`
  );
};

const readDataBlock = (blocknum: number, blockname: string, format: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/user/readblock?access_token=${token}&blocknum=${blocknum}&name=${blockname}&format=${format}`
  );
};

const createUserBlockset = (info: IBlocksetFields) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.post(`/blockset/create?access_token=${token}`, info);
};

const createAdminBlockset = (info: IBlocksetFields) => {
  const token = window.localStorage.getItem("token");
  const { blockname, memofield } = info;
  const data = {
    fields: memofield,
  };
  const url =
    v3BaseUrl + `/blockset/create?access_token=${token}&name=${blockname}`;
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const readBlocksetInfo = (blockname: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/blockset/info?access_token=${token}&name=${blockname}`
  );
};

const readBlocksetValue = (blockname: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/blockset/view?access_token=${token}&name=${blockname}`
  );
};

const readBlocksetField = (blockname: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/blockset/fields?access_token=${token}&name=${blockname}`
  );
};

const readBlocksetStorageConfig = (blockname: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/blockset/storage?access_token=${token}&name=${blockname}`
  );
};

const readBlocksetKeys = (blockname: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/blockset/keys?access_token=${token}&name=${blockname}`
  );
};

const readBlockCount = (blockname: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/block/count?access_token=${token}&name=${blockname}`
  );
};

const selectBlock = (
  blockname: string,
  field: string,
  value: string,
  enc?: number,
  currentPage?: number,
  pageLimit?: number
) => {
  // const url =
  //   v2BaseUrl +
  //   `/block/select?access_token=${"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"}&name=${blockname}&enc=${enc}&sort=${field}&where=${value}&pagenum=${currentPage}&pagesize=${pageLimit}`;
  // return fetch(url, {
  //   method: "GET",
  //   mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const token = window.localStorage.getItem("token");
  // return axiosV2Instance.get(
  //   `/block/select?access_token=${"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"}&name=${blockname}&enc=${enc}&sort=${field}&where=${value}&pagenum=${currentPage}&pagesize=${pageLimit}`
  //   // {
  //   //   httpsAgent: new https.Agent({
  //   //     rejectUnauthorized: false,
  //   //   }),
  //   // }
  // );
};

const selectFromDB = (
  field: string,
  value: string,
  currentPage: number,
  pageLimit: number
) => {
  return axios.get(
    `https://rubidex-backend.herokuapp.com/api/address/select/${field}/${value}/${currentPage}/${pageLimit}`
  );
};

const insertData = (blockname: string, data: string) => {
  console.log(data);
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.get(
    `/block/insert?access_token=${token}&name=${blockname}&data=${data}`
  );
  // return axios.post(
  //   `http://do.dev.nodered.penteon.co:1880/api/v1/block/insert`,
  //   { access_token: token, name: blockname, data }
  // );
  const body = {
    access_token: "FFFF",
    name: blockname,
    data,
  };
  const url =
    v3BaseUrl + `/block/insert?access_token=${"FFFF"}&name=${blockname}`;
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  // return axiosV1Instance.post(`/block/insert`, {
  //   access_token: token,
  //   name: blockname,
  //   data,
  // });
};

const encryptData = (blockname: string, data: string) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.post(
    `/block/encrypt?access_token=${token}&name=${blockname}&value=${data}`
  );
};

const writeBlock = (
  blockname: string,
  blocknum: any,
  format: any,
  content: any
) => {
  const token = window.localStorage.getItem("token");
  return axiosV1Instance.post(
    `/block/write?access_token=${token}&name=${blockname}&blocknum=${blocknum}&format=${format}`,
    { content },
    { withCredentials: false }
  );
};

export default {
  login,
  logout,
  checkLoggedIn,
  readUserBlock,
  readDataBlock,
  readBlocksetInfo,
  readBlocksetValue,
  readBlocksetField,
  readBlocksetStorageConfig,
  readBlocksetKeys,
  readBlockCount,
  createUserBlockset,
  createAdminBlockset,
  selectBlock,
  selectFromDB,
  insertData,
  encryptData,
  writeBlock,
};
