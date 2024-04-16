"use client";

import { useRouter } from "next/navigation";
import ChangePassword from "../ChangePassword";
import CreateAndEditUser from "../CreateAndEditUser";
import { signOut } from "next-auth/react";

const MenuBar = (user) => {
  const router = useRouter();
  const isAdmin = user?.user?.isAdmin;

  const onLogout = async () => {
    await signOut({
      redirect: false,
    });
    router.replace("/");
  };

  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
        <div className={`grid h-full max-w-lg mx-auto ${isAdmin ? "grid-cols-3" : "grid-cols-2"}`}>
          <ChangePassword user={user}>
            <button
              data-tooltip-target="tooltip-profile"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <svg
                className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <span className="sr-only">Profile</span>
            </button>
          </ChangePassword>
          {isAdmin ? (
            <CreateAndEditUser user={user.user} action="create">
              <div className="flex items-center justify-center">
                <button
                  data-tooltip-target="tooltip-new"
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 font-medium g-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                  <span className="sr-only">New item</span>
                </button>
              </div>
            </CreateAndEditUser>
          ) : (
            ""
          )}

          <button
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            onClick={async () => {
              await onLogout();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-blue-500"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                clip-rule="evenodd"
              />
            </svg>

            <span className="sr-only">Logoff</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
