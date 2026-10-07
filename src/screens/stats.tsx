import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stats() {
  // Dumm Data
  const [period, setPeriod] = useState("Weekly");
  const stats = {
    totalHabits: 5,
    completedToday: 4,
    currentStreak: 7,
    bestStreak: 21,
    completionRate: 86,
    weeklyImprovement: 12,
  };
  const weeklyData = [
    { day: "Mon", percentage: 71 },
    { day: "Tue", percentage: 86 },
    { day: "Wed", percentage: 100 },
    { day: "Thu", percentage: 71 },
    { day: "Fri", percentage: 86 },
    { day: "Sat", percentage: 100 },
    { day: "Sun", percentage: 86 },
  ];
  const topHabits = [
    {
      name: "Exercise",
      percentage: 100,
      streak: 7,
      color: COLORS.blue,
      icon: "barbell-outline" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "Drink Water",
      percentage: 93,
      streak: 5,
      color: COLORS.cyan,
      icon: "water-outline" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "Read",
      percentage: 86,
      streak: 4,
      color: COLORS.green,
      icon: "book-outline" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "Meditate",
      percentage: 71,
      streak: 3,
      color: COLORS.orange,
      icon: "leaf-outline" as keyof typeof Ionicons.glyphMap,
    },
    {
      name: "Study TypeScript",
      percentage: 57,
      streak: 2,
      color: COLORS.pink,
      icon: "laptop-outline" as keyof typeof Ionicons.glyphMap,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Stats</Text>
            <Text style={styles.headerSubTitle}>
              Track your habits and progress
            </Text>
          </View>
          <Ionicons
            name="stats-chart"
            size={wp("6%")}
            color={COLORS.textPrimary}
          />
        </View>

        {/* Main Statistics */}
        <View style={styles.statsCardView}>
          <View style={styles.statsCardRow}>
            {/* Total Habits */}
            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: `${COLORS.primary}20` },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={wp("7%")}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.statTexts}>
                <Text style={styles.statLabel}>Total Habits</Text>
                <Text style={styles.statValue}>{stats.totalHabits}</Text>
              </View>
            </View>

            {/* Completed Today */}
            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: `${COLORS.accent}20` },
                ]}
              >
                <Ionicons
                  name="checkmark-sharp"
                  size={wp("7%")}
                  color={COLORS.accent}
                />
              </View>
              <View style={styles.statTexts}>
                <Text style={styles.statLabel}>Completed Today</Text>
                <Text style={styles.statValue}>{stats.completedToday}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsCardRow}>
            {/* Current Streak */}
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
                <Text style={styles.statValue}>{stats.currentStreak} days</Text>
                <Text style={styles.statSubText}>
                  Best: {stats.bestStreak} days
                </Text>
              </View>
            </View>

            {/* Completion Rate */}
            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: `${COLORS.secondary}20` },
                ]}
              >
                <Ionicons
                  name="pie-chart"
                  size={wp("7%")}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.statTexts}>
                <Text style={styles.statLabel}>Completion Rate</Text>
                <Text style={styles.statValue}>{stats.completionRate} %</Text>
                <Text style={styles.statSubText}>
                  {stats.weeklyImprovement}% this week
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Weekly Overview Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Overview</Text>

            <View>
              <Text style={styles.averageValue}>86%</Text>
              <Text style={styles.averageLabel}>Avg. completion</Text>
            </View>
          </View>

          {/* Weekly Overview Chart*/}
          <View style={styles.chartCard}>
            <View style={styles.chartView}>
              {weeklyData.map((item) => (
                <View key={item.day} style={styles.barColumn}>
                  <Text style={styles.chartPercentage}>{item.percentage}%</Text>
                  {/* Char Bar */}
                  <View style={styles.barBg}>
                    <View
                      style={[styles.bar, { height: `${item.percentage}%` }]}
                    ></View>
                  </View>
                  <Text style={styles.chartLabel}>{item.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Top Habits Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Habits</Text>
            <Text style={styles.sectionValue}>Top 10 habits</Text>
          </View>

          <View style={styles.topHabitsCard}>
            {topHabits.map((habit) => (
              <View key={habit.name} style={styles.topHabitRow}>
                <View
                  style={[
                    styles.topHabitIcon,
                    { backgroundColor: habit.color },
                  ]}
                >
                  <Ionicons
                    name={habit.icon}
                    size={wp("4%")}
                    color={COLORS.white}
                  />
                </View>

                <View style={styles.topHabitInfo}>
                  <View style={styles.topHabitHeader}>
                    <Text style={styles.topHabitName}>{habit.name}</Text>

                    <Text style={styles.topHabitPercentage}>
                      {habit.percentage}%
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.habitProgressBackground,
                      { backgroundColor: `${habit.color}20` },
                    ]}
                  >
                    <View
                      style={[
                        styles.habitProgress,
                        {
                          width: `${habit.percentage}%`,
                          backgroundColor: habit.color,
                        },
                      ]}
                    />
                  </View>
                </View>

                <Text style={styles.streakText}>{habit.streak} day streak</Text>
              </View>
            ))}
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
  headerTitle: {
    fontFamily: "Bold",
    fontSize: wp("6.5%"),
    color: COLORS.textPrimary,
  },
  headerSubTitle: {
    fontFamily: "Medium",
    fontSize: wp("3.8%"),
    color: COLORS.textSecondary,
  },

  // Main Stats Section
  statsCardView: {
    gap: wp("2%"),
  },
  statsCardRow: {
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

  // Section style
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
  averageValue: {
    fontSize: wp("3.5%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
    textAlign: "right",
  },
  averageLabel: {
    fontSize: wp("2.7%"),
    color: COLORS.textSecondary,
  },

  // Chart
  chartCard: {
    backgroundColor: COLORS.white,
    padding: wp("4%"),
    borderRadius: wp("4%"),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chartView: {
    height: hp("25%"),
    flexDirection: "row",
    alignItems: "flex-end",
    gap: wp("2%"),
    justifyContent: "space-between",
  },
  barColumn: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  chartPercentage: {
    fontSize: wp("2.8%"),
    fontFamily: "Medium",
    color: COLORS.textPrimary,
    marginBottom: hp("0.7%"),
  },
  barBg: {
    backgroundColor: `${COLORS.primary}20`,
    width: "80%",
    height: "70%",
    justifyContent: "flex-end",
    borderRadius: wp("2%"),
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: wp("2%"),
  },
  chartLabel: {
    fontSize: wp("2.8%"),
    color: COLORS.textSecondary,
    marginTop: hp("1%"),
  },

  // Top habits
  topHabitsCard: {
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    padding: wp("3%"),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topHabitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
    paddingVertical: hp("1%"),
  },
  topHabitIcon: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
  },
  topHabitInfo: {
    flex: 1,
    minWidth: 0,
  },
  topHabitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topHabitName: {
    flex: 1,
    minWidth: 0,
    fontSize: wp("3.1%"),
    fontFamily: "Medium",
    color: COLORS.textPrimary,
  },
  topHabitPercentage: {
    fontSize: wp("3%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
  },
  habitProgressBackground: {
    height: hp("0.7%"),
    backgroundColor: ` ${COLORS.primary}20`,
    borderRadius: hp("1%"),
    overflow: "hidden",
    marginTop: hp("0.6%"),
  },
  habitProgress: {
    height: "100%",
    borderRadius: hp("1%"),
  },
  streakText: {
    width: wp("17%"),
    fontSize: wp("2.5%"),
    color: COLORS.textSecondary,
    textAlign: "right",
  },
});
