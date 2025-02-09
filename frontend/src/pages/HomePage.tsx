import useAuthStore from "../stores/useAuthStore";


const HomePage = () => {
  const { logoutUser } = useAuthStore();
  // const { newNote } = addNote();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center ">
      <h1 className="">Home Page</h1>
      <button className="bg-pink px-4 py-2 rounded-md" onClick={logoutUser}>
        Logout
      </button>
      {/* <button className="bg-brown2 px-4 py-2 rounded-md" onClick={newNote}>
        Add new Note
      </button> */}
    </div>
  );
};

export default HomePage;
