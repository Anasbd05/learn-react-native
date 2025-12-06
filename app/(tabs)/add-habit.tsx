import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
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

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!user) return;

    const { error } = await supabase.from("habits").insert({
      title: title,
      description: description,
      frequency: frequency,
      streak_count: 400,
      last_completed: "4 days ago",
    });

    if (error) {
      console.log(error.message);
      return;
    }

    console.log("Habit added!");
  };

  return (
    <View style={tw` px-2 py-4 bg-[#f5f5f5] justify-center flex-1  `}>
      <TextInput
        onChangeText={setTitle}
        style={tw`mb-4 bg-white `}
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
        style={tw`mt-2 bg-blue-400 `}
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
