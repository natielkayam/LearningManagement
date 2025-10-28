
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoading, useToast } from "../../../../../app/providers/hooks";
import { useCourseService } from "../../../hooks/useCourseService";
import { getUnassignStudentFromCourseSchema } from "../../../schemas/CourseSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";

interface UnassignStudentFromCourseFormProps {
  onCompleted?: () => void;
}

export function UnassignStudentFromCourseForm({ onCompleted }: UnassignStudentFromCourseFormProps) {
  const { UnassignStudentFromCourse } = useCourseService();
  const { showSuccess, showError } = useToast();
  const { showLoading, hideLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ courseId: string, studentId: string }>({
    resolver: yupResolver<{ courseId: string, studentId: string }>(getUnassignStudentFromCourseSchema())
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<{ courseId: string, studentId: string }> = async (data) => {
    try {
      showLoading();
    
      await UnassignStudentFromCourse(data.courseId, data.studentId);
      showSuccess("Student unassigned from course successfully");
      reset(); // Clear form after successful submission
      onCompleted?.(); // Trigger parent refresh
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : (err as string) || "Failed to unassign student from course";
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
          name="courseId"
          required
          fullWidth
          variant="standard"
          id="courseId"
          placeholder="Enter Course ID"
          color={errors.courseId ? "error" : "primary"}
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("studentId")}
          error={!!errors.studentId}
          helperText={errors.studentId?.message || ""}
          label="Student ID"
          autoComplete="studentId"
          name="studentId"
          required
          fullWidth
          variant="standard"
          id="studentId"
          placeholder="Enter Student ID"
          color={errors.studentId ? "error" : "primary"}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        Unassign Student from Course
      </Button>
    </Box>
  );
}
