import { 
  Box,
} from '@mui/material';
import { Tabs } from "../../../shared/components/ui/Theme/Tabs/Tabs";
import type { Tab } from "../../../shared/components/ui/Theme/Tabs/Tabs";
import { useCourse } from "../hooks/useCourse";
import { CoursesListingTable } from './CoursesListing/CoursesListingTable';
import { EnrollmentsListingTable } from './EnrollmentsListing/EnrollmentsListingTable';
import { ResponsiveFormLayout } from '../../../shared/components/layouts';
import { FormSection } from '../../../shared/components/layouts';
import { CourseActionsForm } from './CourseActions/CourseActionsForm';
import { Reports } from './Reports/Reports';



export default function Courses() {

  const { courses, enrollments, reportData, error, refetch } = useCourse();

  const tabs: Tab[] = [
    {
      label: "Courses",
      content: (
      <FormSection title="Courses" description="List of courses">
        <CoursesListingTable courses={courses} error={error} />
      </FormSection>
      )
    },
    {
      label: "Enrollments",
      content: (
      <FormSection title="Enrollments" description="List of enrollments">
        <EnrollmentsListingTable enrollments={enrollments} error={error} />
      </FormSection>
      )
    },
    {
      label: "Course Management Actions",
      content: (
      <FormSection title="Course Management Actions" description="Perform actions on courses">
        <CourseActionsForm onActionCompleted={refetch} />
      </FormSection>
      )
    },
    {
      label: "Reports",
      content: (
        <FormSection title="Reports" description="reports on courses and enrollments">
          <Reports reportData={reportData} error={error} />
        </FormSection>
        )
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <ResponsiveFormLayout layout="single">
        <Tabs tabs={tabs} ariaLabel="courses and enrollments management tabs" />
      </ResponsiveFormLayout>
    </Box>
  );
}