import { IUser } from "@/app/shared/interfaces/user"

type Props = {
    user: IUser
}

const Header = ({ user }: Props) => (
    <header className="p-8">
    <h4 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hello, </span>
      <span data-testid="profile-name">{user.name}</span>
    </h4>
  </header>
)

export default Header