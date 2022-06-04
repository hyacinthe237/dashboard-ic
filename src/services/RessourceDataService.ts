import http from "@/http-common";

class RessourceDataService {
    getAll(): Promise<any> {
      return http.get("/ressource-api/ressources/");
    }
    get(id: any): Promise<any> {
      return http.get(`/ressource-api/ressources/${id}/`);
    }
    getRessourceDetail(id: any): Promise<any> {
      return http.get(`/ressource-api/ressources/${id}/detail/`);
    }
    create(data: any): Promise<any> {
      return http.post("/ressource-api/ressources/", data);
    }
    update(id: any, data: any): Promise<any> {
      return http.put(`/ressource-api/ressources/${id}/`, data);
    }
    delete(id: any): Promise<any> {
      return http.delete(`/ressource-api/ressources/${id}/`);
    }
    deleteAll(): Promise<any> {
      return http.delete(`/ressource-api/ressources/`);
    }
}

export default new RessourceDataService();
