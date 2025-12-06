import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import tw from "twrnc";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? (
        <Text style={tw`text-2xl font-bold text-green-800`}>{user.email}</Text>
      ) : (
        <Link href={"/auth"} style={tw`text-2xl font-bold text-green-800`}>
          Login
        </Link>
      )}

      <Button
        onPress={async () => {
          await logOut();
          router.push("/auth");
        }}
        mode="text"
        icon={"logout"}
      >
        Log out
      </Button>
    </View>
  );
}
