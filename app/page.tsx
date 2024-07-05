import Image from "next/image";
import MainComponent from "./components/MainComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <MainComponent/>
    </main>
  );
}
