import { useState } from "react";
import {
  Grid,
  Button,
  Collapse,
  Box,
} from "@mui/material";
import { CreateCourseForm } from "./forms/CreateCourseForm";
import { UpdateCourseForm } from "./forms/UpdateCourseForm";
import { RemoveCourseForm } from "./forms/RemoveCourseForm";
import { AssignStudentToCourseForm } from "./forms/AssignStudentToCourseForm";
import { UnassignStudentFromCourseForm } from "./forms/UnassignStudentFromCourseForm";

interface CourseActionsFormProps {
  onActionCompleted?: () => void;
}

export function CourseActionsForm({ onActionCompleted }: CourseActionsFormProps) {
  const [openForm, setOpenForm] = useState<string | null>(null);

  const toggleForm = (formName: string) => {
    setOpenForm((current) => (current === formName ? null : formName));
  };

  const handleFormCompleted = () => {
    setOpenForm(null); // Close the form
    onActionCompleted?.(); // Trigger refresh
  };

  const buttons = [
    { label: "Create Course", key: "createCourse" },
    { label: "Update Course", key: "updateCourse" },
    { label: "Remove Course", key: "removeCourse" },
    { label: "Assign Student to Course", key: "assignStudentToCourse" },
    { label: "Unassign Student from Course", key: "unassignStudentFromCourse" },
  ];

  return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            {buttons.map(({ label, key }) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={key}
              >
                <Button
                  fullWidth
                  variant={openForm === key ? "contained" : "outlined"}
                  onClick={() => toggleForm(key)}
                >
                  {label}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Box mt={2}>
            <Collapse in={openForm === "createCourse"}>
              <CreateCourseForm onCompleted={handleFormCompleted} />
            </Collapse>
            <Collapse in={openForm === "updateCourse"}>
              <UpdateCourseForm onCompleted={handleFormCompleted} />
            </Collapse>
            <Collapse in={openForm === "removeCourse"}>
              <RemoveCourseForm onCompleted={handleFormCompleted} />
            </Collapse>
            <Collapse in={openForm === "assignStudentToCourse"}>
              <AssignStudentToCourseForm onCompleted={handleFormCompleted} />
            </Collapse>
            <Collapse in={openForm === "unassignStudentFromCourse"}>
              <UnassignStudentFromCourseForm onCompleted={handleFormCompleted} />
            </Collapse>
          </Box>
        </Box>
  );
}
