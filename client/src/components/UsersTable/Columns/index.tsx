import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import CreateAndEditUser from "../../CreateAndEditUser";
import { useAtom } from "jotai";
import {
  deleteUser,
  usersAtom,
} from "@/app/shared/state/usersState";
import { IUser } from "@/app/shared/interfaces/user";
import { ColumnDef } from "@tanstack/react-table";

type Props = {
  user: IUser, 
}

const columns = ({ user }: Props) => {
  const isAdmin = user?.isAdmin;
  const [_, setUsers] = useAtom(usersAtom);

  const actions: ColumnDef<IUser> = {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { id, name } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <CreateAndEditUser user={row.original} action="edit">
              <span className="block text-sm px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                Edit
              </span>
            </CreateAndEditUser>
            <span
              className="block text-sm px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              onClick={() => {
                try {
                  
                  id && deleteUser(id)(setUsers);
                  toast(`${name} has been removed`, {
                    icon: "✅",
                  });
                } catch (error) {
                  toast.error("Error on remove user, try again...");
                }
              }}
            >
              Delete
            </span>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "avatar",
      header: "Profile",
      cell: ({ row }) => (
        <div className="capitalize">
          <Avatar>
            <AvatarImage src={`${row.getValue("avatar")}`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "job",
      header: () => <div>Job</div>,
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("job")}</div>;
      },
    },
  ];

  return isAdmin ? [...columns, actions] : columns;
};

export default columns;
