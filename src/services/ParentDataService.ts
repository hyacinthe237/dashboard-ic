import http from "@/http-common";

class ParentDataService {
    getParentInfos(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/parent-infos`);
    }
    uploadDocParent(id: any, data: any): Promise<any> {
      return http.post(`/user-api/kids/${id}/upload-doc-parent-info`, data);
    }
}

export default new ParentDataService();
