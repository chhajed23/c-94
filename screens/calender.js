import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";

import MyHeader from "../components/myHeader";
import db from "../config";
import firebase from "firebase";
import ini from "../ini.json";
import { RFValue } from "react-native-responsive-fontsize";
import CalendarPicker from "react-native-calendar-picker";


export default class CalenderScreen extends React.Component {
  constructor(props) {
    super(props);
    // const editIni = require("../ini.json");
    this.state = {
      name: "",
      rateOfCowMilk: "",
      rateOfBuffaloMilk: "",
      rateOfCurd: "",
      rateOfGhee: "",
      showRates: true,
      isModalVisible: false,
      selectedStartDate:null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  ratesAdding = () => {
    // db.collection("users").add({

    //   rateOfCowMilk: this.state.rateOfCowMilk,
    //   rateOfBuffaloMilk: this.state.rateOfBuffaloMilk,
    //   rateOfCurd: this.state.rateOfCurd,
    //   rateOfGhee: this.state.rateOfGhee,
    // });
    return Alert.alert("Rates Added Successfully", "", [
      {
        text: "OK",
        onPress: () => this.setState({ isModalVisible: false }),
      },
    ]);
  };

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  // componentDidMount() {
  //   console.log(this.getInitialSetting())
  //   console.log(this.state.showRates);
  // }

  getInitialSetting = () => {
    db.collection("initialSetting")
      .doc("d1")
      .get()
      .then((doc) => {
        doc.docs.map((doc1) => {
          this.setState({
            showRates: doc1.data(),
          });
        });
      });
  };

  // showModal = () => {
  //   return (
  //     <Modal
  //       animationType="fade"
  //       transparent={true}
  //       visible={this.state.isModalVisible}
  //     >
  //       <ScrollView style={styles.scrollview}>
  //         <View style={styles.signupView}>
  //           <Text style={styles.signupText}> Rates Adding </Text>
  //         </View>

  //         <View style={{ flex: 0.95 }}>
  //           <Text style={styles.label}>Rate of Cow Milk in your Area </Text>
  //           <TextInput
  //             style={styles.formInput}
  //             placeholder={"Rate of Cow Milk in your Area"}
  //             maxLength={3}
  //             keyboardType={"numeric"}
  //             onChangeText={(text) => {
  //               this.setState({
  //                 rateOfCowMilk: text,
  //               });
  //             }}
  //           />

  //           <Text style={styles.label}>Rate of Buffalo Milk in your Area </Text>
  //           <TextInput
  //             style={styles.formInput}
  //             placeholder={"Rate of Buffalo Milk in your Area"}
  //             maxLength={3}
  //             keyboardType={"numeric"}
  //             onChangeText={(text) => {
  //               this.setState({
  //                 rateOfBuffaloMilk: text,
  //               });
  //             }}
  //           />

  //           <Text style={styles.label}>Rate of Curd in your Area</Text>
  //           <TextInput
  //             style={styles.formInput}
  //             placeholder={"Rate of Curd in your Area"}
  //             maxLength={3}
  //             keyboardType={"numeric"}
  //             onChangeText={(text) => {
  //               this.setState({
  //                 rateOfCurd: text,
  //               });
  //             }}
  //           />

  //           <Text style={styles.label}> Rate of Ghee in your Area</Text>
  //           <TextInput
  //             style={styles.formInput}
  //             placeholder={"Rate of Ghee in your Area"}
  //             keyboardType={"numeric"}
  //             onChangeText={(text) => {
  //               this.setState({
  //                 rateOfGhee: text,
  //               });
  //             }}
  //           />

  //           <View style={{ flex: 0.2, alignItems: "center" }}>
  //             <TouchableOpacity
  //               style={styles.registerButton}
  //               onPress={() => {
  //                 this.ratesAdding();
  //                 // this.setState({ showRates: false });
  //                 Alert.alert(this.state.showRates);
  //               }}
  //               disabled={false}
  //             >
  //               <Text style={styles.registerButtonText}>Register</Text>
  //             </TouchableOpacity>
  //             <Text
  //               style={styles.cancelButtonText}
  //               onPress={() => {
  //                 this.setState({ isModalVisible: false });
  //               }}
  //             >
  //               Cancel
  //             </Text>
  //           </View>
  //         </View>
  //       </ScrollView>
  //     </Modal>
  // );
  // };

  render() {
     const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.25 }}>
          <MyHeader title="Calendar" navigation={this.props.navigation} />
          <View style={{ flex: 0.15 }} />
          <View style={styles.container}>
        <CalendarPicker
          onDateChange={this.onDateChange}
        />

        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  loginBox: {
    width: "80%",
    height: RFValue(50),
    borderWidth: 1.5,
    borderColor: "#ffffff",
    fontSize: RFValue(20),
    paddingLeft: RFValue(10),
  },
  button: {
    width: "80%",
    height: RFValue(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(25),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    marginBottom: RFValue(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "#32867d",
    fontWeight: "200",
    fontSize: RFValue(20),
  },
  label: {
    fontSize: RFValue(13),
    color: "#717D7E",
    fontWeight: "bold",
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  registerButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d",
    marginTop: RFValue(10),
  },
  scrollview: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  signupView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#32867d",
  },
  santaView: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  santaImage: {
    width: "70%",
    height: "100%",
    resizeMode: "stretch",
  },
  TextInput: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  bookImage: {
    width: "100%",
    height: RFValue(220),
  },
});
