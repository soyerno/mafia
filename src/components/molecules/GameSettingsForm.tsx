import React from 'react';
import { GameSettings } from '../../types/game';
import Input from '../atoms/Input';
import { Users, Clock } from 'lucide-react';

interface GameSettingsFormProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export default function GameSettingsForm({
  settings,
  onSettingsChange,
}: GameSettingsFormProps) {
  const handleChange = (field: keyof GameSettings, value: number | boolean) => {
    onSettingsChange({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-4">
      <Input
        type="number"
        label="Number of Mafia Players"
        icon={Users}
        min={1}
        max={3}
        value={settings.mafiaCount}
        onChange={(e) => handleChange('mafiaCount', +e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          label="Night Duration (seconds)"
          icon={Clock}
          min={30}
          max={120}
          value={settings.nightDuration}
          onChange={(e) => handleChange('nightDuration', +e.target.value)}
        />
        <Input
          type="number"
          label="Day Duration (seconds)"
          icon={Clock}
          min={60}
          max={300}
          value={settings.dayDuration}
          onChange={(e) => handleChange('dayDuration', +e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.doctorEnabled}
            onChange={(e) => handleChange('doctorEnabled', e.target.checked)}
            className="rounded bg-gray-700/50 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300">Enable Doctor Role</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.detectiveEnabled}
            onChange={(e) => handleChange('detectiveEnabled', e.target.checked)}
            className="rounded bg-gray-700/50 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300">Enable Detective Role</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.allowConsecutiveHeals}
            onChange={(e) =>
              handleChange('allowConsecutiveHeals', e.target.checked)
            }
            className="rounded bg-gray-700/50 border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300">
            Allow Consecutive Healing
          </span>
        </label>
      </div>
    </div>
  );
}