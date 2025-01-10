import React from "react";
import axios from "axios";
import { Item } from ".././interface";
import DeleteButton from "./DeleteItemButton";
import EditItemButton from "./EditButton";

interface ItemViewProps {
  item: Item | null;
  deleteUpdate(): void;
  editUpdate(): void;
  setCurrItem(item: Item): void;
}

const ItemView = ({
  item,
  deleteUpdate,
  editUpdate,
  setCurrItem,
}: ItemViewProps) => {
  // Convert Date object to readable string (could adjust format as needed)
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(); // example format: "MM/DD/YYYY"
  };
  return (
    <div className="h-full w-3/5">
      {item && (
        <div>
          <div className="bg-[#fcd34d] h-[58vh] w-[80vh] mt-[100px] mb-[200px] mx-[110px] rounded-2xl shadow-2xl">
            <h1 className="text-center font-bold text-[25px] pt-5 text-[#64748b]">
              {item.name}
            </h1>
            <h2 className="text-center text-[#9ca3af] pb-5 bg-[#fcd34d]">{`updated: ${formatDate(
              item.updatedAt
            )}`}</h2>
            <div className="w-full h-0.5 pb-[55px] bg-[#374151]"></div>
            <p className="text-center text-white bg-[#374151] py-10">{item.description}</p>
            <div className="w-full h-0.5 pt-[130px] bg-[#374151]"></div>
            <h2 className="text-[#64748b] text-center p-5 text-xl font-bold">{`$ ${item.price}`}</h2>
          </div>
          <div className="flex m-5 absolute">
            <EditItemButton
              updateState={editUpdate}
              item={item}
              setCurrItem={setCurrItem}
            />
            <DeleteButton updateState={deleteUpdate} item={item} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemView;
