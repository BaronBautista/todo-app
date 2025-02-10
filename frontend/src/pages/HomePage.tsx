import Notes from "../components/Notes";
import useAuthStore from "../stores/useAuthStore";

const HomePage = () => {
  const { logoutUser } = useAuthStore();

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="">Home Page</h1>
        <button className="bg-pink px-4 py-2 rounded-md" onClick={logoutUser}>
          Logout
        </button>

        <div className="h-screen flex justify-center items-start">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
