import ScrollVideo from "./components/ScrollVideo";
import TrakaUsluga from "./components/TrakaUsluga";
import ONama from "./components/ONama";
import PozivNaAkciju from "./components/PozivNaAkciju";


export default function Home() {
  return (
    <main>
      <ScrollVideo />
      <ONama />
      <TrakaUsluga />
      <PozivNaAkciju />
    </main>
  );
}