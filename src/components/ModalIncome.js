import React, {  useEffect } from 'react';
import { Form, Input, Modal, DatePicker, InputNumber, Button , notification } from 'antd';
import dayjs from 'dayjs';
const App = ({ displayModal, closeModal, actionID , clearAction }) => {

    const formRef = React.useRef(null);
    const handleCancel = () => {
        formRef.current?.resetFields();
        clearAction(0);
        closeModal({
            income: false
        });
    };
    const onFinish = (values) => {

        var setData = !localStorage.getItem('Income') ? [] : JSON.parse(localStorage.getItem('Income'));
        if (actionID === 0) {
            setData.push({
                index: !localStorage.getItem('Income') ? 1 : JSON.parse(localStorage.getItem('Income')).length + 1,
                date: values.date,
                description: values.description,
                money: values.money,
            });
            localStorage.setItem("Income", JSON.stringify(setData));
        }
        else {
            const result = JSON.parse(localStorage.getItem("Income")).filter(item => item.index === actionID);
            const editResult = JSON.parse(localStorage.getItem("Income")).filter(item => item.index !== actionID);
            result[0]["index"] = actionID;
            result[0]["date"] = values.date;
            result[0]["description"] = values.description;
            result[0]["money"] = values.money;
            editResult.push(result[0]);
            localStorage.setItem("Income", JSON.stringify(editResult.sort((a, b) => {
                return a.index - b.index;
            })));
           
        }
        notification.success({
            message: 'Success',
            description: 'Create Income successfully!',
          });
          setTimeout(() => {
          handleCancel();
          }, 300);
    };

    useEffect(() => {
        if (actionID !== 0) {
            const result = JSON.parse(localStorage.getItem("Income")).filter(item => item.index === actionID);
            formRef.current.setFieldsValue({
                date: dayjs(result[0]["date"]),
                money: result[0]["money"],
                description: result[0]["description"]
            });
        }
    }
        , [actionID]);

    return (
        <>
            <Modal title={actionID !== 0 ? "Edit Income" : "Add Income"} open={displayModal.income} footer={null} closable={false} maskClosable={false} centered>
                <Form
                    ref={formRef}
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                        marginTop: 30
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your date!',
                            },
                        ]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            format={'DD/MM/YYYY HH:mm:ss'}
                            def
                        ></DatePicker>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Money"
                        name="money"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your money!',
                            },
                        ]}
                    >
                        <InputNumber min={1} style={{ width: "100%" }} />
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button type="default" style={{ marginRight: "10px" }} onClick={() => handleCancel()}>
                            Close
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default App;