import React from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useForm, Controller } from "react-hook-form";
// import uuid from "uuid"

const AddItem = ({ setShowAddItem, setAllItems }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      itemNumber: "",
      itemDesc: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const newItem = {
      sku: Math.floor(Math.random() * 10000000),
      upc: Math.floor(Math.random() * 1000000),
      itemKey: Math.floor(Math.random() * 1000000),
      locations: [],
      ...data,
    };
    setAllItems((items) => [...items, newItem]);
    setShowAddItem(false);
  };

  return (
    <ImageBackground
      source={require("../assets/plants.jpeg")}
      blurRadius={5}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.addModal}>
        <Text style={styles.title}>Add an Item</Text>
        <View style={[styles.form, styles.shadowProp]}>
          <Controller
            control={control}
            rules={{
              required: "Item # is required.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid number",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="numeric"
                style={[styles.input, styles.shadowProp, styles.elevation]}
                placeholder="Item Number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="itemNumber"
          />
          {errors.itemNumber && isDirty && (
            <Text style={{ color: "red" }}>{errors.itemNumber.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Item description is required.",
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, styles.shadowProp, styles.elevation]}
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="itemDesc"
          />
          {errors.itemDesc && <Text style={{ color: "red" }}>{errors.itemDesc.message}</Text>}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.closeBtn, styles.shadowProp, styles.elevation]}
              onPress={() => setShowAddItem(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, styles.shadowProp, styles.elevation]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  addModal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 20,
    bottom: 0,
    height: "100%",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  image: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
  },
  form: {
    backgroundColor: "white",
    // opacity: "100%",
    borderRadius: 4,
    padding: 20,
    gap: 10,
  },
  input: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  elevation: {
    elevation: 10,
    shadowColor: "black",
  },
  submitButton: {
    backgroundColor: "green",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 36,
    marginVertical: 10,
  },
  closeBtn: {
    backgroundColor: "lightgray",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 15,
  },
});

export default AddItem;
