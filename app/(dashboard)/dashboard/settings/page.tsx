import SettingsHeader from "@/components/settings/SettingsHeader";
import GeneralSettings from "@/components/settings/GeneralSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import DangerZone from "@/components/settings/DangerZone";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <SettingsHeader />
      <GeneralSettings />
      <SecuritySettings />
      <NotificationSettings />
      <DangerZone />
    </div>
  );
}
