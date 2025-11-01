import { appClientMethods } from "../../core/http.clients";

const API_PREFIX = 'api/analytics/';

export const getAnalyticsOverview = async (onSuccess, onError, startDate, endDate) => {
  try {
    const response = await appClientMethods.get(`${API_PREFIX}overview?startDate=${startDate}&endDate=${endDate}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const getTransactionData = async (onSuccess, onError, startDate, endDate) => {
  try {
    const response = await appClientMethods.get(`${API_PREFIX}transactions?startDate=${startDate}&endDate=${endDate}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const getSpendingCategories = async (onSuccess, onError, startDate, endDate) => {
  try {
    const response = await appClientMethods.get(`${API_PREFIX}categories?startDate=${startDate}&endDate=${endDate}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const getIncomeVsExpenses = async (onSuccess, onError, startDate, endDate) => {
  try {
    const response = await appClientMethods.get(`${API_PREFIX}trends?startDate=${startDate}&endDate=${endDate}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const getFinancialGoals = async (onSuccess, onError, startDate, endDate) => {
  try {
    const response = await appClientMethods.get(`${API_PREFIX}goals?startDate=${startDate}&endDate=${endDate}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const createUpdateGoal = async (onSuccess, onError, data) => {
  try {
    const response = await appClientMethods.post(`${API_PREFIX}goals`, data);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const generateReport = async (onSuccess, onError, type, startDate, endDate) => {
  try {
    const response = await appClientMethods.get(`${API_PREFIX}reports/${type}?startDate=${startDate}&endDate=${endDate}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const exportData = async (onSuccess, onError, type, format, startDate, endDate) => {
  try {
    // Assuming the API returns a URL for the exported data
    const response = await appClientMethods.post(`${API_PREFIX}export`, { type, format, startDate, endDate });
    onSuccess(response);
    //window.open(response.url, '_blank'); // Open the exported file in a new tab
  } catch (error) {
    onError(error.message);
  }
};
