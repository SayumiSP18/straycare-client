import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "./TextField";
import { useAppDispatch } from "../../hooks/useAppRedux";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../store/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) navigate("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required />
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button className="btn-primary w-full" disabled={loading}>{loading ? "Logging in…" : "Log in"}</button>
    </form>
  );
}