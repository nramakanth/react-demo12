import { Welcome } from "../welcome/welcome";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Welcome />
    </ProtectedRoute>
  );
}
