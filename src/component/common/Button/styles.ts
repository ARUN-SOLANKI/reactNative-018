import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    filled: {
        backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent:'center',
        alignItems: 'center',
        gap:10,
        borderRadius:8,
    },
    filledText: {
        color: '#FFF',
        fontWeight:500
    },
    outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,

    },
    outlinedText: {
        color: '#000',
        fontWeight: 500

    },
})

export default styles