import React, { useState } from "react";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import User from "../../backend/models/user.model"

function UploadImage() {
  const [image] = useState(null);
  const addImage = () => {};

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: "#efefef",
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
    justifyContent: "center",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function editProfile() {
  const navigation = useNavigation();

  const onSavePressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  const onCancelPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  const onProfilePressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Profile" }],
    });
  };

  return (
    <>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <UploadImage />
        </View>

        <Header>Edit Personal Information</Header>

        <TextInput label="Name" returnKeyType="next" autoCapitalize="none" />

        <TextInput label="Birthday" returnKeyType="next" />

        <TextInput
          label="Street Address"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput label="City" returnKeyType="next" autoCapitalize="none" />

        <TextInput label="State" returnKeyType="next" autoCapitalize="none" />

        <TextInput
          label="Zip Code"
          keyboardType="numeric"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput
          label="Height"
          keyboardType="numeric"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput
          label="Weight"
          keyboardType="numeric"
          returnKeyType="next"
          autoCapitalize="none"
        />

        <TextInput
          label="Race"
          multiline={true}
          returnKeyType="next"
          autoCapitalize="none"
        />

        <View style={styles.fixToText}>
          <Button title="Profile" onPress={onProfilePressed} />
          <Button title="Save" onPress={onSavePressed} />

          <Button title="Skip" onPress={onCancelPressed} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
