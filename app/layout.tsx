// import "./globals.css";

// export const metadata = {
//   title: "iCargo UI",
//   description: "Custom UI",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-white">{children}</body>
//     </html>
//   );
// }

"use client";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white">{children}</body>
    </html>
  );
}
