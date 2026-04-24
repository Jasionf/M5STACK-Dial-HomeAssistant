import { ExpiryTracker } from "./components/ExpiryCard";

export default function App() {
  return (
    <div
      className="size-full flex items-center justify-center min-h-screen"
      style={{ background: "#0a0a0a" }}
    >
      <ExpiryTracker />
    </div>
  );
}
