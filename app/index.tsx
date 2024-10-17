import { SafeAreaView } from "react-native-safe-area-context";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

const index = () => {
  return (
    <SafeAreaView>
      <ToDoList />
      <ToDoForm />
    </SafeAreaView>
  );
};

export default index;
