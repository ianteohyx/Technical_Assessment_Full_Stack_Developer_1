import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import axios from "axios";
import { Item } from ".././interface";

interface DeleteButtonProps {
  updateState(): void;
  item: Item | null;
}

const DeleteItemButton = ({ updateState, item }: DeleteButtonProps) => {
  const deleteItem = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/delete_item/${item?.id}`
      );
      console.log("Item deleted successfully", res.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Popconfirm
      title="Delete this item"
      description="Are you sure to delete this item?"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      onConfirm={async () => {
        await deleteItem();
        updateState();
      }}
    >
      <FloatButton
        icon={<DeleteOutlined />}
        className="size-[60px] hover:bg-[#fef3c7] mr-[50px] mb-[50px]"
      />
    </Popconfirm>
  );
};

export default DeleteItemButton;
