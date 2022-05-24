import http from "@/http-common";

class AgencyDataService {
    getAll(): Promise<any> {
      return http.get("/family-api/agencies/");
    }
    get(id: any): Promise<any> {
      return http.get(`/family-api/agencies/${id}/`);
    }
    getFamilyDetail(id: any): Promise<any> {
      return http.get(`/family-api/agencies/${id}/detail/`);
    }
    create(data: any): Promise<any> {
      return http.post("/family-api/agencies/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.put(`/family-api/agencies/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/family-api/agencies/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/family-api/agencies`);
    }
}

export default new AgencyDataService();
