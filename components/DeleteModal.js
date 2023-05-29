import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ExclamationTriangleIcon } from "react-native-heroicons/outline";

export default function DeleteModal({ setShowDeleteModal, item, setAllItems }) {
  const handleDelete = () => {
    setShowDeleteModal(false);
    setAllItems((prev) => prev.filter((el) => el.itemKey !== item.itemKey));
  };

  return (
    <>
      <View className="absolute top-0 bottom-0 h-full w-screen bg-black z-40 opacity-50"></View>
      <View className="absolute top-4 z-50 h-40 w-11/12 px-3 self-center rounded-md bg-slate-700 flex flex-col justify-center items-center gap-1 ml-2">
        <ExclamationTriangleIcon color="white" size={30} />

        <Text className="text-white">
          Are you sure you want to delete Item #: {item.itemNumber}?
        </Text>
        <View className="flex flex-row gap-3 w-full justify-center h-14">
          <TouchableOpacity
            className="grow border border-black rounded-lg items-center justify-center bg-gray-500"
            onPress={() => setShowDeleteModal(false)}
          >
            <Text className="text-white font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="grow border border-black rounded-lg items-center justify-center bg-red-600"
            onPress={handleDelete}
          >
            <Text className="text-white font-bold">Yes, I'm Sure</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
