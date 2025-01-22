import { NavLink, Outlet } from "react-router";

const App = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full bg-gray-800 text-white p-4">
        <h1 className="text-4xl">Host Application</h1>
        <div className="flex gap-2">
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : ""}`}
            to="/remote"
          >
            Build Time Remote
          </NavLink>
          <NavLink to="/dynamicRemote">Runtime Remote</NavLink>
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
