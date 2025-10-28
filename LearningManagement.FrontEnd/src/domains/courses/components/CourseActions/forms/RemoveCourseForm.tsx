
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoading, useToast } from "../../../../../app/providers/hooks";
import { useCourseService } from "../../../hooks/useCourseService";
import { getRemoveCourseSchema } from "../../../schemas/CourseSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";

interface RemoveCourseFormProps {
  onCompleted?: () => void;
}

export function RemoveCourseForm({ onCompleted }: RemoveCourseFormProps) {
  const { RemoveCourse } = useCourseService();
  const { showSuccess, showError } = useToast();
  const { showLoading, hideLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ courseId: string }>({
    resolver: yupResolver<{ courseId: string }>(getRemoveCourseSchema()),
  });

  const formRef = useRef<HTMLFormElement>(null);

    const onSubmit: SubmitHandler<{ courseId: string }> = async ({ courseId }) => {
    try {
      showLoading();
    
      await RemoveCourse(courseId);
      showSuccess("Course removed successfully");
      reset(); // Clear form after successful submission
      onCompleted?.(); // Trigger parent refresh
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : (err as string) || "Failed to remove course";
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
          placeholder="Course ID"
          color={errors.courseId ? "error" : "primary"}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        Remove Course
      </Button>
    </Box>
  );
}
