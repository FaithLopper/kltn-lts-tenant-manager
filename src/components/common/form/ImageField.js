import { Form, Upload } from 'antd';
import React from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import useFormField from '@hooks/useFormField';

const ImageField = (props) => {
    const { label, fileList, disabled, fieldName, accept, onChange, beforeUpload, showUploadList } = props;

    const uploadFile = ({ file, onSuccess }) => {
        const { uploadFile } = props;
        uploadFile(file, onSuccess);
    };

    const getContent = () => {
        const { showUploadList, fileList, maxFile, imageUrl, loading } = props;
        if (imageUrl && !loading) {
            return <img className="img-uploaded" src={imageUrl} alt="field-upload" />;
        } else if (showUploadList && fileList && fileList.length === maxFile) {
            return null;
        } else {
            return renderUploadButton();
        }
    };

    const renderUploadButton = () => {
        const { loading, showUploadList, style } = props;
        return (
            <div style={style}>
                {!showUploadList && loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">{loading ? 'uploading' : 'upload'}</div>
            </div>
        );
    };

    const { rules } = useFormField(props);

    return (
        <Form.Item label={label} name={fieldName} rules={rules} valuePropName={fieldName}>
            {showUploadList ? (
                <Upload
                    fileList={fileList}
                    disabled={disabled}
                    accept={accept}
                    name="field-upload"
                    listType="picture-card"
                    className="avatar-uploader"
                    customRequest={uploadFile}
                    beforeUpload={beforeUpload}
                    onChange={onChange}
                >
                    {getContent()}
                </Upload>
            ) : (
                <Upload
                    disabled={disabled}
                    accept={accept}
                    valuePropName={fieldName}
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={uploadFile}
                    beforeUpload={beforeUpload}
                    onChange={onChange}
                >
                    {getContent()}
                </Upload>
            )}
        </Form.Item>
    );
};

export default ImageField;
