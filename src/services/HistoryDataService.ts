import http from "@/http-common";

class HistoryDataService {
    getPlacementInfos(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/placement-histories`);
    }
    uploadDocPlacement(id: any, data: any): Promise<any> {
      return http.post(`/user-api/kids/${id}/upload-doc-placement-history`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/user-api/placement-histories/${id}/`);
    }
}

export default new HistoryDataService();
