import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../utils/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { habits } from "../utils/dummyData";

type Category =
  | "All"
  | "Health"
  | "Fitness"
  | "Study"
  | "Personal"
  | "Mindfulness"
  | "Productivity"
  | "Finance"
  | "Social";
type Completion = {
  id: string;
  habitId: string;
  userId: string;
  habitName: string;
  category: string;
  completedAt: string;
  completed: boolean;
};
type HistoryGroup = {
  date: string;
  completedCount: number;
  totalHabits: number;
  completions: Completion[];
};

export default function History() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Dummy Data
  const categories: Category[] = [
    "All",
    "Health",
    "Fitness",
    "Study",
    "Personal",
    "Mindfulness",
    "Productivity",
    "Finance",
    "Social",
  ];

  const historyData: HistoryGroup[] = [
    {
      date: "Mon, Sep 15, 2026",
      completedCount: 3,
      totalHabits: 4,
      completions: [
        {
          id: "completion001",
          habitId: "habit001",
          userId: "user123",
          habitName: "Drink Water",
          category: "Health",
          completedAt: "8:20 AM",
          completed: true,
        },
        {
          id: "completion002",
          habitId: "habit002",
          userId: "user123",
          habitName: "Exercise",
          category: "Fitness",
          completedAt: "7:45 AM",
          completed: true,
        },
        {
          id: "completion003",
          habitId: "habit003",
          userId: "user123",
          habitName: "Read",
          category: "Study",
          completedAt: "9:10 PM",
          completed: true,
        },
        {
          id: "completion004",
          habitId: "habit004",
          userId: "user123",
          habitName: "Study TypeScript",
          category: "Study",
          completedAt: "6:30 PM",
          completed: false,
        },
      ],
    },
    {
      date: "Sun, Sep 14, 2026",
      completedCount: 4,
      totalHabits: 4,
      completions: [
        {
          id: "completion005",
          habitId: "habit001",
          userId: "user123",
          habitName: "Drink Water",
          category: "Health",
          completedAt: "8:15 AM",
          completed: true,
        },
        {
          id: "completion006",
          habitId: "habit002",
          userId: "user123",
          habitName: "Exercise",
          category: "Fitness",
          completedAt: "7:40 AM",
          completed: true,
        },
        {
          id: "completion007",
          habitId: "habit003",
          userId: "user123",
          habitName: "Read",
          category: "Study",
          completedAt: "3:20 PM",
          completed: true,
        },
        {
          id: "completion008",
          habitId: "habit004",
          userId: "user123",
          habitName: "Study TypeScript",
          category: "Study",
          completedAt: "6:45 PM",
          completed: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.content}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>History</Text>
            <Text style={styles.headerSubTitle}>
              View your habit completion
            </Text>
          </View>
          <Ionicons name="time" size={wp("6.5%")} color={COLORS.textPrimary} />
        </View>

        {/* Category Filter */}
        <View style={styles.filterView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterBtn,
                    isSelected && styles.selectedFilter,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* History */}
        <View style={styles.historyView}>
          {historyData.map((group) => {
            const filteredCompletions =
              selectedCategory === "All"
                ? group.completions
                : group.completions.filter(
                    (item) => item.category === selectedCategory,
                  );

            if (filteredCompletions.length === 0) {
              return null;
            }

            return (
              <View key={group.date} style={styles.historySection}>
                {/* Date header */}
                <View style={styles.dateHeader}>
                  <Text style={styles.dateText}>{group.date}</Text>

                  <View style={styles.completedBadge}>
                    <Text style={styles.completedBadgeText}>
                      {group.completedCount}/{group.totalHabits} completed
                    </Text>
                  </View>
                </View>

                {/* Habit for a particular Date */}
                <View style={styles.habitList}>
                  {filteredCompletions.map((completion) => {
                    const matchedHabit = habits.find(
                      (h) => h.id === completion.habitId,
                    );

                    return (
                      <View key={completion.id} style={styles.historyItem}>
                        {/* Habit Icon */}
                        <View
                          style={[
                            styles.historyIcon,
                            { backgroundColor: matchedHabit?.color },
                          ]}
                        >
                          <Ionicons
                            name={matchedHabit?.icon}
                            size={wp("5%")}
                            color={COLORS.white}
                          />
                        </View>

                        {/* Habit Information */}
                        <View style={styles.habitInfo}>
                          <Text style={styles.habitName}>
                            {completion.habitName}
                          </Text>

                          <Text style={styles.completedTime}>
                            {completion.completedAt}
                          </Text>
                        </View>

                        {/* Completion Status */}
                        <View
                          style={[
                            styles.checkCircle,
                            !completion.completed && styles.emptyCircle,
                          ]}
                        >
                          {completion.completed && (
                            <Ionicons
                              name="checkmark"
                              size={wp("4%")}
                              color={COLORS.white}
                            />
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
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

  // Category Filter
  filterView: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: wp("1%"),
    borderRadius: wp("4%"),
    gap: wp("2%"),
  },
  filterBtn: {
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.2%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("3%"),
  },
  filterText: {
    fontFamily: "Medium",
    fontSize: wp("3.5%"),
    color: COLORS.textSecondary,
  },
  selectedFilter: {
    backgroundColor: COLORS.primary,
  },
  selectedText: {
    color: COLORS.white,
  },

  // History
  historyView: {
    gap: hp("2.5%"),
    // marginTop: hp("")
  },
  historySection: {
    gap: hp("1%"),
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: wp("4.2%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
  },
  completedBadge: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.6%"),
    backgroundColor: `${COLORS.accent}20`,
    borderRadius: wp("5%"),
  },
  completedBadgeText: {
    fontSize: wp("3%"),
    fontFamily: "Medium",
    color: COLORS.accent,
  },
  habitList: {
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    // overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyItem: {
    minHeight: hp("8%"),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  historyIcon: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("3%"),
  },
  habitInfo: {
    flex: 1,
    minWidth: 0,
  },
  habitName: {
    fontSize: wp("3.8%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
  },
  completedTime: {
    fontSize: wp("3.2%"),
    fontFamily: "Regular",
    color: COLORS.textSecondary,
    marginTop: hp("0.3%"),
  },
  checkCircle: {
    width: wp("7%"),
    height: wp("7%"),
    borderRadius: wp("3.5%"),
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCircle: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
});
