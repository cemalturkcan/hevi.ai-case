import React from "react";
import { InputText } from "primereact/inputtext";
import { TextFilterProps } from "@/types/types";

const TextFilter: React.FC<TextFilterProps> = ({
  options,
  filters,
  setFilters,
}) => {
  return (
    <InputText
      type={"search"}
      value={filters[options.field].constraints[0].value ?? ""}
      onChange={(e) => {
        setFilters({
          ...filters,
          [options.field]: {
            ...filters[options.field],
            constraints: [
              {
                ...filters[options.field].constraints[0],
                value: e.target.value,
              },
            ],
          },
        });
      }}
    />
  );
};

export default TextFilter;
