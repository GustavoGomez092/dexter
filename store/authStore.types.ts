import { User } from "firebase/auth";

export type AuthStoreType = {
  user: User,
  isLogged: boolean,
  loading: boolean,
  logIn: (user:User) => void,
  logOut: () => void,
  setUser: (user:User) => void,
  setLoading: (loading:boolean) => void,
}
