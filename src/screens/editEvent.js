import React, { useState, Component, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import Header from "../components/Header";
import { MultiSelect } from "react-native-element-dropdown";
import BackButton from "../components/BackButton";
import { CheckBox } from "react-native-elements";
import TextInput from "../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function editEvent({ navigation, route }) {
  const { Name, ID, Location, DateTime, Contacts, SMS, Email } = route.params;

  const [name, setFullName] = useState(Name);
  const [location, setLocation] = useState(Location);
  const [dateTime, setDateTime] = useState(DateTime);
  const [contacts, setContacts] = useState(Contacts);
  const [sms, setSms] = useState(SMS);
  const [email, setSendEmail] = useState(Email);

  const onChangeSMSHandler = (sms) => {
    setSms(sms);
  };
  const onChangeEmailHandler = (email) => {
    setSendEmail(email);
  };

  const onChangeNameHandler = (name) => {
    setFullName(name);
  };
  const onChangeLocationHandler = (location) => {
    setLocation(location);
  };
  const onChangeContactsHandler = (contacts) => {
    setContacts(contacts);
  };
  /////////////////////////////////////////DropDown///////////////////////////////////////////
  const [contactInfo, setContactInfo] = useState({
    col: [
      {
        _id: "Id",
        full_name: "Name",
        phone: "Phone",
        email: "Email",
      },
    ],
    info: [],
  });

  useEffect(() => {
    axios
      .get(
        "http://369f-2600-6c63-647f-979d-b9d9-3e70-f66c-1e7c.ngrok.io/contacts"
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

  const cons = contactInfo.info;

  const _renderItem = (cons) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{cons.full_name}</Text>
      </View>
    );
  };

  ///////////////////////////////////////PUT/////////////////////////////////////////////
  const updateEvent = () => {
    axios
      .post(
        "http://369f-2600-6c63-647f-979d-b9d9-3e70-f66c-1e7c.ngrok.io/events/update/" +
          ID,
        {
          name,
          location,
          dateTime,
          contacts,
          sms,
          email,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const createTwoButtonAlert = () =>
    Alert.alert("Event Updated!", "", [
      { text: "OK", onPress: () => console.log("edit event Pressed") },
    ]);

  const functionCombined = () => {
    updateEvent();
    createTwoButtonAlert();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };
  ///////////////////////////////////////DELETE/////////////////////////////////////////////
  const deleteEvent = () => {
    axios
      .delete(
        "http://369f-2600-6c63-647f-979d-b9d9-3e70-f66c-1e7c.ngrok.io/events/" +
          ID,
        {
          name,
          location,
          dateTime,
          contacts,
          sms,
          email,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const createThreeButtonAlert = () =>
    Alert.alert("Event Deleted!", "", [
      { text: "OK", onPress: () => console.log("delete event Pressed") },
    ]);

  const functionCombined2 = () => {
    deleteEvent();
    createThreeButtonAlert();
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };
  ////////////////////////////////////////////////////////////////////////////
  const [date, setDate] = useState(new Date(dateTime));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setDateTime(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <Header>Edit Event</Header>

      <TextInput label="Name" onChangeText={onChangeNameHandler} value={name} />
      <TextInput
        label="Location"
        onChangeText={onChangeLocationHandler}
        value={location}
      />
      <View style={styles.buttons1}>
        <View style={styles.buttons2}>
          <TouchableOpacity
            style={styles.dateTime}
            onPress={showDatepicker}
            title="Date"
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>DATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateTime}
            onPress={showTimepicker}
            title="Time"
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>TIME</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingRight: 150 }}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              timeZoneOffsetInMinutes
              minuteInterval="5"
              is24Hour={false}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <View>
        <MultiSelect
          style={styles.dropdown2}
          data={cons}
          labelField="full_name"
          valueField="full_name"
          placeholder="Select Emergency Contact"
          value={contacts}
          onChange={onChangeContactsHandler}
          renderItem={(item) => _renderItem(item)}
        />
      </View>
      <Text
        style={{
          color: "blue",
          textAlign: "center",
          fontSize: 15,
          color: "#7FAF66",
          fontWeight: "bold",
          textDecorationLine: "underline",
        }}
      >
        How to notify Emergency Contacts:{" "}
      </Text>
      <View>
        <CheckBox
          title="SMS"
          checked={sms}
          checkedColor="#ffd508"
          onChange={onChangeSMSHandler}
          onPress={() => setSms(!sms)}
        />
      </View>
      <View>
        <CheckBox
          title="Email"
          checked={email}
          checkedColor="#ffd508"
          onChange={onChangeEmailHandler}
          onPress={() => setSendEmail(!email)}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.add} onPress={() => functionCombined()}>
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
  dropdown2: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    marginTop: 20,
    marginBottom: 20,
    padding: 8,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 20,
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
    margin: 20,
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
  buttons1: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  buttons2: {
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
  },
  dateTime: {
    margin: 10,
    width: "40%",
    height: 40,
    textAlign: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    justifyContent: "center",
    borderRadius: 20,
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
});
