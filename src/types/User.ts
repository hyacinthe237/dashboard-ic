export default interface User {
  id: null;
  email: string;
  username: string;
  password: string;
  phone: string;
  image: string | Blob;
  is_kid: boolean;
  is_family: boolean;
  is_agency_admin: boolean;
  is_superuser: boolean;
}
