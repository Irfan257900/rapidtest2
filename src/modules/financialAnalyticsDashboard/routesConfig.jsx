import React, { lazy } from "react";
import ProtectedRoute from "../../core/layout/protected.route";
import PageError from "../../core/layout/pageError";
import withSuspense from "../../core/shared/withSuspense";

const AnalyticsOverview = lazy(() => import("./AnalyticsOverview.jsx"));
const FinancialReports = lazy(() => import("./FinancialReports.jsx"));
const GoalsTracker = lazy(() => import("./GoalsTracker.jsx"));

const FinancialAnalyticsDashboardRoutesConfig = [
  {
    path: "financial-analytics",
    element: (
      <ProtectedRoute>
        {withSuspense(<AnalyticsOverview />)}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<AnalyticsOverview />),
      },
      {
        path: "reports",
        element: withSuspense(<FinancialReports />),
      },
      {
        path: "goals",
        element: withSuspense(<GoalsTracker />),
      },
    ],
    errorElement: <PageError />,
  },
];

export default FinancialAnalyticsDashboardRoutesConfig;
