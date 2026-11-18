import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PawPrint } from "lucide-react";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../hooks/useAppRedux";
import { clearMessages } from "../store/authSlice";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const switchTo = (m: "login" | "register") => { dispatch(clearMessages()); setMode(m); };

  return (
    <div className="container-page grid min-h-[75vh] items-center gap-10 py-12 lg:grid-cols-2">
      <div className="hidden rounded-3xl bg-golden-100 p-12 lg:block">
        <PawPrint className="h-12 w-12 text-golden-600" />
        <h1 className="mt-6 text-4xl font-bold">Find your new best friend.</h1>
        <p className="mt-3 text-ink-700">Adopt, foster or volunteer with StrayCare today.</p>
      </div>
      <div className="card mx-auto w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 grid grid-cols-2 rounded-xl bg-ink-100 p-1" role="tablist">
          {(["login", "register"] as const).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => switchTo(m)}
              className={`rounded-lg py-2 text-sm font-bold ${mode === m ? "bg-ink-900 text-white" : "text-ink-700"}`}>
              {m === "login" ? "Log in" : "Register"}
            </button>
          ))}
        </div>
        <h2 className="mb-5 text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
