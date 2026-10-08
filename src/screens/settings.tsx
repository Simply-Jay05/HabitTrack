import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../utils/colors";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  // To get logout function from AuthContext
  const { Logout, loading } = useAuth();

  // Realistic dummy profile data.
  const user = {
    id: "user123",
    displayName: "Benjamin",
    email: "benjamin@example.com",
    photoURL: "../../assets/profile.png",
  };

  const habits = [
    {
      id: "habit001",
      name: "Drink Water",
      category: "Health",
      icon: "water-outline" as keyof typeof Ionicons.glyphMap,
      color: COLORS.primary,
    },
    {
      id: "habit002",
      name: "Exercise",
      category: "Fitness",
      icon: "fitness-outline" as keyof typeof Ionicons.glyphMap,
      color: COLORS.secondary,
    },
    {
      id: "habit003",
      name: "Read",
      category: "Study",
      icon: "book-outline" as keyof typeof Ionicons.glyphMap,
      color: "#8B5CF6",
    },
    {
      id: "habit004",
      name: "Meditate",
      category: "Mindfulness",
      icon: "leaf-outline" as keyof typeof Ionicons.glyphMap,
      color: COLORS.accent,
    },
    {
      id: "habit005",
      name: "Study TypeScript",
      category: "Personal",
      icon: "laptop-outline" as keyof typeof Ionicons.glyphMap,
      color: "#F59E0B",
    },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          Logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubTitle}>
              Manage your account and habits
            </Text>
          </View>

          <Ionicons
            name="settings-outline"
            size={wp("9%")}
            color={COLORS.primary}
          />
        </View>

        {/* Profile */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.profileImage}
              />

              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={wp("4%")} color={COLORS.white} />
              </View>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.displayName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        </View>

        {/* My Habit */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Habits</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.habitsCard}>
          {habits.map((habit) => {
            const cateoryLength = habits.filter(
              (h) => h.category === habit.category,
            ).length;

            return (
              <View key={habit.id} style={styles.habitItem}>
                <View
                  style={[styles.habitIcon, { backgroundColor: habit.color }]}
                >
                  <Ionicons
                    name={habit.icon}
                    size={wp("6%")}
                    color={COLORS.white}
                  />
                </View>

                <Text style={styles.habitCategory} numberOfLines={1}>
                  {habit.category}
                </Text>
                <Text style={styles.habitCategory}>{cateoryLength}</Text>
              </View>
            );
          })}
        </View>

        {/* Account actions */}
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Ionicons
                  name="person-outline"
                  size={wp("5.5%")}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.actionText}>Update Profile</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={wp("5%")}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={wp("5.5%")}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.actionText}>Change Password</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={wp("5%")}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={{ flexDirection: "row", gap: wp("2%") }}>
              <Ionicons
                name="log-out-outline"
                size={wp("5.5%")}
                color={COLORS.primary}
              />

              <Text style={styles.logoutText}>Log Out</Text>
            </View>
          )}
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
    paddingVertical: hp("2%"),
    paddingBottom: hp("4%"),
    gap: hp("2%"),
  },

  /* Header */
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

  /* Profile */
  profileCard: {
    backgroundColor: COLORS.primary,
    borderRadius: wp("5%"),
    padding: wp("5%"),
    minHeight: hp("15%"),
    justifyContent: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cameraButton: {
    position: "absolute",
    right: -wp("1%"),
    bottom: 0,
    width: wp("7%"),
    height: wp("7%"),
    borderRadius: wp("3.5%"),
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
    marginLeft: wp("4%"),
  },
  userName: {
    fontSize: wp("6%"),
    fontFamily: "Bold",
    color: COLORS.white,
  },
  userEmail: {
    fontSize: wp("3.8%"),
    fontFamily: "Regular",
    color: COLORS.white,
    opacity: 0.9,
    marginTop: hp("0.5%"),
  },

  /* Habits */
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2.5%"),
    marginBottom: hp("1.5%"),
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontFamily: "Bold",
    color: COLORS.textPrimary,
  },
  viewAll: {
    fontSize: wp("3.8%"),
    fontFamily: "Bold",
    color: COLORS.primary,
  },
  habitsCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("2%"),
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  habitItem: {
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  habitIcon: {
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("6%"),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("0.8%"),
  },
  habitCategory: {
    fontSize: wp("3%"),
    fontFamily: "Medium",
    color: COLORS.textSecondary,
  },

  /* Account actions */
  actionsCard: {
    backgroundColor: COLORS.white,
    borderRadius: wp("4%"),
    marginTop: hp("2.5%"),
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  actionItem: {
    minHeight: hp("7%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("3%"),
  },
  actionText: {
    fontSize: wp("4%"),
    fontFamily: "Medium",
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: wp("4%"),
  },

  /* Logout */
  logoutButton: {
    height: hp("7%"),
    marginTop: hp("2.5%"),
    borderRadius: wp("4%"),
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp("2%"),
  },
  logoutText: {
    fontSize: wp("4%"),
    fontFamily: "Bold",
    color: COLORS.primary,
  },
});
