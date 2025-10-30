import { appClientMethods } from "../../core/httpClients";
import { deriveErrorMessage } from "../../core/shared/deriveErrorMessage";

const schedulingBaseUrl = 'scheduling/payments';
const payeesBaseUrl = 'payees';

export const createScheduledPayment = async (onSuccess, onError, data) => {
  try {
    const response = await appClientMethods.post(schedulingBaseUrl, data);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const fetchScheduledPayments = async (onSuccess, onError) => {
  try {
    const response = await appClientMethods.get(`${schedulingBaseUrl}/my`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const fetchScheduledPaymentDetails = async (onSuccess, onError, scheduleId) => {
  try {
    const response = await appClientMethods.get(`${schedulingBaseUrl}/${scheduleId}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const updateScheduledPaymentStatus = async (onSuccess, onError, scheduleId, statusData) => {
  try {
    const response = await appClientMethods.patch(`${schedulingBaseUrl}/${scheduleId}/status`, statusData);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const fetchPayees = async (onSuccess, onError) => {
  try {
    const response = await appClientMethods.get(payeesBaseUrl);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const fetchScheduledPaymentHistory = async (onSuccess, onError, scheduleId) => {
    try {
      const response = await appClientMethods.get(`${schedulingBaseUrl}/${scheduleId}/history`);
      onSuccess(response);
    } catch (error) {
      onError(error.message);
    }
  };