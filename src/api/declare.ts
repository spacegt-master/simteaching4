import { PagingProcessor } from "@/utils/paging-processor";
import axios from "../axios";

export const DeclareApi = {
  page(params: {
    current: number;
    size: number;
    sortKey: string;
    sortOrder: string;
    name: string;
  }) {
    params = PagingProcessor(params);
    return axios({
      url: "/declare/public/page",
      method: "get",
      params,
    });
  },
  self(params: {
    current: number;
    size: number;
    sortKey: string;
    sortOrder: string;
    name: string;
  }) {
    params = PagingProcessor(params);
    return axios({
      url: "/declare/self",
      method: "get",
      params,
    });
  },
  del(id: string) {
    return axios({
      url: "/declare/del/" + id,
      method: "post",
    });
  },
  save(data: object) {
    return axios({
      url: "/declare/save",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
  info(id: string) {
    return axios({
      url: "/declare/public/" + id,
      method: "get",
    });
  },
  detailsInfo(did: string) {
    return axios({
      url: "/declare/public/details/" + did,
      method: "get",
    });
  },
  detailsSave(data: object) {
    return axios({
      url: "/declare/details/save",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
  checkPage(params: {
    current: number;
    size: number;
    sortKey: string;
    sortOrder: string;
    name: string;
  }) {
    params = PagingProcessor(params);
    return axios({
      url: "/declare/check/page",
      method: "get",
      params,
    });
  },
  check(did: string, status: number, msg: string) {
    return axios({
      url: "/declare/check",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: { did, status, msg },
    });
  },
};
