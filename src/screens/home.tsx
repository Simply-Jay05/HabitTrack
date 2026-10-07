import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { user, habits } from "../utils/dummyData";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppStack, UserTabStack } from "../utils/types";

type HomeType = CompositeNavigationProp<
  BottomTabNavigationProp<UserTabStack, "Home">,
  NativeStackNavigationProp<AppStack>
>;

export default function Home() {
  const navigation = useNavigation<HomeType>();
  const completedHabits = habits.filter(
    (habit) => habit.completed === true,
  ).length;
  const totalHabits = habits.length;

  const progess = habits.length > 0 ? completedHabits / totalHabits : 0;

  const percentages = Math.round(progess * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userSection}>
            <Image style={styles.profileImg} source={user.profileImage} />
            <View>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate("ImagePicker")}
          >
            <Ionicons name="settings-outline" size={wp("7%")} color="black" />
          </TouchableOpacity>
        </View>

        {/* Progress Section */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressTitleView}>
              <View style={styles.progressIcon}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={wp("6%")}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.progressTitle}>Today's Progress</Text>
            </View>

            <View style={styles.trophyIcon}>
              <Ionicons name="trophy" size={wp("6%")} color={COLORS.primary} />
            </View>
          </View>

          <Text style={styles.progressInfo}>
            {completedHabits} / {totalHabits} habits
          </Text>

          <View style={styles.progressView}>
            <View style={styles.progressBarBg}>
              <View
                style={[{ width: `${percentages}%` }, styles.progressBar]}
              ></View>
            </View>

            <Text style={styles.percentages}>{percentages}%</Text>
          </View>

          <Text style={styles.encouragement}>
            You're doing great! Keep it up!
          </Text>
        </View>

        {/* Habits Section */}
        <View style={styles.habitsSection}>
          {/* Habits Header */}
          <View style={styles.habitsHeader}>
            <Text style={styles.habitsTitle}>Today's Habit</Text>

            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons
                name="chevron-forward-sharp"
                size={wp("5%")}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Habits Card */}
          {habits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              style={styles.habitCard}
              onPress={() =>
                navigation.navigate("Details", { habitId: habit.id })
              }
            >
              {/* Habits Left Side */}
              <View style={styles.habitLeft}>
                <View
                  // Passing an array combines multiple styles;
                  // which allows us to make the icon, iconBg and iconColor dynamic
                  style={[
                    styles.habitIconBg,
                    { backgroundColor: `${habit.color}20` },
                  ]}
                >
                  {/* Habit Icon */}
                  <View
                    style={[styles.habitIcon, { backgroundColor: habit.color }]}
                  >
                    <Ionicons
                      name={habit.icon}
                      size={wp("5%")}
                      color={COLORS.white}
                    />
                  </View>
                </View>

                {/* Habit Info */}
                <View style={styles.habitInfo}>
                  <Text style={styles.habitName} numberOfLines={1}>
                    {habit.name}
                  </Text>

                  <View style={styles.habitMeta}>
                    <Text style={styles.habitCategory}>{habit.category}</Text>
                    <View style={styles.habitMetaDot}></View>
                    <Text style={styles.habitTarget} numberOfLines={1}>
                      {habit.target} {habit.targetUnit}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Habit Right Side */}
              <View style={styles.habitRight}>
                <View
                  style={[
                    styles.checkBtn,
                    {
                      backgroundColor: habit.completed
                        ? COLORS.secondary
                        : COLORS.white,
                    },
                  ]}
                >
                  <Ionicons
                    name="checkmark-sharp"
                    size={wp("5%")}
                    color={COLORS.white}
                  />
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={wp("5%")}
                  color="black"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Habit Button */}
        <TouchableOpacity
          style={styles.addHabitBtn}
          onPress={() => navigation.navigate("AddHabit")}
        >
          <Ionicons name="add" size={wp("6%")} color={COLORS.white} />
          <Text style={styles.addHabitText}>Add Habit</Text>
        </TouchableOpacity>
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
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("4%"),
    gap: hp("3%"),
  },

  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: "3%",
  },
  profileImg: {
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp("6.5%"),
  },
  greeting: {
    fontSize: wp("3.8%"),
    color: COLORS.textSecondary,
    fontFamily: "Regular",
  },
  userName: {
    fontSize: wp("5%"),
    color: COLORS.textPrimary,
    fontFamily: "Bold",
  },
  settingsBtn: {
    backgroundColor: COLORS.surface,
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5"),
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  // Progress Section
  progressCard: {
    backgroundColor: COLORS.primary,
    padding: wp("4%"),
    borderRadius: wp("4%"),
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressTitleView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  progressIcon: {
    backgroundColor: COLORS.white,
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
  },
  progressTitle: {
    fontSize: wp("3.8%"),
    color: COLORS.white,
    fontFamily: "Regular",
  },
  trophyIcon: {
    backgroundColor: COLORS.white,
    width: wp("8%"),
    height: wp("8%"),
    borderRadius: wp("4%"),
    justifyContent: "center",
    alignItems: "center",
  },
  progressInfo: {
    fontSize: wp("6%"),
    fontFamily: "Medium",
    color: COLORS.white,
    marginTop: hp("1%"),
  },
  progressView: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
    marginTop: hp("1%"),
  },
  progressBarBg: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    flex: 1,
    height: hp("1.5%"),
    borderRadius: hp("0.75%"),
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: COLORS.secondary,
    height: "100%",
  },
  percentages: {
    fontSize: wp("3.2%"),
    color: COLORS.white,
    fontFamily: "Bold",
  },
  encouragement: {
    fontSize: wp("3.5%"),
    color: COLORS.white,
    fontFamily: "Regular",
    marginTop: hp("1%"),
  },

  // Habits Section
  habitsSection: {
    gap: hp("1.2%"),
  },
  habitsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  habitsTitle: {
    fontFamily: "Bold",
    fontSize: wp("5%"),
    color: COLORS.textPrimary,
  },
  viewAllBtn: {
    flexDirection: "row",
    gap: wp("1%"),
  },
  viewAllText: {
    fontFamily: "Medium",
    fontSize: wp("3.8%"),
    color: COLORS.primary,
  },
  // Habit Card
  habitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: wp("3%"),
    borderRadius: wp("3%"),
    borderColor: "#EDF1F7",
    elevation: 1,
    gap: wp("1%"),
  },
  habitLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
    flex: 1,
    minWidth: 0,
  },
  habitIconBg: {
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp("3.5%"),
    padding: wp("1.5%"),
  },
  habitIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("3.5%"),
  },
  habitInfo: {
    flex: 1,
    minWidth: 0,
  },
  habitName: {
    fontSize: wp("4%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
  },
  habitMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  habitCategory: {
    flexShrink: 0,
    fontSize: wp("3%"),
    fontFamily: "Regular",
    color: COLORS.textSecondary,
  },
  habitTarget: {
    flexShrink: 1,
    fontSize: wp("3%"),
    fontFamily: "Regular",
    color: COLORS.textSecondary,
  },
  habitMetaDot: {
    backgroundColor: COLORS.textSecondary,
    width: wp("1.5%"),
    height: wp("1.5%"),
    borderRadius: wp("0.75%"),
  },
  habitRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  checkBtn: {
    width: wp("7%"),
    height: wp("7%"),
    borderRadius: wp("3.5%"),
    borderWidth: 1,
    borderColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  // Add Habit Button
  addHabitBtn: {
    minHeight: hp("7%"),
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("3%"),
  },
  addHabitText: {
    fontFamily: "Bold",
    fontSize: wp("4.5%"),
    color: COLORS.white,
  },
});
