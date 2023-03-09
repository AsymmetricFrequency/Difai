import { View, Text, StatusBar } from 'react-native'
import React from 'react'

export default function BarStatus() {
  return (
    <StatusBar
        backgroundColor={'#000'}
        barStyle={"light-content"}
      />
  )
}