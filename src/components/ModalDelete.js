import React from 'react';
import { Modal } from 'antd';
import "./index.css";
const DeleteModal = ({ displayModal, closeModal, actionID, clearAction, typeDelete }) => {

    const handleOk = () => {
        // Implement your delete logic here
        var dataDelete = JSON.parse(localStorage.getItem(typeDelete));
        const sumDay = dataDelete.filter(item => item.index !== actionID);
        localStorage.setItem(typeDelete, JSON.stringify(sumDay.sort((a, b) => {
            return a.index - b.index;
        })));
        clearAction(0);
        closeModal(false);
    };

    const handleCancel = () => {
        clearAction(0);
        closeModal(false);
    };

    return (
        <div>
            <Modal
                open={displayModal.delete}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                closable={false}
                maskClosable={false}
                okText="Delete"
                confirmLoading={false}
                title="Delete Confirmation"
            >
                <p>Are you sure you want to delete this item?</p>
            </Modal>
        </div>
    );
};

export default DeleteModal;
