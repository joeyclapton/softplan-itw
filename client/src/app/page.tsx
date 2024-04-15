import Login from "@/components/Login";
import { useAuth } from "../app/shared/context/AuthContext";
import HomeBack from "@/components/HomeBack";

export default function Home() {
  return (
    <section className="flex justify-center items-center h-screen">
      <Login />
    </section>
  );
}
