import React, { lazy } from "react";
import ProtectedRoute from "../../core/layout/protected.route";
import PageError from "../../core/layout/pageError";
import withSuspense from "../../core/shared/withSuspense";

const MySchedules = lazy(() => import("./MySchedules.jsx"));
const CreateSchedule = lazy(() => import("./CreateSchedule.jsx"));
const ScheduleDetails = lazy(() => import("./ScheduleDetails.jsx"));

const SchedulingRoutesConfig = [
  {
    path: "scheduling",
    element:
      <ProtectedRoute>
        {withSuspense(<MySchedules />)}
      </ProtectedRoute>,
    errorElement: <PageError />,
    children: [
      {
        index: true,
        element:
          <ProtectedRoute>
            {withSuspense(<MySchedules />)}
          </ProtectedRoute>,
      },
      {
        path: "create",
        element:
          <ProtectedRoute>
            {withSuspense(<CreateSchedule />)}
          </ProtectedRoute>,
      },
      {
        path: ":scheduleId",
        element:
          <ProtectedRoute>
            {withSuspense(<ScheduleDetails />)}
          </ProtectedRoute>,
      },
    ],
  },
];

export default SchedulingRoutesConfig;
