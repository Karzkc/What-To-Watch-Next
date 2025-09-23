import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Options({ params, label, values }: any) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={params} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {
            values.map((val: any, idx: number) => (
              <SelectItem key={idx} value={val}>
                {val}
              </SelectItem>
            ))
          }

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
