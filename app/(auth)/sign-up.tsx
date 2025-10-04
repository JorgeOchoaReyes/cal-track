import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter , Stack } from "expo-router";
import { Input, Button } from "tamagui";
import { Beef } from "@tamagui/lucide-icons";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
 
  const onSignUpPress = async () => {
    if (!isLoaded) return; 
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <>
        <View style={{ gap: 10, padding: 20, flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}
          >Verify your email</Text>
          <Input
            style={{ width: "100%", }}
            autoCapitalize="none"
            value={code} placeholder="Enter your verification code" onChangeText={(code) => setCode(code)} />
          <Button style={{
            width: "100%", justifyContent: "center",
          }} 
          theme="accent"
          onPress={onVerifyPress}>
            Verify 
          </Button>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ gap: 10, padding: 20, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 20 }}> 
            <Beef color={"black"} style={{backgroundColor: "black", paddingTop: 1 }} />
            <Text
              style={{ fontSize: 24, fontWeight: "bold", justifyContent: "center", alignItems: "center" }}
            >
                  Cal Track
            </Text>
          </View>
          <Input
            autoCapitalize="none"
            value={emailAddress}
            style={{
              width: "100%",
            }}
            placeholder="Enter email"
            onChangeText={(email) => setEmailAddress(email)}
          />
          <Input
            value={password}
            style={{
              width: "100%",
            }}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
          <Button style={{
            width: "100%", justifyContent: "center",
          }} theme={"accent"} onPress={onSignUpPress}>
            Continue
          </Button>
          <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Text>Already have an account?</Text>
            <Link href="/sign-in">
              <Text
                style={{
                  textDecorationLine: "underline", textDecorationStyle: "solid",
                  textDecorationColor: "blue",
                  color: "blue",
                }}
              >Sign in</Text>
            </Link>
          </View>
        </>
      </View>
    </>
  );
}
