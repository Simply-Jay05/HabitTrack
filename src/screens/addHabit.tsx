import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStack } from "../utils/types";

type AddHabitType = NativeStackNavigationProp<AppStack, "AddHabit">;

export default function AddHabit() {
  const categories = [
    { label: "Health", value: "Health" },
    { label: "Fitness", value: "Fitness" },
    { label: "Study", value: "Study" },
    { label: "Personal", value: "Personal" },
    { label: "Mindfulness", value: "Mindfulness" },
    { label: "Productivity", value: "Productivity" },
    { label: "Finance", value: "Finance" },
    { label: "Social", value: "Social" },
  ];

  const frequencies = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
  ];

  const colors = [
    COLORS.blue,
    COLORS.cyan,
    COLORS.green,
    COLORS.orange,
    COLORS.purple,
    COLORS.pink,
  ];

  const icons: (keyof typeof Ionicons.glyphMap)[] = [
    "water-outline",
    "cash-outline",
    "barbell-outline",
    "laptop-outline",
    "walk-outline",
    "book-outline",
    "leaf-outline",
    "restaurant-outline",
    "briefcase-outline",
  ];

  const [selectedCategory, setSelectedCategory] = useState(""); // To hold the value of the selected category
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  // Declaring Navigation
  const navigation = useNavigation<AddHabitType>();

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
              <TextInput style={styles.input} placeholder="e.g Exercise" />
            </View>
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
              <TextInput
                style={styles.input}
                placeholder="e.g Add a short description..."
                multiline={true} // Allows typing across multiple lines
                numberOfLines={5} // Suggests a starting height (Android)
                textAlignVertical="top" // Forces placeholder & text to start at the top
              />
            </View>
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
              <Dropdown
                data={categories}
                placeholder="Select Category"
                labelField="label"
                valueField="value"
                value={selectedCategory}
                onChange={(item) => setSelectedCategory(item.value)} // Sets the selected category in our useState
                style={styles.dropdown}
                selectedTextStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownText}
              />
            </View>
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
              <Dropdown
                data={frequencies}
                placeholder="Select frequency"
                labelField="label"
                valueField="value"
                value={selectedFrequency}
                onChange={(item) => setSelectedFrequency(item.value)} // Sets the selected frequency in our useState
                style={styles.dropdown}
                selectedTextStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownText}
              />
            </View>
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
                <TextInput
                  style={styles.input}
                  placeholder="e.g 30"
                  keyboardType="numeric"
                />
              </View>
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
                <TextInput style={styles.input} placeholder="e.g Minutes" />
              </View>
            </View>
          </View>

          {/* Color Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Color <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.colorView}>
              {colors.map((color) => (
                <TouchableOpacity
                  style={[
                    styles.colorOption,
                    selectedColor === color && styles.selectedColor,
                  ]}
                  key={color}
                  onPress={() => setSelectedColor(color)}
                >
                  <View
                    style={[styles.colorCircle, { backgroundColor: color }]}
                  ></View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Icon Field */}
          <View style={styles.formField}>
            <Text style={styles.label}>
              Icons <Text style={styles.required}>*</Text>
            </Text>

            <ScrollView horizontal contentContainerStyle={styles.iconView}>
              {icons.map((icon) => (
                <TouchableOpacity
                  style={[
                    styles.iconOption,
                    selectedIcon === icon && styles.selectedIcon,
                  ]}
                  key={icon}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Ionicons
                    name={icon}
                    size={wp("5.5%")}
                    color={COLORS.textPrimary}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save Habit</Text>
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
