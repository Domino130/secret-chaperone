import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import BackButton from "../components/BackButton";
import TextInput from "../components/TextInput";
import EndEventButton from "../components/endEventButton";
import StartEventButton from "../components/startEventButton";

export default function eventCard({ navigation, route }) {
  const { Name, ID, Location, DateTime } = route.params;
  const [name, setFullName] = useState(Name);
  const [location, setLocation] = useState(Location);
  const [dateTime, setDateTime] = useState(DateTime);

  const onChangeLocationHandler = (location) => {
    setLocation(location);
  };
  const [eventInfo, setEventInfo] = useState({
    col: [
      {
        _id: "Id",
        name: "Name",
        dateTime: "DateTime",
        location: "Location",
        contacts: "Contacts",
        recur: "Recurrance",
      },
    ],
    info: [],
  });

  useEffect(() => {
    axios
      .get(
        "http://6708-2600-6c63-647f-979d-7185-e70d-13c2-7552.ngrok.io/events"
      )
      .then((response) => {
        setEventInfo((table) => {
          const eventsCall = { ...table };
          response.data.map((d) => {
            eventsCall.info = [...eventsCall.info, d];
          });
          return eventsCall;
        });
      });
  }, []);

  const events = eventInfo.info;

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <BackButton goBack={navigation.goBack} />
        <Text style={styles.header}>{name}</Text>

        <TextInput
          label="Location"
          onChangeText={onChangeLocationHandler}
          value={location}
        />

        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            events.map((x) =>
              navigation.navigate("editEvent", {
                Name: x.name,
                DateTime: x.dateTime,
                Location: x.location,
                ID: x._id,
                Contacts: x.contacts,
                Recurrance: x.recur,
              })
            );
          }}
        >
          <Text style={{ color: "white" }}>EDIT</Text>
        </TouchableOpacity>

        <StartEventButton />
        <EndEventButton />
      </View>
    </View>
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
    paddingRight: 20,
    paddingLeft: 0,
    paddingTop: 50,
    paddingBottom: 50,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "white",
    borderRadius: 15,
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
    width: "50%",
    height: 40,
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 50,
    backgroundColor: "#88d166",
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
    borderRadius: 20,
    backgroundColor: "red",
    borderColor: "red",
  },
});
