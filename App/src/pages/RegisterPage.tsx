import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Zod schemas
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  async function handleSubmit1(e: any) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        alert("Account Created");
        form.reset();
      } else {
        alert("Account already exists");
      }
    } catch (err) {
      console.log("Error while sending data");
    }
  }

  async function handleSubmit2(e: any) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      alert(parsed.error.errors[0].message);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(parsed.data),
      });

      const backendData = await res.json();
      if (res.ok) {
        localStorage.setItem("token", backendData.token);
        localStorage.setItem("userId", backendData.userID);
        localStorage.setItem("username", backendData.username); // for displaying in account
        localStorage.setItem("email", backendData.email);       // for displaying in account
        alert("Logged in Successfully");
        navigate("/HomePage");
      }
      else {
        alert("Login failed");
      }
    } catch (err) {
      console.log("Error while sending data");
    }
  }

  return (
    <div className="flex">
      {/* Left Section */}
      <div className="h-screen w-[30vw] bg-slate-300 ml-32 flex flex-col justify-center items-center">
        <div>
          <div className="text-3xl font-semibold">
            <h1>
              Welcome to{" "}
              <span className="text-3xl text-blue-400">Second Brain</span>
            </h1>
          </div>
          <div className="text-2xl font-semibold">Create your account</div>
          <form onSubmit={handleSubmit1} className="mt-7 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              className="outline-none h-12 w-[22vw] rounded-lg p-2 hover:bg-slate-100"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="outline-none h-12 w-[22vw] rounded-lg p-2 hover:bg-slate-100"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="outline-none h-12 w-[22vw] rounded-lg p-2 hover:bg-slate-100"
            />
            <button className="bg-blue-400 px-4 py-2 rounded-2xl font-semibold hover:bg-blue-500">
              Create my Account
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="h-screen w-[15vw] flex justify-center items-center">
        <span className="bg-blue-500 px-4 py-3 rounded-full text-white text-2xl">
          OR
        </span>
      </div>

      {/* Right Section */}
      <div className="flex flex-col h-screen justify-center">
        <div className="text-2xl font-semibold">Login your account</div>
        <form onSubmit={handleSubmit2} className="flex flex-col gap-3 mt-7">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200 block shadow-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="outline-none h-12 w-[22vw] rounded-lg p-2 bg-slate-100 hover:bg-slate-200 block shadow-md"
          />
          <button className="bg-blue-400 px-4 py-2 rounded-2xl font-semibold hover:bg-blue-500 shadow-md mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
