import http from "@/http-common";

class KidDataService {
    getAll(): Promise<any> {
      return http.get("/user-api/kids/");
    }
    getAllMedicalInfos(): Promise<any> {
      return http.get("/user-api/medical-infos/");
    }
    get(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/`);
    }
    getKidDetail(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/detail`);
    }
    getMedicalInfos(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/medical-infos`);
    }
    create(data: any): Promise<any> {
      return http.post("/user-api/kids/", data);
    }
    uploadDocMedical(id: any, data: any): Promise<any> {
      return http.post(`/user-api/kids/${id}/upload-doc-medical-info`, data);
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
