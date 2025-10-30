import { appClientMethods } from '../../core/http.clients';
import { deriveErrorMessage } from '../../core/shared/deriveErrorMessage';

const supportBaseUrl = 'support/';

export const createTicket = async (onSuccess, onError, data) => {
  try {
    const response = await appClientMethods.post(`${supportBaseUrl}tickets`, data);
    onSuccess(response);
  } catch (error) {
    onError(error.message || 'Failed to create ticket');
  }
};

export const getTicketDetails = async (onSuccess, onError, ticketId) => {
  try {
    const response = await appClientMethods.get(`${supportBaseUrl}tickets/${ticketId}`);
    onSuccess(response);
  } catch (error) {
    onError(error.message || 'Failed to get ticket details');
  }
};

export const addReply = async (onSuccess, onError, ticketId, text) => {
  try {
    const response = await appClientMethods.post(`${supportBaseUrl}tickets/${ticketId}/replies`, { text });
    onSuccess(response);
  } catch (error) {
    onError(error.message || 'Failed to add reply');
  }
};

export const changeStatus = async (onSuccess, onError, ticketId, status) => {
  try {
    const response = await appClientMethods.put(`${supportBaseUrl}tickets/${ticketId}/status`, { status });
    onSuccess(response);
  } catch (error) {
    onError(error.message || 'Failed to change status');
  }
};

export const uploadFileWithProgress = async (onSuccess, onError, onProgress, file) => {
    try {
        const response = await uploadClientMethods.post(`uploadfile`, file,{ 
            headers:{
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress:(progressEvent) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                onProgress(progress);
              },
        })
        if(response.ok){
            onSuccess(response.data?.[0])
        }else{
            throw new Error(deriveErrorMessage(response))
        }
    } catch (error) {
        onError(error.message)
    }
};