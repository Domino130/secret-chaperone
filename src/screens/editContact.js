import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";

export default function editContact({ navigation, route }) {
  const { FullName, Phone, ID } = route.params;

  const [full_name, setFullName] = useState(FullName);
  const [phone, setPhone] = useState(Phone);

  const onChangeNameHandler = (full_name) => {
    setFullName(full_name);
  };

  const onChangePhoneHandler = (phone) => {
    setPhone(phone);
  };

  ///////////////////////////////////////PUT/////////////////////////////////////////////
  const updatecontact = () => {
    axios
      .post(
        "http://bc5c-2600-6c63-647f-979d-4c74-bcf3-618f-a5cf.ngrok.io/contacts/update/" +
          ID,
        {
          full_name,
          phone,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Contact Updated!", "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const functionCombined = () => {
    updatecontact();
    createTwoButtonAlert();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };
  ///////////////////////////////////////DELETE/////////////////////////////////////////////
  const deletecontact = () => {
    axios
      .delete(
        "http://bc5c-2600-6c63-647f-979d-4c74-bcf3-618f-a5cf.ngrok.io/contacts/" +
          ID,
        {
          full_name,
          phone,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const createThreeButtonAlert = () =>
    Alert.alert("Contact Deleted!", "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const functionCombined2 = () => {
    deletecontact();
    createThreeButtonAlert();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />
        <Header>Edit Contact</Header>

        <TextInput
          label="Name"
          onChangeText={onChangeNameHandler}
          value={full_name}
        />

        <TextInput
          label="Phone"
          onChangeText={onChangePhoneHandler}
          value={phone}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.add}
            onPress={() => functionCombined()}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>SAVE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.delete}
            onPress={() => functionCombined2()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "#efefef",
    padding: 8,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    paddingBottom: 50,
    fontWeight: "bold",
  },
  box: {
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  add: {
    width: 150,
    height: 40,
    margin: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#51cc29",
    borderColor: "#51cc29",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  delete: {
    width: 150,
    height: 40,
    margin: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#f74d4d",
    borderColor: "#f74d4d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
});
