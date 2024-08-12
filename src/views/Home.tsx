import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import data from "@/assets/dummy/data.json";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Filters, SetFilters, Studies, Study } from "@/types/types";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import TextFilter from "@/components/TextFilter.tsx";
import DateFilter from "@/components/datefilter/DateFilter.tsx";

const defaultFilters: DataTableFilterMeta = {
  patientName: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  studyDateFormatted: {
    operator: FilterOperator.AND,
    constraints: [
      { value: null, matchMode: FilterMatchMode.DATE_AFTER },
      { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
    ],
  },

  mrn: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },

  description: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  modality: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
  accessionNumber: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
};

function Home() {
  const [typedData] = useState<Studies>(data as Studies);
  typedData.studies.map((study) => {
    const date = new Date(study.studyDate);
    date.setDate(date.getDate() + 1);
    study.studyDateFormatted = date;
    return study;
  });

  const { t } = useTranslation();
  const [expandedRows, setExpandedRows] = useState<Study[]>([]);
  function onRowToggle(e: Study[]) {
    setExpandedRows(e);
  }

  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);

  const initFilters = () => {
    setFilters(defaultFilters);
  };

  useEffect(() => {
    initFilters();
  }, []);

  const rowExpansionTemplate = (data: Study) => {
    return (
      <div className="p-3">
        <DataTable value={data.details}>
          <Column field="description" header="description"></Column>
          <Column field="series" header="series"></Column>
          <Column field="modality" header="modality"></Column>
          <Column field="instances" header="instances"></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <>
      <DataTable
        paginator
        rows={10}
        filterDisplay="row"
        value={typedData.studies}
        filters={filters}
        rowExpansionTemplate={rowExpansionTemplate}
        onFilter={(e) => {
          setFilters(e.filters);
        }}
        expandedRows={expandedRows}
        onRowToggle={(e) => {
          onRowToggle(e.data as Study[]);
        }}
        dataKey="id"
      >
        <Column expander={true} style={{ width: "5rem" }} />
        <Column
          field="patientName"
          header={t("patientName")}
          sortable
          filter
          showFilterMenu={false}
          sortField={"patientName"}
          filterElement={(options) => (
            <TextFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />

        <Column
          field="mrn"
          header={t("mrn")}
          sortable
          showFilterMenu={false}
          filter
          filterElement={(options) => (
            <TextFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />
        <Column
          field="studyDate"
          header={t("studyDate")}
          sortable
          sortField={"studyDateFormatted"}
          filter
          dataType="date"
          filterField={"studyDateFormatted"}
          showFilterMenu={false}
          filterElement={(options) => (
            <DateFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />

        <Column
          field="description"
          header={t("description")}
          sortable
          filter
          showFilterMenu={false}
          filterElement={(options) => (
            <TextFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />
        <Column
          field="modality"
          header={t("modality")}
          sortable
          filter
          showFilterMenu={false}
          filterElement={(options) => (
            <TextFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />
        <Column
          field="accessionNumber"
          header={t("accessionNumber")}
          sortable
          showFilterMenu={false}
          filter
          filterElement={(options) => (
            <TextFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />
        <Column
          field="instances"
          showFilterMenu={false}
          header={t("instances")}
          filterElement={(options) => (
            <TextFilter
              options={options}
              filters={filters as Filters}
              setFilters={setFilters as SetFilters}
            />
          )}
        />
      </DataTable>
    </>
  );
}

export default Home;
