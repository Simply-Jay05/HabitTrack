import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/colors";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

// npm install firebase
// npx expo install @react-native-async-storage/async-storage

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { Login } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: LoginSchemaType) => {
    Login(data.email, data.password);
  };

  const loginSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must have at least one uppercase letter")
      .regex(/[a-z]/, "Password must have at least one lowercase letter")
      .regex(/[0-9]/, "Password must have at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must have at least one special character",
      ),
  });

  type LoginSchemaType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your journey with HabitTrack</Text>
        {/* <Text style={styles.subtitle}>Welcome {name}</Text> */}
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        {/* Email Input */}
        <View>
          {/* Lable Text */}
          <Text style={styles.label}>Email</Text>
          {/* Input Field - The Input Container */}
          <View style={styles.inputField}>
            <Ionicons
              style={styles.inputIcon}
              name="mail"
              size={24}
              color="gray"
            />
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
          </View>

          {touchedFields.email && errors.email && (
            <Text style={styles.errorText}>{errors.email?.message}</Text>
          )}
        </View>

        {/* Password Input */}
        <View>
          {/* Lable Text */}
          <Text style={styles.label}>Password</Text>
          {/* Input Field - The Input Container */}
          <View style={styles.inputField}>
            <Ionicons
              style={styles.inputIcon}
              name="lock-closed"
              size={24}
              color="gray"
            />
            <View style={styles.inputView}>
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your pasword"
                    secureTextEntry={!passwordVisible}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            <Ionicons
              style={styles.inputIcon}
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="gray"
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          </View>

          {touchedFields.password && errors.password && (
            <Text style={styles.errorText}>{errors.password?.message}</Text>
          )}
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.altColor} />
          ) : (
            <Text style={styles.btnText}>Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>Don't have an account?</Text>
        <Text style={styles.bottomLink}>Sign up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: hp("2%"),
  },
  logo: {
    height: hp("15%"),
    width: hp("15%"),
  },
  header: {
    width: wp("80%"),
  },
  title: {
    fontFamily: "Bold",
    fontSize: 32, // changed
  },
  subtitle: {
    fontFamily: "Regular",
    fontSize: 18, // changed
    color: "gray",
  },
  form: {
    width: wp("80%"),
    gap: hp("2%"), // Changed
  },
  inputField: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    flexDirection: "row",
    gap: wp("2%"),
    alignItems: "center",
    paddingHorizontal: wp("3%"), // Changed again
    minHeight: hp("6.5%"), // Changed again
  },
  inputView: {
    flexGrow: 1,
  },
  inputIcon: {},
  input: {
    fontSize: 22, // Changed
  },
  label: {
    fontFamily: "Bold",
    fontSize: 18,
    marginBottom: hp("0.8%"),
  },
  btn: {
    backgroundColor: COLORS.bgColor, // Changed
    justifyContent: "center", // Changed
    alignItems: "center", // Changed
    paddingVertical: wp("3%"), // Changed again
    borderRadius: 8, // Changed
    marginTop: hp("2%"), // Changed
  },
  btnText: {
    fontFamily: "Bold", // Changed
    fontSize: 22, // Changed
    color: "white", // Changed
    elevation: 1, // Changed
  },
  bottom: {
    flexDirection: "row", // Changed
    gap: 8, // Changed again
  },
  bottomText: {
    fontFamily: "Medium", // Changed
    fontSize: 16, // Changed again
  },
  bottomLink: {
    fontFamily: "Medium", // Changed
    fontSize: 16, // Changed
    color: COLORS.bgColor, // Changed
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
