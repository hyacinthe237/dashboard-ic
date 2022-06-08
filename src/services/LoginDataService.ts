import http from "@/http-common";

class LoginDataService {
    login(data: any): Promise<any> {
      return http.post("/user-api/custom/login", data);
    }
    forgot(data: any): Promise<any> {
      return http.post("/rest-auth/password/reset/", data);
    }
}

export default new LoginDataService();
