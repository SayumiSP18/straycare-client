import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-5xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-500">This page wandered off. Let's get you back home.</p>
      <Link to="/" className="btn-primary mt-8">Go to home</Link>
    </div>
  );
}
