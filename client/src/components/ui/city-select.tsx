import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPinIcon } from "@/lib/icons";

// Popular cities in India for travel
const popularCities = [
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
  { value: "jaipur", label: "Jaipur" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "pune", label: "Pune" },
  { value: "goa", label: "Goa" },
  { value: "kochi", label: "Kochi" },
  { value: "varanasi", label: "Varanasi" },
  { value: "lucknow", label: "Lucknow" },
  { value: "agra", label: "Agra" },
  { value: "shimla", label: "Shimla" },
  { value: "manali", label: "Manali" },
  { value: "rishikesh", label: "Rishikesh" },
  { value: "amritsar", label: "Amritsar" },
  { value: "udaipur", label: "Udaipur" },
  { value: "darjeeling", label: "Darjeeling" },
  { value: "bhopal", label: "Bhopal" }
];

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CitySelect({
  value,
  onChange,
  placeholder = "Select a city",
  className,
  disabled = false
}: CitySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between bg-background border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2",
            className
          )}
        >
          <div className="flex items-center gap-2 text-left truncate">
            {value ? (
              <>
                <MapPinIcon className="h-4 w-4 text-primary" />
                {popularCities.find((city) => city.value === value.toLowerCase())?.label || value}
              </>
            ) : (
              <span className="text-muted-foreground flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                {placeholder}
              </span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search city..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {popularCities.map((city) => (
              <CommandItem
                key={city.value}
                value={city.value}
                onSelect={(currentValue) => {
                  onChange(city.label);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === city.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {city.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}