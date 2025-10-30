import { appClientMethods, uploadClientMethods } from "../../core/http.clients";
import { deriveErrorMessage } from "../../core/shared/deriveErrorMessage";

const invoiceBaseUrl = 'invoices/';

export const fetchInvoiceDetails = async (onSuccess, onError, invoiceId) => {
  try {
    const response = await appClientMethods.get(`${invoiceBaseUrl}${invoiceId}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message);
  }
};

export const uploadFile = async (onSuccess, onError, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await uploadClientMethods.post('uploadfile', formData);
    onSuccess(response.url);
  } catch (error) {
    onError(error.message);
  }
};