import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, DatePicker, InputNumber, Button, Select, notification } from 'antd';
import dayjs from 'dayjs';
const App = ({ displayModal, closeModal, dataCategory, actionID, clearAction }) => {
    const formRef = React.useRef(null);
    const handleCancel = () => {
        formRef.current?.resetFields();
        clearAction(0);
        closeModal({
            expenses: false
        });
    };
    const onFinish = (values) => {

        var setData = !localStorage.getItem('Expenses') ? [] : JSON.parse(localStorage.getItem('Expenses'));
        if (actionID === 0) {
            setData.push({
                index: !localStorage.getItem('Expenses') ? 1 : JSON.parse(localStorage.getItem('Expenses')).length + 1,
                date: values.date,
                description: values.description,
                money: values.money,
                category: values.category
            });
            localStorage.setItem("Expenses", JSON.stringify(setData));
        }
        else {
            const result = JSON.parse(localStorage.getItem("Expenses")).filter(item => item.index === actionID);
            const editResult = JSON.parse(localStorage.getItem("Expenses")).filter(item => item.index !== actionID);
            result[0]["index"] = actionID;
            result[0]["date"] = values.date;
            result[0]["description"] = values.description;
            result[0]["money"] = values.money;
            result[0]["category"] = values.category;
            editResult.push(result[0]);
            localStorage.setItem("Expenses", JSON.stringify(editResult.sort((a, b) => {
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
            const result = JSON.parse(localStorage.getItem("Expenses")).filter(item => item.index === actionID);
            formRef.current.setFieldsValue({
                date: dayjs(result[0]["date"]),
                money: result[0]["money"],
                description: result[0]["description"],
                category: result[0]["category"]
            });
        }
    }
        , [actionID]);
    return (
        <>
            <Modal title={actionID !== 0 ? "Edit Expenses" : "Add Expenses"} open={displayModal.expenses} footer={null} closable={false} maskClosable={false} centered>
                <Form
                    ref={formRef}
                    name="basic"
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
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your category!',
                            },
                        ]}
                    >
                        <Select
                            placeholder={"Select Category"}
                            style={{
                                width: "100%",
                                padding: 5
                            }}
                            // onChange={handleChange}
                            options={dataCategory}
                        />
                    </Form.Item>

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