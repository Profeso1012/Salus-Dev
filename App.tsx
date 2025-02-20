import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import WelcomeScreen from "./src/screens/WelcomeScreen"
import SymptomChecker from "./src/screens/SymptomChecker"
import NearbyHospitals from "./src/screens/NearbyHospitals"
import { colors } from "./src/theme/colors"

const Stack = createNativeStackNavigator()

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
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
    </GestureHandlerRootView>
  )
}

export default App

