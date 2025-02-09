import { Link } from "react-router-dom"

const LandingPage = () => {

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
       <h1 className="text-black text-3xl">Landing Page</h1>
       <div className="flex flex-col space-y-2 mt-2">
       <Link className="bg-pink px-4 py-2 rounded-md" to={"/login"}>Login</Link>
       <Link className="bg-pink px-4 py-2 rounded-md" to={"/register"}>Register</Link>
       </div>
    </div>
  )
}

export default LandingPage
