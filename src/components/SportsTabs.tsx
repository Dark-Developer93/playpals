import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface Sport {
  value: string;
  label: string;
}

type SportsTabsProps = {
  activeValue: string;
  handleSportChange: (value: string) => void;
};

// TODO: Add icon to each sport
const sports: Sport[] = [
  { value: 'football', label: 'Football' },
  { value: 'basketball', label: 'Basketball' },
  { value: 'tennis', label: 'Tennis' },
];

const SportsTabs = ({ activeValue, handleSportChange }: SportsTabsProps) => {
  return (
    <Tabs defaultValue={activeValue} className="self-center">
      <TabsList className="bg-secondary flex w-fit justify-center gap-4 text-white">
        {sports.map((sport) => (
          <TabsTrigger
            key={sport.value}
            value={sport.value}
            onClick={() => handleSportChange(sport.value)}
          >
            {sport.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default SportsTabs;
