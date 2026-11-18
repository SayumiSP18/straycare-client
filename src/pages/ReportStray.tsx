import ReportForm from "../components/forms/ReportForm";

export default function ReportStray() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-4xl font-bold">Report a stray</h1>
      <p className="mb-8 mt-2 text-ink-500">Tell us where the animal is and how it looks. Rescuers will see your report straight away.</p>
      <ReportForm />
    </div>
  );
}
