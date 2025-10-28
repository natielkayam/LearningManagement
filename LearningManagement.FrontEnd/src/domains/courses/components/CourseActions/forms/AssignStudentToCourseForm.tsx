
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoading, useToast } from "../../../../../app/providers/hooks";
import { useCourseService } from "../../../hooks/useCourseService";
import { getAssignStudentToCourseSchema } from "../../../schemas/CourseSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { StudentDto } from "../../../types/StudentDto";
import { useRef } from "react";

interface AssignStudentToCourseFormProps {
  onCompleted?: () => void;
}

export function AssignStudentToCourseForm({ onCompleted }: AssignStudentToCourseFormProps) {
  const { AssignStudentToCourse } = useCourseService();
  const { showSuccess, showError } = useToast();
  const { showLoading, hideLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ courseId: string, student: StudentDto }>({
    resolver: yupResolver<{ courseId: string, student: StudentDto }>(getAssignStudentToCourseSchema()),
    defaultValues: { courseId: "", student: { id: "", name: "" } },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<{ courseId: string, student: StudentDto }> = async (data) => {
    try {
      showLoading();
    
      await AssignStudentToCourse(data.courseId, data.student);
      showSuccess("Student assigned to course successfully");
      reset(); // Clear form after successful submission
      onCompleted?.(); // Trigger parent refresh
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : (err as string) || "Failed to assign student to course";
      showError(errorMessage);    
    } finally {
      hideLoading();
    }
  };

  return (
    <Box
      component="form"
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl>
        <TextField
          {...register("courseId")}
          error={!!errors.courseId}
          helperText={errors.courseId?.message || ""}
          label="Course ID"
          autoComplete="courseId"
          required
          fullWidth
          variant="standard"
          id="courseId"
          placeholder="Enter Course ID"
          color={errors.courseId ? "error" : "primary"}
          type="text"
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("student.id")}
          error={!!errors.student?.id}
          helperText={errors.student?.id?.message || ""}
          label="Student ID"
          autoComplete="studentId"
          required
          fullWidth
          variant="standard"
          id="studentId"
          placeholder="Enter Student ID"
          color={errors.student?.id ? "error" : "primary"}
          type="text"
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("student.name")}
          error={!!errors.student?.name}
          helperText={errors.student?.name?.message || ""}
          label="Student Name"
          autoComplete="studentName"
          required
          fullWidth
          variant="standard"
          id="studentName"
          placeholder="Enter Student Name"
          color={errors.student?.name ? "error" : "primary"}
          type="text"
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        Assign Student to Course
      </Button>
    </Box>
  );
}
