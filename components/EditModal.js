import React from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function EditModal({ item, setShowEditModal, setAllItems }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      itemNumber: item.itemNumber,
      itemDesc: item.itemDesc,
    },
  });
  const onSubmit = (data) => {
    setAllItems((items) =>
      items.map((el) => {
        if (el.itemKey === item.itemKey) {
          return { ...el, ...data };
        }
        return el;
      })
    );
    setShowEditModal(false);
  };

  return (
    <>
      <View className="absolute top-0 bottom-0 h-full w-screen bg-black z-40 opacity-50"></View>
      <View className="absolute top-4 z-50 h-40 w-11/12 px-3 self-center rounded-md bg-slate-700 flex flex-col justify-center items-center gap-1 ml-2">
        <View style={[styles.form, styles.shadowProp, styles.elevation]}>
          <View
            className="flex flex-row justify-between items-center"
            style={styles.inputContainer}
          >
            <Text style={styles.label}>Item #: </Text>
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
          </View>
          {errors.itemNumber && isDirty && (
            <Text style={{ color: "red" }}>{errors.itemNumber.message}</Text>
          )}
          <View
            className="flex flex-row justify-between items-center"
            style={styles.inputContainer}
          >
            <Text style={styles.label}>Description: </Text>
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
          </View>
          {errors.itemDesc && <Text style={{ color: "red" }}>{errors.itemDesc.message}</Text>}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.closeBtn, styles.shadowProp, styles.elevation]}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, styles.shadowProp, styles.elevation]}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid && !isDirty}
            >
              <Text style={[styles.buttonText, { color: "black", fontWeight: "bold" }]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
    // opacity: "100",
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
    flex: 1,
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
    backgroundColor: "orange",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 15,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
