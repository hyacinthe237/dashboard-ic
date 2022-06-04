import http from "@/http-common";

class UserDataService {
    getUserReporting(): Promise<any> {
      return http.get("/user-api/users/reporting/");
    }
    getAll(): Promise<any> {
      return http.get("/user-api/users/");
    }
    get(id: any): Promise<any> {
      return http.get(`/user-api/users/${id}/`);
    }
    getUserDetail(id: any): Promise<any> {
      return http.get(`/user-api/users/${id}/detail`);
    }
    create(data: any): Promise<any> {
      return http.post("/user-api/users/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.put(`/user-api/users/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/user-api/users/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/user-api/users/`);
    }
}

export default new UserDataService();
