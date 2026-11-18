export default function Logo({ size = 64 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="StrayCare logo"
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover"
    />
  );
}


// import { useState } from "react";
// import { PawPrint } from "lucide-react";

// // Put your logo at public/logo.png. Until it exists, a paw icon is shown.
// export default function Logo({ size = 64 }: { size?: number }) {
//   const [missing, setMissing] = useState(false);
//   return (
//     <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
//       <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden="true">
//         <circle cx="50" cy="50" r="48" className="fill-ink-900 stroke-golden-500" strokeWidth="2" />
//         <path id="logo-arc" d="M 9 50 A 41 41 0 0 1 91 50" fill="none" />
//         <text className="fill-golden-300" fontSize="13" fontWeight="700" letterSpacing="1.5">
//           <textPath href="#logo-arc" startOffset="50%" textAnchor="middle">take me home</textPath>
//         </text>
//       </svg>
//       <span className="absolute left-1/2 top-[56%] flex h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full bg-cream">
//         {missing ? <PawPrint className="h-1/2 w-1/2 text-golden-600" /> : (
//           <img src="/OIP (2).webp" alt="StrayCare logo" className="h-full w-full object-cover" onError={() => setMissing(true)} />
//         )}
//       </span>
//     </span>
//   );
// }
