import type { GridColDef } from "@mui/x-data-grid";

export const getCoursesColumns = (): GridColDef[] => [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
];

