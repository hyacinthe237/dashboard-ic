import http from "@/http-common";

class IssueDataService {
    getAll(): Promise<any> {
      return http.get("/report-api/issues/");
    }
    get(id: any): Promise<any> {
      return http.get(`/report-api/issues/${id}/`);
    }
    getIssueDetail(id: any): Promise<any> {
      return http.get(`/report-api/issues/${id}/detail/`);
    }
    create(data: any): Promise<any> {
      return http.post("/report-api/issues/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.put(`/report-api/issues/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/report-api/issues/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/report-api/issues/agencies`);
    }
}

export default new IssueDataService();
