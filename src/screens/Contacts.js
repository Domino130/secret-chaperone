import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

export default function Contacts() {
  const [contactInfo, setContactInfo] = useState({
    col: [
      {
        _id: "Id",
        full_name: "Name",
        phone: "Phone",
      },
    ],
    info: [],
  });

  const contacts = contactInfo.info;

  const navigation = useNavigation();

  const sortedList = contacts.sort((a, b) =>
    b.full_name.localeCompare(a.full_name)
  );

  useEffect(() => {
    axios
      .get(
        "http://bc5c-2600-6c63-647f-979d-4c74-bcf3-618f-a5cf.ngrok.io/contacts"
      )
      .then((response) => {
        setContactInfo((table) => {
          const contactsCall = { ...table };
          response.data.map((d) => {
            contactsCall.info = [...contactsCall.info, d];
          });
          return contactsCall;
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.header}>Contacts</Text>

        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate("addContact")}
        >
          <Text>
            {" "}
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={"#7FAF66"}
              size={30}
            />{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <ScrollView>
        <View style={{ flexDirection: "column-reverse", textAlign: "left" }}>
          {contacts.map((x) => (
            <TouchableOpacity
              style={styles.names}
              key={x._id}
              onPress={() =>
                navigation.navigate("editContact", {
                  FullName: x.full_name,
                  Phone: x.phone,
                  ID: x._id,
                })
              }
            >
              <Text
                style={{
                  color: "blue",
                  fontSize: 25,
                  color: "#7FAF66",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                <Text>
                  {" "}
                  <MaterialCommunityIcons
                    name="human-greeting"
                    color={"#9a9fa1"}
                    size={20}
                  />{" "}
                </Text>
                {x.full_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.block1}></View>
      <View style={styles.block2}></View>
      <View style={styles.block3}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  block1: {
    position: "absolute",
    height: 300,
    width: 200,
    top: 580,
    left: 0,
    transform: [{ rotate: "-15deg" }],
    borderWidth: 1,
    textAlign: "center",
    fontSize: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 100,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#88d166",
    borderColor: "#88d166",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  block2: {
    position: "absolute",
    height: 100,
    width: 100,
    top: 580,
    left: 230,
    transform: [{ rotate: "10deg" }],
    borderWidth: 1,
    textAlign: "center",
    fontSize: 18,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#88d166",
    borderColor: "#88d166",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  block3: {
    position: "absolute",
    height: 50,
    width: 50,
    top: 500,
    left: 340,
    transform: [{ rotate: "40deg" }],
    borderWidth: 1,
    textAlign: "center",
    fontSize: 18,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#88d166",
    borderColor: "#88d166",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 10,
  },
  contacts: {
    flex: 1,
  },
  top: {
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    margin: 5,
    fontWeight: "bold",
    color: "#88d166",
  },
  add: {
    margin: 5,
    padding: 7,
  },
  names: {
    paddingLeft: 10,
    backgroundColor: "white",
    width: 300,
    height: 45,
    margin: 10,
    paddingTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },
  noConts: {
    color: "#C1BEBE",
    margin: 110,
  },
});
