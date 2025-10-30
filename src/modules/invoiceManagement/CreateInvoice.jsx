import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Upload, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from './httpServices';
import { validations } from '../../core/shared/validations.js';

const { requiredValidator } = validations;

function CreateInvoice() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFinish = async (values) => {
    if (fileList.length > 0) {
      setUploading(true);
      const file = fileList[0].originFileObj;
      uploadFile(
        (url) => {
          setUploading(false);
          createInvoice({
            ...values,
            attachmentUrl: url,
          });
        },
        (errorMessage) => {
          setUploading(false);
          console.error('File upload failed:', errorMessage);
        },
        file
      );
    } else {
      createInvoice(values);
    }
  };

  const createInvoice = async (values) => {
    console.log('Create invoice:', values);
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  return (
    <div className="p-4">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Client Name" name="clientName" rules={[requiredValidator()]}>
          <Input />
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[requiredValidator()]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Due Date" name="dueDate" rules={[requiredValidator()]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Attachment" valuePropName="fileList">
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />} disabled={uploading}>
              {uploading ? 'Uploading' : 'Upload'}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={uploading}>
            Create Invoice
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateInvoice;