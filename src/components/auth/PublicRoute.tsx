import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  if (!isInitialized) {
    return null;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
