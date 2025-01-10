import React, { useState } from "react";
import { Button, Modal, Form, Input, FloatButton } from "antd";
import { Item } from "../interface";
import axios from "axios";
import { FileAddFilled } from "@ant-design/icons";

interface AddItemButtonProps {
  updateItemList(): void;
}

const AddItemButton = ({ updateItemList }: AddItemButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const createItem = async (itemData: Item) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/add_item",
        itemData
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };
  return (
    <div>
      <FloatButton
        icon={<FileAddFilled/>}
        className="hover:bg-[#fef3c7] left-[460px] mb-[50px] size-[60px]"
        onClick={showModal}
      />
      <Modal
        title="New Item Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="trigger"
          style={{ maxWidth: 600 }}
          layout="vertical"
          autoComplete="off"
          onFinish={async () => {
            await createItem(form.getFieldsValue());
            updateItemList();
          }}
          form={form}
        >
          <Form.Item
            hasFeedback
            label="Name"
            name="name"
            rules={[{ max: 100 }]}
          >
            <Input placeholder="enter the item name" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Description"
            name="description"
            rules={[
              { max: 500, message: "Description cannot exceed 500 characters" },
            ]}
          >
            <Input.TextArea
              rows={4} // You can adjust the number of rows according to your design needs
              placeholder="Enter a description for the item"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Price"
            name="price"
            validateFirst
            rules={[
              {
                required: true,
                message: "Price is required",
              },
              {
                pattern: new RegExp(/^[0-9]*\.?[0-9]{0,2}$/),
                message: "Enter a valid price with up to 2 decimal places",
              },
              {
                validator: (_, value) =>
                  value > 0
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Price must be greater than zero")
                      ),
              },
            ]}
          >
            <Input placeholder="Enter item price" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddItemButton;
