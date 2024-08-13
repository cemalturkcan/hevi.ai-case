import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import data from "@/assets/dummy/data.json";
import { Column, ColumnBodyOptions } from "primereact/column";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Filters, SetFilters, Studies, Study } from "@/types/types";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import TextFilter from "@/components/TextFilter.tsx";
import DateFilter from "@/components/datefilter/DateFilter.tsx";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

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
      <div className="flex flex-column gap-3">
        <div className="">
          <Link to={`/viewer/${data.id}`}>
            <Button
              label={t("basicViewer")}
              icon={"pi pi-arrow-right"}
              iconPos={"right"}
            />
          </Link>
        </div>
        <DataTable value={data.details}>
          <Column field="description" header="description"></Column>
          <Column field="series" header="series"></Column>
          <Column field="modality" header="modality"></Column>
          <Column field="instances" header="instances"></Column>
        </DataTable>
      </div>
    );
  };

  const bodyTemplate = (rowData: Study, options: ColumnBodyOptions) => {
    return (
      <div className="white-space-nowrap overflow-hidden text-overflow-ellipsis">
        {rowData[options.field as keyof Study] as string}
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
          style={{ maxWidth: "300px", minWidth: "300px" }}
          body={(rowData, options) => bodyTemplate(rowData as Study, options)}
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
          style={{ maxWidth: "300px", minWidth: "300px" }}
          body={(rowData, options) => bodyTemplate(rowData as Study, options)}
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
          style={{ maxWidth: "400px", minWidth: "400px" }}
          body={(rowData, options) => bodyTemplate(rowData as Study, options)}
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
          style={{ maxWidth: "300px", minWidth: "300px" }}
          body={(rowData, options) => bodyTemplate(rowData as Study, options)}
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
          style={{ maxWidth: "300px", minWidth: "300px" }}
          body={(rowData, options) => bodyTemplate(rowData as Study, options)}
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
          style={{ maxWidth: "300px", minWidth: "300px" }}
          body={(rowData, options) => bodyTemplate(rowData as Study, options)}
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
          style={{ minWidth: "100px" }}
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
