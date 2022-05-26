import http from "@/http-login";

class LoginDataService {
    login(data: any): Promise<any> {
      return http.post("/user-api/custom/login", data);
    }
}

export default new LoginDataService();
