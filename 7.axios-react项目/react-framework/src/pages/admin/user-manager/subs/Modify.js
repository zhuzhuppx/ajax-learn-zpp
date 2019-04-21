import React from 'react'
import {
    Button, Modal, Form, Input, Upload, Icon,
} from 'antd';
import UploadFile from '../../../../components/upload/Index'
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        uploadImg = (files) => {
            console.log(files);

        }
        handleChange = (e) => {
            console.log(e);

        }
        render() {
            const {
                visible, onCancel, onCreate, form, currentRow
            } = this.props;
            const { getFieldDecorator } = form;
            let { uploadImg, handleChange } = this;
            let { id,
                avator,
                name,
                age,
                phone } = currentRow;
            return (
                <Modal
                    visible={visible}
                    title={!id ? '新增' : '修改'}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="姓名">
                            {getFieldDecorator('name', {
                                initialValue: name,
                                rules: [{ required: true, message: '请输入姓名!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="年龄">
                            {getFieldDecorator('age', {
                                initialValue: age,
                                rules: [{ required: true, message: '请输入年龄!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="手机">
                            {getFieldDecorator('phone', {
                                initialValue: phone,
                                rules: [{ required: true, message: '请输入手机!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('avator', {
                                    initialValue:avator,
                                    rules: [{ required: true, message: '请上传头像!' }],
                                })(
                                  <UploadFile/> 
                                )

                            }
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);



export default CollectionCreateForm;