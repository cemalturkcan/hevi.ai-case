export interface Study {
  patientName: string;
  mrn: string;
  studyDate: string;
  description: string;
  modality: string;
  accessionNumber: string;
  instances: number;
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
