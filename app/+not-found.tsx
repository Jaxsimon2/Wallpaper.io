import { Link } from "expo-router";
import { View, Text } from "react-native";

const notFound = () => {
  return (
    <View>
      <Text>Page doesn't exist</Text>
      <Link href="/">Click here to go back</Link>
    </View>
  );
};

export default notFound;
