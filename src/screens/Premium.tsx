import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { usePaystack } from "react-native-paystack-webview";

export default function Premium() {
  const { popup } = usePaystack();

  const purchasePremium = () => {
    popup.checkout({
      email: "omalejoseph036@gmail.com",
      amount: 3500,
      onSuccess: (response) => {
        console.log("Payment Successful :", response);
      },
      onCancel: () => {
        console.log("Payment Cancelled");
        Alert.alert("Payment cancelled", "Please try making payment again.");
      },
      onError: (error) => {
        console.log("An Error Occured: ", error);
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Premium Header */}
        <View style={styles.premiumHeader}>
          <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
          <Text style={styles.premiumSubtitle}>For only ₦ 3, 500 </Text>
        </View>

        {/* Premium Benefits */}
        <View style={styles.benefits}>
          <Text style={styles.benefitsTitle}>What you'll be getting:</Text>
          <Text style={styles.benefitsText}>• Daily Reminders of Habits</Text>
          <Text style={styles.benefitsText}>
            • Unlimited Habits & Categories
          </Text>
          <Text style={styles.benefitsText}>
            • Advanced Analytics & Insight
          </Text>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity style={styles.btn} onPress={purchasePremium}>
          <Text style={styles.btnText}>Purchase - ₦ 3,500</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: COLORS.bgColor,
    padding: wp("8%"),
    borderRadius: wp("4%"),
    minHeight: "80%",
    minWidth: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  premiumHeader: {
    gap: hp("1%"),
  },
  premiumTitle: {
    fontSize: wp("6.5%"),
    color: "white",
    fontFamily: "Bold",
    textAlign: "center",
  },
  premiumSubtitle: {
    fontSize: wp("5.5%"),
    color: COLORS.altColor,
    fontFamily: "Bold",
    textAlign: "center",
  },
  benefits: {
    gap: hp("2%"),
  },
  benefitsTitle: {
    fontSize: wp("4.5%"),
    color: COLORS.lightColor,
    fontFamily: "Medium",
    textAlign: "center",
  },
  benefitsText: {
    fontSize: wp("3.5%"),
    color: "white",
    fontFamily: "Regular",
  },
  btn: {
    backgroundColor: COLORS.altColor,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("16%"),
    borderRadius: wp("2%"),
  },
  btnText: {
    fontSize: wp("3.5%"),
    color: "white",
    fontFamily: "Regular",
  },
});
