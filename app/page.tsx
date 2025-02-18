import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar/>
      <h1 className="text-center">
        Hello
      </h1>
    </main>
  );
}
