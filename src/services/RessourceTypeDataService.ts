import http from "@/http-common";

class RessourceDataService {
    getAll(): Promise<any> {
      return http.get("/ressource-api/ressource-types/");
    }
    getResources(id: any): Promise<any> {
      return http.get(`/ressource-api/ressource-types/${id}/ressources`);
    }
    get(id: any): Promise<any> {
      return http.get(`/ressource-api/ressource-types/${id}/`);
    }
    getRessourceDetail(id: any): Promise<any> {
      return http.get(`/ressource-api/ressource-types/${id}/detail/`);
    }
    create(data: any): Promise<any> {
      return http.post("/ressource-api/ressource-types/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.put(`/ressource-api/ressource-types/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/ressource-api/ressource-types/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/ressource-api/ressource-types/`);
    }
}

export default new RessourceDataService();
