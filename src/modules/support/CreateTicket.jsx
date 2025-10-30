import React, { useState } from 'react';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFileWithProgress, createTicket } from './httpServices';
import { validations } from '../../core/shared/validations';

const { TextArea } = Input;
const { Option } = Select;

function CreateTicket() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onFinish = (values) => {
    if (fileList.length > 0) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', fileList[0].originFileObj);

      uploadFileWithProgress(
        (fileData) => {
          const attachmentUrl = fileData.url;
          createTicket(
            () => {
              message.success('Ticket created successfully!');
              form.resetFields();
              setFileList([]);
            },
            (errorMessage) => {
              message.error(`Failed to create ticket: ${errorMessage}`);
            },
            { ...values, attachment: attachmentUrl }
          );
          setUploading(false);
        },
        (errorMessage) => {
          message.error(`File upload failed: ${errorMessage}`);
          setUploading(false);
        },
        (progress) => {
          console.log('Upload progress:', progress);
        },
        formData
      );
    } else {
      createTicket(
        () => {
          message.success('Ticket created successfully!');
          form.resetFields();
          setFileList([]);
        },
        (errorMessage) => {
          message.error(`Failed to create ticket: ${errorMessage}`);
        },
        values
      );
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('File must smaller than 2MB!');
        return false;
      }
      return true;
    },
    onChange: handleFileChange,
    multiple: false,
    fileList: fileList,
  };

  return (
    <div className="p-4">
      <h1>Create New Ticket</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Subject" name="subject" rules={[validations.requiredValidator()]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[validations.requiredValidator()]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Priority" name="priority" rules={[validations.requiredValidator()]}>
          <Select defaultValue="Medium">
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[validations.requiredValidator()]}>
          <Select>
            <Option value="Hardware">Hardware</Option>
            <Option value="Software">Software</Option>
            <Option value="Account Access">Account Access</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Attachment">
          <Upload {...uploadProps}><Button icon={<UploadOutlined />}>Select File</Button></Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={uploading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateTicket;