import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStack } from "../utils/types";
import { habits } from "../utils/dummyData";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

type DetailRouteProp = RouteProp<AppStack, "Details">;
type DetailsType = NativeStackNavigationProp<AppStack, "Details">;

export default function Details() {
  // To access route Parameter
  const route = useRoute<DetailRouteProp>();
  const { habitId } = route.params; // To access the actual data passed

  // Declaraing navigation
  const navigation = useNavigation<DetailsType>();

  // To get all information of the habit with that exact ID
  const habit = habits.find((data) => data.id === habitId);

  // Dummy data for our UI
  const recentCompletions = [
    {
      id: "completion001",
      date: "Sep 15, 2026",
      time: "8:20 AM",
    },
    {
      id: "completion002",
      date: "Sep 14, 2026",
      time: "7:45 AM",
    },
    {
      id: "completion003",
      date: "Sep 13, 2026",
      time: "8:10 AM",
    },
  ];

  // Dummy statistics
  const currentStreak = 7;
  const bestStreak = 21;
  const completionRate = 86;
  const weeklyImprovement = 12;

  // This will eventually come from completion records.
  const [completedToday, setCompletedToday] = useState(true);

  // Weekly Overview dummy data
  const weeklyStat = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: true },
    { day: "Sun", completed: false },
  ];

  // Button Actions
  const handleComplete = () => {
    setCompletedToday(!completedToday);
  };

  const handleEdit = () => {
    Alert.alert("Edit Habit", "The Edit Habit screen will open here.");
  };

  const handleDelete = () => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => console.log("Habit Deleted"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header Section */}
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

          <Text style={styles.headerTitle}>Habit Details</Text>

          <TouchableOpacity style={styles.menuIcons}>
            <Ionicons
              name="ellipsis-vertical"
              size={wp("5.5%")}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <View
          style={[styles.summaryCard, { backgroundColor: `${habit?.color}20` }]}
        >
          <View style={styles.summaryTop}>
            {/* Habit Info */}
            <View style={styles.habitInfoView}>
              {/* Habit Icon */}
              <View
                style={[styles.habitIcon, { backgroundColor: habit?.color }]}
              >
                <Ionicons
                  name={habit?.icon}
                  size={wp("9%")}
                  color={COLORS.white}
                />
              </View>

              {/* Habit Texts */}
              <View style={styles.habitTextView}>
                <Text style={styles.habitName}>{habit?.name}</Text>
                <Text style={styles.habitCategory}>{habit?.category}</Text>
              </View>
            </View>

            {/* Habit Status */}
            <View style={styles.habitStatus}>
              <View
                style={[
                  styles.habitStatusDot,
                  {
                    backgroundColor: habit?.isActive
                      ? `${COLORS.accent}`
                      : `${COLORS.error}`,
                  },
                ]}
              ></View>
              <Text
                style={[
                  styles.habitStatusText,
                  {
                    color: habit?.isActive
                      ? `${COLORS.accent}`
                      : `${COLORS.error}`,
                  },
                ]}
              >
                {habit?.isActive ? "Active" : "Inactive"}
              </Text>
            </View>
          </View>

          {/* Habit Description */}
          <Text style={styles.habitDesc}>{habit?.description}</Text>
        </View>

        {/* Habit Information Card */}
        <View style={styles.infoView}>
          <View style={styles.infoCard}>
            <Ionicons
              name="calendar-outline"
              size={wp("6%")}
              color={COLORS.textPrimary}
            />
            <View style={styles.infoTexts}>
              <Text style={styles.infoValue}>{habit?.frequency}</Text>
              <Text style={styles.infoLabel}>Frequency</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="locate-outline"
              size={wp("6%")}
              color={COLORS.textPrimary}
            />
            <View style={styles.infoTexts}>
              <Text style={styles.infoValue}>{habit?.target}</Text>
              <Text style={styles.infoLabel}>Target</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="reader-outline"
              size={wp("6%")}
              color={COLORS.textPrimary}
            />
            <View style={styles.infoTexts}>
              <Text style={styles.infoValue}>{habit?.targetUnit}</Text>
              <Text style={styles.infoLabel}>Target Unit</Text>
            </View>
          </View>
        </View>

        {/* Stat Card */}
        <View style={styles.statView}>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: `${COLORS.error}20` },
              ]}
            >
              <Ionicons name="flame" size={wp("7%")} color={COLORS.error} />
            </View>
            <View style={styles.statTexts}>
              <Text style={styles.statLabel}>Current Streak</Text>
              <Text style={styles.statValue}>{currentStreak} days</Text>
              <Text style={styles.statSubText}>Best: {bestStreak} days</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.statIcon,
                { backgroundColor: `${COLORS.accent}20` },
              ]}
            >
              <Ionicons
                name="pie-chart"
                size={wp("7%")}
                color={COLORS.accent}
              />
            </View>
            <View style={styles.statTexts}>
              <Text style={styles.statLabel}>Completion Rate</Text>
              <Text style={styles.statValue}>{completionRate} %</Text>
              <Text style={styles.statSubText}>
                {weeklyImprovement}% this week
              </Text>
            </View>
          </View>
        </View>

        {/* Today's Progress */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progress Today</Text>
            <Text style={styles.sectionValue}>
              {completedToday ? "1/1 completed" : "1/1 completed"}
            </Text>
          </View>

          {/* Progress */}
          <View style={styles.progressView}>
            <View style={styles.progressBg}>
              <View
                style={[
                  styles.progressBar,
                  { width: completedToday ? "100%" : "0%" },
                ]}
              ></View>
            </View>

            {/* ProgressCheck Button */}
            <View style={styles.checkBtn}>
              <Ionicons name="checkmark" size={wp("5%")} color={COLORS.white} />
            </View>
          </View>
        </View>

        {/* Weekly Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Overview</Text>
          </View>

          {/* Week Container */}
          <View style={styles.weekView}>
            {weeklyStat.map((item) => (
              <View key={item.day} style={styles.dayView}>
                {/* Check Button */}
                <View
                  style={[
                    styles.dayCheckBtn,
                    {
                      backgroundColor: item.completed
                        ? COLORS.accent
                        : COLORS.error,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.completed ? "checkmark" : "close-sharp"}
                    size={wp("5%")}
                    color={COLORS.white}
                  />
                </View>
                {/* Day text */}
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Completions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Completions</Text>

            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Completion Card */}
          {recentCompletions.map((completion) => (
            <View key={completion.id} style={styles.completionCard}>
              <View style={styles.completionIcon}>
                <Ionicons
                  name="checkmark"
                  size={wp("5%")}
                  color={COLORS.white}
                />
              </View>

              <View style={styles.completionInfo}>
                <Text style={styles.completionDate}>{completion.date}</Text>

                <Text style={styles.completionTime}>{completion.time}</Text>
              </View>

              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actions Button */}
        <View style={styles.actionView}>
          <TouchableOpacity style={styles.completeBtn} onPress={handleComplete}>
            <Ionicons
              name={completedToday ? "checkmark-circle" : "ellipse-outline"}
              size={wp("6%")}
              color={COLORS.white}
            />

            <Text style={styles.completeBtnText}>
              {completedToday ? "Completed Today" : "Mark as Complete"}
            </Text>
          </TouchableOpacity>

          <View style={styles.secondaryActions}>
            <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
              <Ionicons
                name="create-outline"
                size={wp("5%")}
                color={COLORS.secondary}
              />

              <Text style={styles.editText}>Edit Habit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Ionicons
                name="trash-outline"
                size={wp("5%")}
                color={COLORS.error}
              />

              <Text style={styles.deleteText}>Delete Habit</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: wp("4%"),
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

  // Summary Card
  summaryCard: {
    gap: hp("2%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("6%"),
    borderRadius: wp("4%"),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  habitInfoView: {
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  habitIcon: {
    flexShrink: 0,
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  habitTextView: {
    flexShrink: 1,
    gap: hp("0.5%"),
  },
  habitName: {
    fontFamily: "Bold",
    fontSize: wp("4.8%"),
    color: COLORS.textPrimary,
  },
  habitCategory: {
    fontFamily: "Bold",
    fontSize: wp("3.5%"),
    color: COLORS.textSecondary,
  },
  habitStatus: {
    flexShrink: 0,
    backgroundColor: COLORS.surface,
    height: hp("5%"),
    paddingHorizontal: wp("3%"),
    borderRadius: wp("5%"),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp("1.5%"),
  },
  habitStatusDot: {
    width: wp("2%"),
    height: wp("2%"),
    borderRadius: wp("1%"),
  },
  habitStatusText: {
    fontSize: wp("3.2%"),
    fontFamily: "Medium",
  },
  habitDesc: {
    fontSize: wp("3.8%"),
    fontFamily: "Regular",
    color: COLORS.textSecondary,
    lineHeight: wp("5.5%"),
  },

  // Habit Info Card
  infoView: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  infoCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    gap: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    padding: wp("3%"),
    borderRadius: wp("4%"),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTexts: {
    flexShrink: 1,
  },
  infoValue: {
    fontFamily: "Bold",
    fontSize: wp("3.5%"),
    color: COLORS.textPrimary,
  },
  infoLabel: {
    fontFamily: "Regular",
    fontSize: wp("3%"),
    color: COLORS.textSecondary,
  },

  // Stats Card
  statView: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: wp("4%"),
    padding: wp("3%"),
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("3%"),
  },
  statIcon: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  statTexts: {
    flexShrink: 1,
  },
  statLabel: {
    fontFamily: "Medium",
    fontSize: wp("3%"),
    color: COLORS.textSecondary,
  },
  statValue: {
    fontFamily: "Bold",
    fontSize: wp("4.5%"),
    color: COLORS.textPrimary,
  },
  statSubText: {
    fontFamily: "Regular",
    fontSize: wp("2.8%"),
    color: COLORS.textSecondary,
  },

  // Today's Progress
  section: {
    gap: wp("2%"),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontFamily: "Bold",
    fontSize: wp("4.5%"),
    color: COLORS.textPrimary,
  },
  sectionValue: {
    fontFamily: "Medium",
    fontSize: wp("3.5%"),
    color: COLORS.textSecondary,
  },
  progressView: {
    flexDirection: "row",
    gap: wp("2%"),
    alignItems: "center",
  },
  progressBg: {
    flex: 1,
    height: hp("1.8%"),
    borderRadius: hp("1%"),
    backgroundColor: `${COLORS.textPrimary}20`,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.accent,
  },
  checkBtn: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.accent,
  },

  // Weekly Overview
  weekView: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    paddingVertical: hp("2%"),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayView: {
    flex: 1,
    alignItems: "center",
    gap: hp("0.8%"),
  },
  dayCheckBtn: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.accent,
  },
  dayText: {
    fontSize: wp("3%"),
    color: COLORS.textSecondary,
  },

  // Recent Completion
  viewAll: {
    fontSize: wp("3.5%"),
    fontFamily: "Medium",
    color: COLORS.primary,
  },
  completionCard: {
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    padding: wp("3%"),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completionIcon: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("4.5%"),
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  completionInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp("3%"),
  },
  completionDate: {
    fontSize: wp("3.5%"),
    fontFamily: "Medium",
    color: COLORS.textPrimary,
  },
  completionTime: {
    fontSize: wp("3%"),
    color: COLORS.textSecondary,
    marginTop: hp("0.3%"),
  },
  completedBadge: {
    backgroundColor: `${COLORS.accent}20`,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.8%"),
    borderRadius: wp("5%"),
  },
  completedText: {
    fontSize: wp("2.8%"),
    color: COLORS.secondary,
    fontFamily: "Medium",
  },

  // Actions Button
  actionView: {
    gap: hp("1.5%"),
    marginTop: hp("1%"),
  },
  completeBtn: {
    minHeight: hp("6.5%"),
    backgroundColor: COLORS.primary,
    borderRadius: wp("3%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("2%"),
  },
  completeBtnText: {
    fontSize: wp("4%"),
    fontFamily: "Medium",
    color: COLORS.white,
  },
  secondaryActions: {
    flexDirection: "row",
    gap: wp("3%"),
  },
  editBtn: {
    flex: 1,
    minHeight: hp("6%"),
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: wp("2%"),
  },
  editText: {
    fontSize: wp("3.8%"),
    fontFamily: "Medium",
    color: COLORS.secondary,
  },
  deleteBtn: {
    flex: 1,
    minHeight: hp("6%"),
    borderWidth: 1.5,
    borderColor: COLORS.error,
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: wp("2%"),
  },
  deleteText: {
    fontSize: wp("3.8%"),
    fontFamily: "Medium",
    color: COLORS.error,
  },
});
