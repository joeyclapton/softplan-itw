import nextAuthOptions from "@/app/shared/types/next-auth-options";
import { getServerSession } from "next-auth";
import UsersTable from "@/components/UsersTable";
import MenuBar from "@/components/MenuBar";
import Header from "@/components/Header";

const AdminPage = async () => {
  const user = await getServerSession(nextAuthOptions);
  return (
    <main>
    {
        user && (
          <div>
            <Header user={user} />
            <MenuBar user={user} />
            <UsersTable user={user} />
          </div>
        )
      }
    </main>
  );
};

export default AdminPage;
