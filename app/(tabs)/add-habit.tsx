import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import tw from "twrnc";

const frequencies = ["Daily", "Weekly", "Monthly"];
type frequency = (typeof frequencies)[number];

const AddHabbit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleSubmit = async () => {
    const { error } = await supabase.from("habits").insert({
      title: title,
      description: description,
      frequency: frequency,
    });

    if (error) {
      console.log(error.message);
      return;
    } else {
      // Wait a moment for the data to be fully persisted
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/");
      console.log("Habit added!");
    }
  };

  return (
    <View style={tw` px-2 py-4 bg-[#f5f5f5] justify-center flex-1  `}>
      <TextInput
        onChangeText={setTitle}
        style={tw`mb-4  bg-white `}
        label="Title"
        mode="outlined"
      />
      <TextInput
        onChangeText={setDescription}
        style={tw`mb-4 bg-white `}
        label="Description"
        mode="outlined"
      />
      <View style={tw`mb-6 `}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as frequency)}
          buttons={frequencies.map((frequence) => ({
            value: frequence,
            label: frequence,
          }))}
        />
      </View>
      <Button
        style={tw`mt-2`}
        onPress={handleSubmit}
        disabled={!title || !description}
        mode="contained"
      >
        Add habbit
      </Button>
    </View>
  );
};

export default AddHabbit;
