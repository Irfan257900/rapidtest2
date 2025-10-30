import React, { lazy } from "react";
import ProtectedRoute from "../../core/layout/protected.route";
import PageError from "../../core/layout/pageError";
import withSuspense from "../../core/shared/withSuspense";

const Support = lazy(() => import("./Support.jsx"));
const CreateTicket = lazy(() => import("./CreateTicket.jsx"));
const MyTickets = lazy(() => import("./MyTickets.jsx"));
const TicketQueue = lazy(() => import("./TicketQueue.jsx"));
const TicketDetails = lazy(() => import("./TicketDetails.jsx"));

const SupportRoutesConfig = [
  {
    path: "support",
    element: (
      <ProtectedRoute>
        {withSuspense(<Support />)}
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<MyTickets />),
      },
      {
        path: "create",
        element: withSuspense(<CreateTicket />),
      },
      {
        path: "myTickets",
        element: withSuspense(<MyTickets />),
      },
      {
        path: "ticketQueue",
        element: withSuspense(<TicketQueue />),
      },
      {
        path: "tickets/:ticketId",
        element: withSuspense(<TicketDetails />),
      },
    ],
    errorElement: <PageError />,
  },
];

export default SupportRoutesConfig;