import { useSignIn, useSSO } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Button, Input } from "tamagui";
import React, { useEffect, useState } from "react";
import { Beef } from "@tamagui/lucide-icons"; 
import AntDesign from "@expo/vector-icons/AntDesign"; 

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startSSOFlow } = useSSO();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignInWithGoogle = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
        router.replace("/");
      } else {  
        router.replace("/");
        // Handle sign-in/sign-up based on the response
        // e.g., if signIn exists, complete the sign-in process
      }
    } catch (err) {
      console.error("SSO error", err);
    }
  };

 
  const onSignInPress = async () => {
    if (!isLoaded) return;
 
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
 
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else { 
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) { 
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12, padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 20 }}> 
          <Beef color={"black"} style={{backgroundColor: "black", paddingTop: 1 }} />
          <Text
            style={{ fontSize: 24, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}
          >
          Cal Track
          </Text>
        </View>
        <Input  
          style={{ width: "100%" }}
          borderWidth={2}
          value={emailAddress} 
          placeholder="Enter email" 
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        /> 
        <Input 
          style={{ width: "100%" }}
          borderWidth={2}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
        <Button onPress={onSignInPress} style={{ width: "100%", justifyContent: "center",  }} theme={"accent"}>
          Continue
        </Button>

        <Button
          onPress={handleSignInWithGoogle} style={{ width: "100%", justifyContent: "center", backgroundColor: "#4285F4", }}
          theme={"accent"}
          icon={<AntDesign name="google" size={24} color="white" />}
        > 
          Login with Google
        </Button>

        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text>Dont have an account?</Text>
          <Link href="/sign-up">
            <Text style={{
              textDecorationLine: "underline", textDecorationStyle: "solid",
              textDecorationColor: "blue",
              color: "blue",
            }}>Sign up</Text>
          </Link>
        </View>
      </View> 
    </>
  );
}
