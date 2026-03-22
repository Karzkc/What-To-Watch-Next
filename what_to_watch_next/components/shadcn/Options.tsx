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
      <SelectTrigger className="w-[150px] p-2 border-purple-500 font-forum font-[12px] text-white cp">
        <SelectValue className="text-white font-bold" placeholder={params} />
      </SelectTrigger>
      <SelectContent className="bg-[#0f172a] border border-white/10 text-white">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((val: string, idx: number) => (
            <SelectItem key={idx} value={val} className="cp "> 
              {val}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
