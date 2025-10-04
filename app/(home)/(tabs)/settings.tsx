import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link,Stack } from "expo-router";
import { Text, View } from "react-native";  

export default function Page() {
  const { user } = useUser();

  return (
    <>
      <Stack.Screen options={{ title: "Settings" }} />
      <View>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text> 
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

// pages
/* 

 - app/home 
 - app/dates/[date]
 - app/foods/[foodId]
 - app/settings
 - app/log
*/