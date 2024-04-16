import Login from "@/app/(auth-routes)/Login";
import { useAuth } from "../app/shared/context/AuthContext";
import HomeBack from "@/app/components/MenuBar2";

export default function Home() {
  return (
    <section className="flex h-screen items-center justify-center">
      <Login />
    </section>
  );
}
