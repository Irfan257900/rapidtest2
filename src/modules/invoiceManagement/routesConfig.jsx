import React, { lazy } from "react";
import ProtectedRoute from "../../core/layout/protected.route";
import PageError from "../../core/layout/pageError";
import withSuspense from "../../core/shared/withSuspense";

const InvoiceList = lazy(() => import("./InvoiceList.jsx"));
const CreateInvoice = lazy(() => import("./CreateInvoice.jsx"));
const InvoiceDetails = lazy(() => import("./InvoiceDetails.jsx"));

const InvoiceManagementRoutes = [
  {
    path: "invoices",
    element: (
      <ProtectedRoute>
        {withSuspense(<InvoiceList />)}
      </ProtectedRoute>
    ),
  },
  {
    path: "invoices/create",
    element: (
      <ProtectedRoute>
        {withSuspense(<CreateInvoice />)}
      </ProtectedRoute>
    ),
  },
  {
    path: "invoices/:id",
    element: (
      <ProtectedRoute>
        {withSuspense(<InvoiceDetails />)}
      </ProtectedRoute>
    ),
  },
];

export default InvoiceManagementRoutes;