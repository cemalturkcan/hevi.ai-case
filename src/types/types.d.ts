import { ColumnFilterElementTemplateOptions } from "primereact/column";

export interface Study {
  id: string;
  patientName: string;
  mrn: string;
  studyDate: string;
  studyDateFormatted?: Date;
  description: string;
  modality: string;
  accessionNumber: string;
  instances: number;
  dcm: string;
  details: StudyDetails[];
}

export interface StudyDetails {
  description: string;
  series: number;
  modality: string;
  instances: number;
}

export interface Studies {
  studies: Study[];
}

interface FilterConstraint {
  value: any;
}

interface Filter {
  constraints: FilterConstraint[];
}

type Filters = Record<string, Filter>;

type SetFilters = (filters: Filters) => void;

interface TextFilterProps {
  options: ColumnFilterElementTemplateOptions;
  setFilters: SetFilters;
  filters: Filters;
}
