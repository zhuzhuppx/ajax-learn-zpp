import React from 'react'
import {
    Form, Icon, Input, Button,
} from 'antd';



class HorizontalLoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let { searchData } = this.props;
        this.props.form.validateFields((err, values) => {
            searchData(values);
        });
    }

    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        let { addData } = this.props;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item
                >
                    {getFieldDecorator('name', {
                    })(
                        <Input placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        查询
            </Button>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={addData}
                    >
                        新建
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default WrappedHorizontalLoginForm