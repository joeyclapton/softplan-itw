import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UsersTable from "@/components/UsersTable";
import MenuBar from "@/components/MenuBar";

const AdminPage = async () => {
  const user = await getServerSession(nextAuthOptions);
  return (
    <div>
      {
        user && (
          <>
            <header className="p-8">
              <h4 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hello, </span>
                <span>{user.name}</span>
              </h4>
            </header>

            <MenuBar user={user} />
            <UsersTable user={user} />
          </>
        )
      }
    </div>
  );
};

export default AdminPage;
