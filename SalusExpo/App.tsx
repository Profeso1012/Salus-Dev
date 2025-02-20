import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WelcomeScreen from "./src/screens/WelcomeScreen"
import SymptomChecker from "./src/screens/SymptomChecker"
import NearbyHospitals from "./src/screens/NearbyHospitals"
import { colors } from "./src/theme/colors"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SymptomChecker" component={SymptomChecker} />
        <Stack.Screen name="NearbyHospitals" component={NearbyHospitals} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

