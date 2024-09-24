import React from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";

const Carousel = ({ data, renderItem }) => {
    const { width } = Dimensions.get("window");
    const cardWidth = width * 0.75;

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={cardWidth}
                snapToAlignment="start"
                decelerationRate="fast"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingVertical: 10,
    },
});

export default Carousel;
