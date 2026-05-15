import { TubesCursor } from "@/components/ui/tube-cursor";

export default function DemoOne() {
  return (
    <div className="bg-black">
      <TubesCursor
        title="Tubes"
        subtitle="Cursor"
        caption="Click to Change - by Rahil Vahora"
        initialColors={["#00D9FF", "#7C3AED", "#CF30AA"]}
        lightColors={["#ffff00", "#ff00ff", "#00ffff", "#ffffff"]}
        lightIntensity={250}
        titleSize="text-[70px]"
        subtitleSize="text-[50px]"
        captionSize="text-lg"
        enableRandomizeOnClick
      />
    </div>
  );
}
