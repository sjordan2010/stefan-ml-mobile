import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  TagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

export default function Item({ item, setAllItems }) {
  const { itemKey, itemNumber, itemDesc, sku, upc, locations } = item.item;

  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const swipeableRef = useRef(null);

  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const slideInStyle = {
    transform: [
      {
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    // console.log("pressed delete", itemKey);
    swipeableRef.current?.close();
  };

  const handleEdit = () => {
    setShowEditModal(true);
    // console.log("editing item: ", itemNumber);
    swipeableRef.current?.close();
  };

  const renderRightActions = () => (
    <View style={styles.rightActions}>
      <TouchableOpacity
        onPress={handleDelete}
        style={[styles.deleteButton, styles.shadowProp, styles.elevation]}
      >
        <TrashIcon color="white" size={40} />
      </TouchableOpacity>
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.leftActions}>
      <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
        <PencilSquareIcon color="white" size={40} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <GestureHandlerRootView>
        <Swipeable
          ref={swipeableRef}
          renderLeftActions={renderLeftActions}
          renderRightActions={renderRightActions}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "gainsboro" : "white",
              },
              styles.container,
              styles.elevation,
              styles.shadowProp,
              isExpanded ? styles.containerExpanded : null,
            ]}
            onPress={() => setIsExpanded((prev) => !prev)}
          >
            <View style={styles.row}>
              <View style={styles.btnContainer}>
                <TagIcon color="green" fill="none" size={30} />
              </View>
              <View style={styles.description}>
                <View>
                  <Text style={styles.bold}>ITEM #: {itemNumber}</Text>
                  <Text style={styles.bold}>SKU: {sku}</Text>
                  <Text style={styles.bold}>UPC: {upc}</Text>
                </View>
                <Text style={styles.italic}>{itemDesc}</Text>
                <View style={styles.numbersContainer} className="w-full justify-between">
                  <View>
                    <Text style={styles.totals}>Locations: {locations.length} </Text>
                  </View>
                  <View>
                    <Text style={styles.totals}>
                      Total: {locations.reduce((acc, curr) => acc + curr.onHandQty, 0)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.arrowContainer}>
              {isExpanded ? (
                <ChevronUpIcon color="green" fill="none" size={25} />
              ) : (
                <ChevronDownIcon color="green" fill="none" size={25} />
              )}
            </View>
          </Pressable>
        </Swipeable>
      </GestureHandlerRootView>

      {isExpanded && (
        <Animated.View style={[styles.expandSection, slideInStyle]}>
          <FlatList
            data={locations}
            keyExtractor={(item, index) => {
              return item.locationID + index;
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.location}>
                  <Text>Location ID: {item.locationID}</Text>
                  <Text>Qty on Hand: {item.onHandQty}</Text>
                </View>
              );
            }}
          />
          {!locations.length ? (
            <View style={styles.location}>
              <Text style={{ fontStyle: "italic" }}>No Products Available</Text>
            </View>
          ) : (
            <></>
          )}
        </Animated.View>
      )}
      {showEditModal && (
        <EditModal item={item.item} setShowEditModal={setShowEditModal} setAllItems={setAllItems} />
      )}
      {showDeleteModal && (
        <DeleteModal
          item={item.item}
          setShowDeleteModal={setShowDeleteModal}
          setAllItems={setAllItems}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    gap: 10,
    height: 180,
    width: 350,
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    zIndex: 10,
    borderLeftColor: "gray",
    borderLeftWidth: 4,
  },
  containerExpanded: {
    borderBottomRightRadius: 0,
    borderLeftColor: "green",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "black",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
    width: 265,
  },
  elevation: {
    elevation: 10,
    shadowColor: "black",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  btnContainer: {
    padding: 10,
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
    padding: 10,
  },
  numbersContainer: {
    flexDirection: "row",
    width: 200,
    gap: 50,
  },
  totals: {
    color: "silver",
  },
  arrowContainer: {
    marginBottom: 5,
    marginLeft: "50%",
  },
  expandSection: {
    position: "relative",
    top: -15,
    flexDirection: "column",
    backgroundColor: "gainsboro",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
    borderLeftColor: "green",
    borderLeftWidth: 4,
    marginHorizontal: 10,
    zIndex: -10,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  rightActions: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
    marginLeft: -10,
    width: 80,
  },
  leftActions: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: -10,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 180,
    width: 80,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: 180,
    width: 80,
    borderRadius: 4,
  },
});
