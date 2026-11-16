import { useAppSelector } from "./useAppRedux";

export const useAuth = () => {
  const { user, loading, error, notice } = useAppSelector((s) => s.auth);
  return { user, loading, error, notice, isLoggedIn: !!user };
};
