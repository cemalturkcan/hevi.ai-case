import { DataTable } from "primereact/datatable";

import data from "@/assets/dummy/data.json";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Studies, Study } from "@/types/types";

function Home() {
  const typedData = data as Studies;
  const { t } = useTranslation();
  const [expandedRows, setExpandedRows] = useState<Study[]>([]);
  function onRowToggle(e: Study[]) {
    setExpandedRows(e);
  }

  return (
    <div>
      <DataTable
        value={typedData.studies}
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          onRowToggle(e.data as Study[]);
        }}
        dataKey="id"
      >
        <Column expander={true} style={{ width: "5rem" }} />
        <Column field="patientName" header={t("patientName")} />
        <Column field="mrn" header={t("mrn")} />
        <Column field="studyDate" header={t("studyDate")} />
        <Column field="description" header={t("description")} />
        <Column field="modality" header={t("modality")} />
        <Column field="accessionNumber" header={t("accessionNumber")} />
        <Column field="instances" header={t("instances")} />
      </DataTable>
    </div>
  );
}

export default Home;
