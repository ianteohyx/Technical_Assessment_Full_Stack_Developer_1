import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { EditFilled } from "@ant-design/icons";
import axios from "axios";
import { Item } from ".././interface";

interface EditItemButtonProps {
  updateState(): void;
  item: Item | null;
  setCurrItem(item: Item): void
}

const EditItemButton = ({ updateState, item, setCurrItem }: EditItemButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      name: item?.name,
      description: item?.description,
      price: item?.price,
    });
  };

  const handleOk = async () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editItem = async (values: Item) => {
    setCurrItem({...values, updatedAt: new Date()})
    try {
      const res = await axios.put(
        `http://localhost:8000/api/update_item/${item?.id}`,
        {
          ...values,
          updatedAt: new Date().toISOString(), // Update timestamp on client-side or preferably on server-side
        }
      );

      const data = await res.data
      message.success("Item updated successfully");
    
    } catch (error) {
      message.error("Failed to update item");
      console.error("Error updating item:", error);
    }
  };

  return (
    <>
      <FloatButton
        icon={<EditFilled />}
        className="size-[60px] hover:bg-[#fef3c7] mr-[150px] mb-[50px]"
        onClick={showModal}
      />
      <Modal
        title="Edit Item Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="edit_item"
          layout="vertical"
          onFinish={async () => {
            await editItem(form.getFieldsValue());
            updateState();
          }}
          initialValues={{
            name: item?.name,
            description: item?.description,
            price: item?.price,
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the item's name!",
                max: 100,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the item's description!",
                max: 500,
              },
            ]}
          >
            <Input.TextArea rows={4} showCount maxLength={500} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the item's price!" },
              {
                pattern: new RegExp(/^[0-9]*\.?[0-9]{0,2}$/),
                message: "Enter a valid price with up to 2 decimal places",
              },
            ]}
          >
            <Input prefix="$" type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditItemButton;
