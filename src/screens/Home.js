import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CheckInButton from "../components/checkInButton";
import { Paragraph } from "react-native-paper";

export default function Home() {
  const [eventInfo, setEventInfo] = useState({
    col: [
      {
        _id: "Id",
        name: "Name",
        dateTime: "DateTime",
        eventDate: "EventDate",
        startTime: "StartTime",
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
        "http://bc5c-2600-6c63-647f-979d-4c74-bcf3-618f-a5cf.ngrok.io/events"
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

  ///////////////////////////////////Async/////////////////////////////////////////////

  const navigation = useNavigation();

  const STORAGE_NAME = "@save_name";

  const [data, setdata] = useState("");

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_NAME);
      if (name !== null) {
        setdata(name);
      }
    } catch (error) {
      alert(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header>Welcome {data}!</Header>

        <Text
          style={{
            color: "blue",
            fontSize: 15,
            color: "#9a9fa1",
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Your Current Events:
        </Text>

        <View style={{ height: 300 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
          >
            <View style={styles.all}>
              {events.map((x, index) => (
                <TouchableOpacity
                  style={styles.cards}
                  key={index}
                  onPress={() =>
                    navigation.navigate("eventCard", {
                      Name: x.name,
                      DateTime: x.dateTime,
                      EventDate: x.eventDate,
                      StartTime: x.startTime,
                      Location: x.location,
                      ID: x._id,
                      Contacts: x.contacts,
                      Recurrance: x.recur,
                    })
                  }
                >
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#7FAF66",
                      fontWeight: "bold",
                      marginBottom: 0,
                    }}
                  >
                    {x.name}
                    {"\n"}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: "#7FAF66",
                      }}
                    >
                      Location:
                    </Text>
                    <View>
                      <Text>{x.location}</Text>
                    </View>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: "#7FAF66",
                      }}
                    >
                      Date:
                    </Text>
                    <View>
                      <Text>{x.eventDate}</Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        color: "#7FAF66",
                      }}
                    >
                      Time:
                    </Text>
                    <View>
                      <Text>{x.startTime}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.add}
              onPress={() => navigation.navigate("addEvent")}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                {" "}
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  color={"#ffd508"}
                  size={50}
                />{" "}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <Text />
        <Text />
        <Text />
        <Text />

        <Paragraph style={styles.par}>
          {" "}
          Check In to let contacts know that you're okay!
        </Paragraph>

        <Text />
        <View>
          <CheckInButton />
        </View>

        <View style={styles.block1}></View>
        <View style={styles.block2}></View>
        <View style={styles.block3}></View>
      </View>
    </>
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
  par: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: "center",
    backgroundColor: "#efefef",
  },
  top: {
    flexDirection: "row",
  },
  header: {
    fontSize: 30,
    margin: 5,
  },
  add: {
    paddingTop: 120,
  },
  noConts: {
    color: "#C1BEBE",
    margin: 10,
  },
  cards: {
    width: 210,
    height: 260,
    borderRadius: 20,
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },
  all: {
    display: "flex",
    flexWrap: "wrap",
  },
  both: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
