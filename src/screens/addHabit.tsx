import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { COLORS } from "../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppStack, UserTabStack } from "../utils/types";
import { useAuth } from "../context/AuthContext";
import { createHabit } from "../services/habitServices";
import { habitSchema, HabitFormType } from "../validations/habitSchema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colors, categories, icons, frequencies } from "../utils/functions";
import { serverTimestamp } from "firebase/firestore";

type AddHabitType = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabStack>,
  NativeStackNavigationProp<AppStack, "AddHabit">
>;

export default function AddHabit() {
  const [loading, setLoading] = useState(false);
  // Declaring Navigation
  const navigation = useNavigation<AddHabitType>();

  // Get user from AuthContext
  const { user } = useAuth();
  const userId = user?.uid;

  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<HabitFormType>({
    defaultValues: {
      habitName: "",
      description: "",
      category: "",
      frequency: "",
      target: "",
      targetUnit: "",
      color: colors[0],
      icon: icons[0],
    },
    resolver: zodResolver(habitSchema),
    mode: "onBlur",
  });

  const saveHabit = async (data: HabitFormType) => {
    if (!userId) {
      Alert.alert("Error", "You must be logged in to create a habit.");
      return;
    }
    try {
      setLoading(true);
      const habitData = {
        userId: userId,
        name: data.habitName,
        description: data.description,
        category: data.category,
        frequency: data.frequency,
        target: data.target,
        targetUnit: data.targetUnit,
        color: data.color,
        icon: data.icon,
        isActive: true,
        createdAt: serverTimestamp(),
      };
      await createHabit(habitData);

      Alert.alert("Created Succesfully", "New habit created successfully", [
        {
          text: "ok",
          onPress: () =>
            navigation.navigate("UserTab", {
              screen: "Home",
            }),
        },
      ]);
    } catch (error) {
      console.log("Error creating habit:", error);

      Alert.alert("Error", "Unable to create habit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={wp("7%")}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Add New Habit</Text>

          <TouchableOpacity style={styles.menuIcons}>
            <Ionicons
              name="ellipsis-vertical"
              size={wp("5.5%")}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Habit Name Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Habit Name <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputView}>
              <Ionicons
                name="document-text-outline"
                size={wp("5.5%")}
                color={COLORS.textPrimary}
              />
              <Controller
                control={control}
                name="habitName"
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="e.g Reading"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>

            {errors.habitName && (
              <Text style={styles.errorText}>{errors.habitName.message}</Text>
            )}
          </View>

          {/* Description Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Description <Text style={styles.optional}>(Optional)</Text>
            </Text>

            <View style={styles.descriptionView}>
              <Ionicons
                name="document-text-outline"
                size={wp("5.5%")}
                color="black"
              />
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onBlur, onChange } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="e.g Add a short description..."
                    multiline={true} // Allows typing across multiple lines
                    numberOfLines={5} // Suggests a starting height (Android)
                    textAlignVertical="top" // Forces placeholder & text to start at the top
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>

            {errors.description && (
              <Text style={styles.errorText}>{errors.description.message}</Text>
            )}
          </View>

          {/* Category Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Cartegory <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputView}>
              <Ionicons
                name="grid-outline"
                size={wp("5.5%")}
                color={COLORS.textPrimary}
              />
              <Controller
                control={control}
                name="category"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Dropdown
                    data={categories}
                    placeholder="Select Category"
                    labelField="label"
                    valueField="value"
                    value={value}
                    onBlur={onBlur}
                    onChange={(item) => onChange(item.value)} // Sets the selected category in our useState
                    style={styles.dropdown}
                    selectedTextStyle={styles.dropdownText}
                    placeholderStyle={styles.dropdownText}
                  />
                )}
              />
            </View>

            {errors.category && (
              <Text style={styles.errorText}>{errors.category.message}</Text>
            )}
          </View>

          {/* Frequency Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Frequency <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputView}>
              <Ionicons
                name="calendar-outline"
                size={wp("5.5%")}
                color={COLORS.textPrimary}
              />
              <Controller
                control={control}
                name="frequency"
                render={({ field: { value, onBlur, onChange } }) => (
                  <Dropdown
                    data={frequencies}
                    placeholder="Select frequency"
                    labelField="label"
                    valueField="value"
                    value={value}
                    onBlur={onBlur}
                    onChange={(item) => onChange(item.value)} // Sets the selected frequency in our useState
                    style={styles.dropdown}
                    selectedTextStyle={styles.dropdownText}
                    placeholderStyle={styles.dropdownText}
                  />
                )}
              />
            </View>

            {errors.frequency && (
              <Text style={styles.errorText}>{errors.frequency.message}</Text>
            )}
          </View>

          {/* Tagets Row */}
          <View style={styles.targetsRow}>
            {/* Target Field */}
            <View style={styles.targetsField}>
              <Text style={styles.label}>
                Target <Text style={styles.required}>*</Text>
              </Text>

              <View style={styles.inputView}>
                <Ionicons
                  name="locate-outline"
                  size={wp("5.5%")}
                  color={COLORS.textPrimary}
                />
                <Controller
                  control={control}
                  name="target"
                  render={({ field: { value, onBlur, onChange } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="e.g 30"
                      keyboardType="numeric"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
              {errors.target && (
                <Text style={styles.errorText}>{errors.target.message}</Text>
              )}
            </View>

            {/* Target Unit Field */}
            <View style={styles.targetsField}>
              <Text style={styles.label}>
                Target Unit <Text style={styles.required}>*</Text>
              </Text>

              <View style={styles.inputView}>
                <Ionicons
                  name="reader-outline"
                  size={wp("5.5%")}
                  color={COLORS.textPrimary}
                />
                <Controller
                  control={control}
                  name="targetUnit"
                  render={({ field: { value, onBlur, onChange } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="e.g Minutes"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>

              {errors.targetUnit && (
                <Text style={styles.errorText}>
                  {errors.targetUnit.message}
                </Text>
              )}
            </View>
          </View>

          {/* Color Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Color <Text style={styles.required}>*</Text>
            </Text>

            <Controller
              control={control}
              name="color"
              render={({ field: { value, onChange } }) => (
                <View style={styles.colorView}>
                  {colors.map((color) => (
                    <TouchableOpacity
                      style={[
                        styles.colorOption,
                        value === color && styles.selectedColor,
                      ]}
                      key={color}
                      onPress={() => onChange(color)}
                    >
                      <View
                        style={[styles.colorCircle, { backgroundColor: color }]}
                      ></View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>

          {/* Icon Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Icons <Text style={styles.required}>*</Text>
            </Text>

            <Controller
              control={control}
              name="icon"
              render={({ field: { value, onChange } }) => (
                <ScrollView horizontal contentContainerStyle={styles.iconView}>
                  {icons.map((icon) => (
                    <TouchableOpacity
                      style={[
                        styles.iconOption,
                        value === icon && styles.selectedIcon,
                      ]}
                      key={icon}
                      onPress={() => onChange(icon)}
                    >
                      <Ionicons
                        name={icon}
                        size={wp("5.5%")}
                        color={COLORS.textPrimary}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSubmit(saveHabit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.white} />
            ) : (
              <Text style={styles.saveBtnText}>Save Habit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: wp("5%"),
    paddingTop: hp("1%"),
    paddingBottom: hp("4%"),
    gap: hp("3%"),
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    width: wp("9%"),
    height: wp("9%"),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Bold",
    fontSize: wp("6%"),
  },
  menuIcons: {
    width: wp("9%"),
    height: wp("9%"),
    justifyContent: "center",
    alignItems: "center",
  },

  // Form Section
  form: {
    gap: hp("2%"),
  },
  formField: {
    gap: hp("0.5%"),
  },
  label: {
    fontSize: wp("4%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
  },
  errorText: {
    fontSize: wp("3%"),
    fontFamily: "Regular",
    color: COLORS.error,
  },
  required: {
    color: COLORS.primary,
  },
  optional: {
    color: COLORS.textMuted,
    fontFamily: "Medium",
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    minHeight: hp("7%"),
    backgroundColor: COLORS.surface,
  },
  input: {
    flex: 1,
    fontSize: wp("3.8%"),
    minWidth: 0,
    color: COLORS.textPrimary,
    height: "100%",
  },
  descriptionView: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: wp("3%"),
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: wp("1.5%"),
    minHeight: hp("11%"),
    backgroundColor: COLORS.surface,
  },
  dropdown: {
    flex: 1,
    minHeight: 50,
  },
  selectedText: {
    fontSize: wp("3.2%"),
    fontFamily: "Medium",
    color: COLORS.textPrimary,
  },
  dropdownText: {
    fontSize: wp("3.2%"),
    fontFamily: "Medium",
    color: COLORS.textPrimary,
  },
  targetsRow: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  targetsField: {
    flex: 1,
    gap: hp("0.5%"),
  },
  colorView: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  colorOption: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  colorCircle: {
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
  },
  // Icon Field
  iconView: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  iconOption: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e5e7",
  },
  selectedIcon: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  // Save Button
  saveBtn: {
    minHeight: hp("7%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: wp("3%"),
    marginTop: hp("1%"),
  },
  saveBtnText: {
    fontSize: wp("4.2%"),
    fontFamily: "Bold",
    color: COLORS.white,
  },
});
