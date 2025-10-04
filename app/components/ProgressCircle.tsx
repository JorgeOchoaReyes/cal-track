import { theme } from "@/theme";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

type SemiCircleProgressProps = {
    progressShadowColor?: string;
    progressColor?: string;
    interiorCircleColor?: string;
    circleRadius?: number;
    progressWidth?: number;
    percentage?: number;
    exteriorCircleStyle?: StyleProp<ViewStyle>;
    interiorCircleStyle?: StyleProp<ViewStyle>;
    animationSpeed?: number;
    initialPercentage?: number;
    minValue?: number;
    maxValue?: number;
    currentValue?: number;
    children?: React.ReactNode;
};

export const SemiCircleProgress: React.FC<SemiCircleProgressProps> = ({
  progressShadowColor = "white",
  progressColor = theme.secondary,
  interiorCircleColor = "white",
  circleRadius = 100,
  progressWidth = 10,
  percentage,
  exteriorCircleStyle,
  interiorCircleStyle,
  animationSpeed = 2,
  initialPercentage = 0,
  minValue,
  maxValue,
  currentValue,
  children,
}) => {
  const rotationAnimation = useRef(new Animated.Value(initialPercentage)).current;

  const getPercentage = () => {
    if (percentage !== undefined) {
      return Math.max(Math.min(percentage, 100), 0);
    }

    if (
      currentValue !== undefined &&
        minValue !== undefined &&
        maxValue !== undefined
    ) {
      const newPercent =
    ((currentValue - minValue) / (maxValue - minValue)) * 100;
      return Math.max(Math.min(newPercent, 100), 0);
    }

    return 0;
  }; 

  useEffect(() => {
    const toValue = getPercentage();
    Animated.spring(rotationAnimation, {
      toValue,
      speed: animationSpeed,
      useNativeDriver: true,
    }).start();
  }, [percentage, currentValue, minValue, maxValue, animationSpeed, rotationAnimation]);

  const interiorCircleRadius = circleRadius - progressWidth;

  const styles = StyleSheet.create({
    exteriorCircle: {
      width: circleRadius * 2,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: progressShadowColor,
    },
    rotatingCircleWrap: {
      width: circleRadius * 2,
      height: circleRadius,
      top: circleRadius,
    },
    rotatingCircle: {
      width: circleRadius * 2,
      height: circleRadius,
      borderRadius: circleRadius,
      backgroundColor: progressColor,
      transform: [
        { translateY: -circleRadius / 2 },
        {
          rotate: rotationAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: ["0deg", "180deg"],
          }),
        },
        { translateY: circleRadius / 2 },
      ],
    },
    interiorCircle: {
      width: interiorCircleRadius * 2,
      height: interiorCircleRadius,
      borderRadius: interiorCircleRadius,
      backgroundColor: interiorCircleColor,
      top: progressWidth,
    },
  });

  return (
    <View
      style={[
        defaultStyles.exteriorCircle,
        styles.exteriorCircle,
        exteriorCircleStyle,
      ]}
    >
      <View style={[defaultStyles.rotatingCircleWrap, styles.rotatingCircleWrap]}>
        <Animated.View
          style={[defaultStyles.rotatingCircle, styles.rotatingCircle]}
        /></View>
      <View
        style={[
          defaultStyles.interiorCircle,
          styles.interiorCircle,
          interiorCircleStyle,
          {
            backgroundColor: theme.primary,
          }
        ]}
      >{children}</View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  exteriorCircle: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: "center",
    overflow: "hidden",
  },
  rotatingCircleWrap: {
    position: "absolute",
    left: 0,
  },
  rotatingCircle: {
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  interiorCircle: {
    overflow: "hidden",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
