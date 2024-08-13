import React from "react";
import { DropdownFilterProps } from "@/types/types";
import { Dropdown } from "primereact/dropdown";
import "./style.css";

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  filters,
  setFilters,
  values,
}) => {
  return (
    <div className="flex justify-content-center">
      <Dropdown
        type={"search"}
        className="w-full"
        options={values}
        showClear={filters[options.field].constraints[0].value}
        value={filters[options.field].constraints[0].value ?? ""}
        onChange={(e) => {
          setFilters({
            ...filters,
            [options.field]: {
              ...filters[options.field],
              constraints: [
                {
                  ...filters[options.field].constraints[0],
                  value: e.value,
                },
              ],
            },
          });
        }}
      />
    </div>
  );
};

export default DropdownFilter;
