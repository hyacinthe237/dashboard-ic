import http from "@/http-common";

class MedicalDataService {
    getAllMedicalInfos(): Promise<any> {
      return http.get("/user-api/medical-infos/");
    }
    getMedicalInfos(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/medical-infos`);
    }
    uploadDocMedical(id: any, data: any): Promise<any> {
      return http.post(`/user-api/kids/${id}/upload-doc-medical-info`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/user-api/medical-infos/${id}/`);
    }
}

export default new MedicalDataService();
