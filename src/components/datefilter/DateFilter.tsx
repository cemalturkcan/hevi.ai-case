import "./style.css";
import React from "react";
import { TextFilterProps } from "@/types/types";
import { Calendar } from "primereact/calendar";

const DateFilter: React.FC<TextFilterProps> = ({
  options,
  filters,
  setFilters,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="calendar-container">
        <Calendar
          value={filters[options.field].constraints[0]?.value as Date}
          readOnlyInput
          dateFormat="yy-mm-dd"
          placeholder="Start Date"
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
                  filters[options.field].constraints[1],
                ],
              },
            });
          }}
        />
        {filters[options.field].constraints[0]?.value && (
          <i
            className="pi pi-times calendar-clear-icon"
            onClick={() => {
              setFilters({
                ...filters,
                [options.field]: {
                  ...filters[options.field],
                  constraints: [
                    {
                      ...filters[options.field].constraints[0],
                      value: null,
                    },
                    filters[options.field].constraints[1],
                  ],
                },
              });
            }}
          />
        )}
      </div>
      <div className="calendar-container">
        <Calendar
          value={filters[options.field].constraints[1]?.value as Date}
          showButtonBar={true}
          readOnlyInput
          dateFormat="yy-mm-dd"
          placeholder="End Date"
          onChange={(e) => {
            setFilters({
              ...filters,
              [options.field]: {
                ...filters[options.field],
                constraints: [
                  filters[options.field].constraints[0],
                  {
                    ...filters[options.field].constraints[1],
                    value: e.value,
                  },
                ],
              },
            });
          }}
        />
        {filters[options.field].constraints[1]?.value && (
          <i
            className="pi pi-times calendar-clear-icon"
            onClick={() => {
              setFilters({
                ...filters,
                [options.field]: {
                  ...filters[options.field],
                  constraints: [
                    filters[options.field].constraints[0],
                    {
                      ...filters[options.field].constraints[1],
                      value: null,
                    },
                  ],
                },
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DateFilter;
