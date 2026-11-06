import Filter from "./Filter";
import SortBy from "./SortBy";

export default function TableOperations() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "completed", label: "completed" },
          { value: "in-progress", label: "in progress" },
          { value: "failed", label: "failed" },
        ]}
      />

      <SortBy
        options={[
          {
            value: "candidateDateCreated-desc",
            label: "Timestamp (newest)",
          },
          {
            value: "candidateDateCreated-asc",
            label: "Timestamp (oldest)",
          },
        ]}
      />
    </div>
  );
}
