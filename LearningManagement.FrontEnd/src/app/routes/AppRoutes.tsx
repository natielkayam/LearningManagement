import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { LoadingLayout } from "../providers/LoadingProvider";

const Landing = React.lazy(() =>
  import("../../domains/client").then((m) => ({ default: m.Landing }))
);

const Courses = React.lazy(() =>
  import("../../domains/courses").then((m) => ({ default: m.Courses }))
);

const AppRoutes = () => (
  <Suspense fallback={<LoadingLayout />}>
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="courses" element={<Courses />} />
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
