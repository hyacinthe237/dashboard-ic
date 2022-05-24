import http from "@/http-common";

class SchoolDataService {
    getSchoolInfos(id: any): Promise<any> {
      return http.get(`/user-api/kids/${id}/school-infos`);
    }
    uploadDocSchool(id: any, data: any): Promise<any> {
      return http.post(`/user-api/kids/${id}/upload-doc-school-info`, data);
    }
    }
}

export default new SchoolDataService();
