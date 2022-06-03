import http from "@/http-common";

class AlertDataService {
    getAll(): Promise<any> {
      return http.get("/report-api/alerts/");
    }
    get(id: any): Promise<any> {
      return http.get(`/report-api/alerts/${id}/`);
    }
    getAlertDetail(id: any): Promise<any> {
      return http.get(`/report-api/alerts/${id}/detail/`);
    }
    create(data: any): Promise<any> {
      return http.post("/report-api/alerts/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.put(`/report-api/alerts/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/report-api/alerts/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/report-api/alerts/agencies`);
    }
}

export default new AlertDataService();
