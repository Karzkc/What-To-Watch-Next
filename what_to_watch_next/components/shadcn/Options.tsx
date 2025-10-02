import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OptionsProps {
  params: string;
  label: string;
  values: string[];
  onValueChange?: (value: string) => void;
}

export function Options({ params, label, values, onValueChange }: OptionsProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] font-forum text-white">
        <SelectValue className="text-white font-bold" placeholder={params} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((val: string, idx: number) => (
            <SelectItem key={idx} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
