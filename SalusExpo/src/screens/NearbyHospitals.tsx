"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, Alert } from "react-native"
import { colors } from "../theme/colors"

interface Hospital {
  name: string
  distance: string
  address: string
  available: boolean
  phone: string
}

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNearbyHospitals()
  }, [])

  const fetchNearbyHospitals = async () => {
    try {
      // In a real app, you would get the user's location here
      const latitude = 6.6018 // Example latitude for LASU Epe Campus
      const longitude = 3.947 // Example longitude for LASU Epe Campus

      const response = await fetch(
        `http://your-flask-backend-url/api/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`,
      )
      const data = await response.json()
      if (response.ok) {
        setHospitals(data)
      } else {
        Alert.alert("Error", "Failed to fetch nearby hospitals")
      }
    } catch (error) {
      console.error("Error:", error)
      Alert.alert("Error", "An error occurred while fetching nearby hospitals")
    } finally {
      setLoading(false)
    }
  }

  const renderHospital = ({ item }: { item: Hospital }) => (
    <View style={styles.hospitalItem}>
      <Text style={styles.hospitalName}>{item.name}</Text>
      <Text style={styles.hospitalInfo}>{item.distance} away</Text>
      <Text style={styles.hospitalInfo}>{item.address}</Text>
      <Text style={styles.hospitalInfo}>{item.available ? "Available" : "Not Available"}</Text>
      <Text style={styles.hospitalInfo}>{item.phone}</Text>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading nearby hospitals...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Hospitals</Text>
      <FlatList
        data={hospitals}
        renderItem={renderHospital}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  hospitalItem: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 8,
  },
  hospitalInfo: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
})

