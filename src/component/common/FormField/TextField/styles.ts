import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingHorizontal: Platform.OS === "ios" ? 10 : 0,
        paddingVertical: Platform.OS === "ios" ? 10 : 0
    },
    label: {
        fontSize: 12,
        color : "#000",
    },
    error: {
        fontSize: 12,
        color :"red"
    }
})

export default styles