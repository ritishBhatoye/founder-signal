import { useQuery } from "@apollo/client/react";
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { GET_USERS, UsersData } from "@/graphql/queries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increment, decrement } from "@/store/slices/counterSlice";

export default function DemoScreen() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter.value);

  const { data, loading, error } = useQuery<UsersData>(GET_USERS, {
    variables: { limit: 5, offset: 0 },
    fetchPolicy: "cache-and-network",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apollo + Redux Demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Redux State (Counter)</Text>
        <Text style={styles.counterValue}>{counter}</Text>
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.button}
            onPress={() => dispatch(decrement())}
          >
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => dispatch(increment())}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>GraphQL Query (Users)</Text>
        {loading && <ActivityIndicator size="small" />}
        {error && <Text style={styles.error}>Error: {error.message}</Text>}
        {data?.users?.map((user: { id: string; email: string }) => (
          <Text key={user.id} style={styles.userItem}>
            {user.email}
          </Text>
        ))}
        {!loading && !error && !data?.users?.length && (
          <Text style={styles.empty}>No users found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  userItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  error: {
    color: "#ff3b30",
  },
  empty: {
    color: "#8e8e93",
    textAlign: "center",
  },
});
