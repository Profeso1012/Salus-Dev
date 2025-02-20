"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import { Button } from "../components/Button"
import { TextInput } from "../components/TextInput"
import { colors } from "../theme/colors"

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkSymptoms = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://your-flask-backend-url/api/check-symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      })
      const data = await response.json()
      if (response.ok) {
        setResult(data)
      } else {
        Alert.alert("Error", data.error || "An error occurred while checking symptoms")
      }
    } catch (error) {
      console.error("Error:", error)
      Alert.alert("Error", "An error occurred while checking symptoms. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Symptom Checker</Text>
        <Text style={styles.subtitle}>
          Describe your symptoms and let our AI help you understand what might be wrong
        </Text>

        <TextInput
          multiline
          numberOfLines={4}
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="Describe your symptoms here..."
          style={styles.input}
        />

        <Button title="Check Symptoms" onPress={checkSymptoms} loading={loading} disabled={!symptoms.trim()} />

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Analysis Result:</Text>
            <Text style={styles.resultText}>{result.diagnosis}</Text>
            <Text style={styles.resultText}>Severity: {result.severity}</Text>
            <Text style={styles.resultText}>{result.recommended_action}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  input: {
    height: 120,
    textAlignVertical: "top",
  },
  resultContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
})

