import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Button } from "../components/Button"
import { colors } from "../theme/colors"

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<any>
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iPhone%2014%20&%2015%20Pro%20Max%20-%201-OO4ZHOgUdYM1Nu4D8CH7oWUZdxpvaj.svg",
            }}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Salus</Text>
          <Text style={styles.subtitle}>Your AI-powered healthcare companion for the LASU Epe Campus community</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Check Symptoms" onPress={() => navigation.navigate("SymptomChecker")} variant="primary" />
          <Button title="Nearby Hospitals" onPress={() => navigation.navigate("NearbyHospitals")} variant="secondary" />
          <Button title="Login" onPress={() => navigation.navigate("Login")} variant="outline" />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  illustration: {
    width: "100%",
    height: 300,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 32,
  },
})

export default WelcomeScreen

