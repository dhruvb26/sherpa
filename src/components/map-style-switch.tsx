import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface MapStyleSwitchProps {
  onToggle: (enabled: boolean) => void;
}

export function MapStyleSwitch({ onToggle }: MapStyleSwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="dark-mode" onCheckedChange={onToggle} />
    </div>
  );
}
