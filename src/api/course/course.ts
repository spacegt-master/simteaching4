import { PagingProcessor } from "@/utils/paging-processor";
import axios from "@/axios";

export interface Course {
  id: any;
  name: string;
}

export const CourseApi = {
  page(params: {
    current: number;
    size: number;
    sortKey: string;
    sortOrder: string;
  }) {
    params = PagingProcessor(params);
    return axios({
      url: "/course/page",
      method: "get",
      params,
    });
  },
  save(data: object) {
    return axios({
      url: "/course/save",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  },
  del(id: string) {
    return axios({
      url: "/course/del/" + id,
      method: "post",
    });
  },
  recode(id: any) {
    return axios({
      url: "/course/recode/" + id,
      method: "post",
    });
  },
  stopcode(id: any) {
    return axios({
      url: "/course/stopcode/" + id,
      method: "post",
    });
  },
  list() {
    return axios({
      url: "/course/list",
      method: "get",
    });
  },
  info(id: string | string[]) {
    return axios({
      url: "/course/" + id,
      method: "get",
    });
  },
  curriculaVariable(code: string) {
    return axios({
      url: "/course/curricula-variable",
      method: "post",
      data: { code },
    });
  },
  getRegisterCourse() {
    return axios({
      url: "/course/getRegisterCourse",
      method: "get",
    });
  },
};