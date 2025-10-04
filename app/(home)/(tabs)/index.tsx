import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link,Stack } from "expo-router";
import { Text, View } from "react-native";
import { SemiCircleProgress } from "@/app/components/ProgressCircle";
import { useGreeting } from "@/hooks/use-greeting";
import { MacrosCard } from "@/app/components/MacrosCard";
import { theme } from "@/theme";

export default function Page() { 
  const greeting = useGreeting();
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{
        backgroundColor: theme.primary, 
      }}>
        <SignedIn>
          <View style={{alignItems: "center", padding: 20, borderRadius: 10}}> 
            <Text style={{ fontSize: 32, color: "white", marginVertical: 20, fontWeight: "bold" }}>
              {greeting}!
            </Text>
            <SemiCircleProgress
              percentage={75}
              currentValue={75}>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: theme.contrast }}>75 Cal</Text>
            </SemiCircleProgress>
            <View style={{
              marginVertical: 20
            }}> 
              <MacrosCard style={{marginTop: 20}} />              
            </View>
          </View>
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut>
      </View>
    </>
  );
}
 