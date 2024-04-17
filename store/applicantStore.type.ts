export interface Applicant {
  name: String;
  email: String;
  inviteId: String;
  loading: boolean;
}

export type ApplicantStoreType = {
  name: String;
  email: String;
  inviteId: String;
  loading: boolean;
  logIn: (applicant: Applicant) => void;
  logOut: () => void;
  setLoading: (loading: boolean) => void;
  isLoggedIn: () => boolean;
};
