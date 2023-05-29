import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, FlatList, Pressable, Text } from "react-native";
import Header from "./components/Header";
import Item from "./components/Item";
import { useState } from "react";
import { PlusCircleIcon } from "react-native-heroicons/outline";
import AddItem from "./components/AddItem";

export default function App() {
  const items = [
    {
      itemKey: 1,
      itemNumber: "12345",
      itemDesc: "description about item 12345 some more some more",
      sku: "1199826273",
      upc: "9980376551739",
      locations: [
        {
          locationID: "12345",
          onHandQty: 50,
        },
        {
          locationID: "12345",
          onHandQty: 50,
        },
      ],
    },
    {
      itemKey: 2,
      itemNumber: "22222",
      itemDesc: "description about item 22222",
      sku: "126273",
      upc: "0934346551739",
      locations: [
        
      ],
    },
    {
      itemKey: 3,
      itemNumber: "11111",
      itemDesc: "description about item uno uno",
      sku: "11111111111",
      upc: "111111111",
      locations: [
        {
          locationID: "12345",
          onHandQty: 50,
        },
        {
          locationID: "54321",
          onHandQty: 50,
        },
        {
          locationID: "99999",
          onHandQty: 50,
        },
        {
          locationID: "09090",
          onHandQty: 50,
        },
      ],
    },
    {
      itemKey: 4,
      itemNumber: "90210",
      itemDesc: "description about item the beach",
      sku: "9021090210",
      upc: "8675309999",
      locations: [
        {
          locationID: "12345",
          onHandQty: 50,
        },
        {
          locationID: "47878",
          onHandQty: 50,
        },
        {
          locationID: "09009",
          onHandQty: 50,
        },
      ],
    },
    {
      itemKey: 5,
      itemNumber: "77777",
      itemDesc: "description about lucky se7en",
      sku: "7070770707770",
      upc: "777777777",
      locations: [
        {
          locationID: "12345",
          onHandQty: 50,
        },
      ],
    },
    {
      itemKey: 6,
      itemNumber: "4",
      itemDesc: "description about item 44",
      sku: "444",
      upc: "4444",
      locations: [
        {
          locationID: "12345",
          onHandQty: 50,
        },
      ],
    },
    {
      itemKey: 7,
      itemNumber: "88888",
      itemDesc: "description about los ochos",
      sku: "7898888888",
      upc: "81128188818818",
      locations: [
        {
          locationID: "12345",
          onHandQty: 50,
        },
      ],
    },
  ];
  const [showAddItem, setShowAddItem] = useState(false);

  const [allItems, setAllItems] = useState(items);

  return (
    <SafeAreaView style={styles.container} className="flex flex-col items-center">
      <Header />
      <FlatList
        contentContainerStyle={{ alignItems: "flex-start"}}
        style={styles.itemList}
        data={allItems}
        keyExtractor={(item) => {
          return item.itemKey;
        }}
        renderItem={(item) => (
          <Item
            item={item}
            setAllItems={setAllItems}
          />
        )}
      />
      <Pressable style={[styles.plusIcon, styles.shadowProp, styles.elevation]} onPress={() => setShowAddItem(prev => !prev)}>
        <PlusCircleIcon color="white" fill="green" size={90} />
      </Pressable>
      {showAddItem && <AddItem setShowAddItem={setShowAddItem} setAllItems={setAllItems} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemList: {
    width: "100%",
  },
  plusIcon: {
    position: "absolute",
    left: 275,
    bottom: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  elevation: {
    elevation: 20,
    shadowColor: "black",
  },
});
