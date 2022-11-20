import { Link, useParams, Navigate, useRoutes, Outlet } from "react-router-dom";

const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
  { id: 3, name: "user 3" },
  { id: 4, name: "user 4" },
  { id: 5, name: "user 5" },
];

const HomePage = () => {
  return (
    <>
      <h2>Home page</h2>
      <Link to="users">User list page</Link>
    </>
  );
};

const UsersLayout = () => {
  return (
    <>
      <h2>Users Layout</h2>
      <Outlet />
    </>
  );
};

const UserListPage = () => {
  return (
    <>
      <h2>User list page</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/">Home page</Link>
    </>
  );
};

const UserPage = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>User Page</h2>
      <ul>
        <li>
          <Link to="/users">User list page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>UserId: {userId}</p>
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
  const nextUser =
    Number(userId) < users.length ? (Number(userId) + 1).toString() : 1;
  return (
    <>
      <h2>Edit user page</h2>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User profile page</Link>
        </li>
        <li>
          <Link to={`/users/${nextUser}/profile`}>Another user</Link>
        </li>
        <li>
          <Link to="/users">User List Page</Link>
        </li>
      </ul>
    </>
  );
};

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "users",
    element: <UsersLayout />,
    children: [
      { path: "", element: <UserListPage /> },
      { path: ":userId/edit", element: <EditUserPage /> },
      { path: ":userId/profile", element: <UserPage /> },
      { path: ":userId", element: <Navigate to="profile" /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="" />,
  },
];

function App() {
  const elements = useRoutes(routes);

  return (
    <>
      <h1>App</h1>
      {elements}
    </>
  );
}

export default App;
