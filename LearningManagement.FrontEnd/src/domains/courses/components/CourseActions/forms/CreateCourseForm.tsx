
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoading, useToast } from "../../../../../app/providers/hooks";
import { useCourseService } from "../../../hooks/useCourseService";
import { getCreateCourseSchema } from "../../../schemas/CourseSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CourseDto } from "../../../types/CourseDto";
import { useRef } from "react";

interface CreateCourseFormProps {
  onCompleted?: () => void;
}

export function CreateCourseForm({ onCompleted }: CreateCourseFormProps) {
  const { CreateCourse } = useCourseService();
  const { showSuccess, showError } = useToast();
  const { showLoading, hideLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseDto>({
    resolver: yupResolver<CourseDto>(getCreateCourseSchema()),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<CourseDto> = async (courseDto) => {
    try {
      showLoading();
    
      await CreateCourse(courseDto);
      showSuccess("Course created successfully");
      reset(); // Clear form after successful submission
      onCompleted?.(); // Trigger parent refresh
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : (err as string) || "Failed to create course";
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
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message || ""}
          label="Title"
          autoComplete="title"
          name="title"
          required
          fullWidth
          variant="standard"
          id="title"
          placeholder="Course Title"
          color={errors.title ? "error" : "primary"}
        />
      </FormControl>
      <FormControl>
        <TextField
          {...register("description")}
          required
          fullWidth
          id="description"
          placeholder="Course Description"
          label="Description"
          type="text"
          name="description"
          autoComplete="description"
          variant="standard"
          error={!!errors.description}
          helperText={errors.description?.message || ""}
          color={errors.description ? "error" : "primary"}
        />
      </FormControl>
      <Button type="submit" fullWidth variant="contained">
        Create Course
      </Button>
    </Box>
  );
}
