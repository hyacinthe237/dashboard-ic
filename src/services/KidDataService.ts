import http from "@/http-common";

class KidDataService {
    getAll(): Promise<any> {
      return http.get("/user-api/kids/");
    }
    get(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/`);
    }
    getKidDetail(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/detail`);
    }
    create(data: any): Promise<any> {
      return http.post("/user-api/kids/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.patch(`/user-api/kids/${id}/`, data);
    }
    partial_update(id: any, data: any): Promise<any> {
      return http.patch(`/user-api/kids/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/user-api/kids/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/user-api/kids/`);
    }
}

export default new KidDataService();
