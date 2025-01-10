import axios from "axios";
import React, { useEffect } from "react";
import { Item } from "./interface";
import { List, Button } from "antd";
import AddItemButton from "./components/AddItemButton";
import ItemView from "./components/ItemView";

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [currentItem, setCurrentItem] = React.useState<Item | null>(null);

  // Convert Date object to readable string (could adjust format as needed)
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(); // example format: "MM/DD/YYYY"
  };

  const getAllItems = async () => {
    const res = await axios.get("http://localhost:8000/api/get_items");
    console.log(res.data);
    setItems(res.data);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="bg-[#374151] w-screen h-screen flex">
      <div className="w-2/5 h-full bg-[#111827] flex flex-col">
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className={`hover:bg-[#fef3c7] list-item-divider shadow-xl ${
                currentItem && item.id === currentItem.id ? "bg-[#fcd34d]" : ""
              }`}
              onClick={() => {
                setCurrentItem(item);
              }}
            >
              <List.Item.Meta
                title={
                  <h1 className="text-[#64748b] font-bold my-2 mx-10 text-2xl">
                    {item.name}
                  </h1>
                }
                description={
                  <div className="flex w-full">
                    <h5 className="text-[#9ca3af] my-2 ml-10 mr-2 w-full">{`created at: ${formatDate(
                      item.createdAt
                    )}`}</h5>
                  </div>
                }
              />
            </List.Item>
          )}
          className="flex-grow h-full overflow-y-auto"
        />

        <AddItemButton updateItemList={getAllItems} />
      </div>
      <ItemView
        item={currentItem}
        deleteUpdate={() => {
          getAllItems();
          setCurrentItem(null);
        }}
        editUpdate={getAllItems}
        setCurrItem={setCurrentItem}
      />
    </div>
  );
};

export default App;
