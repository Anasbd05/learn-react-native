import { supabase } from "@/lib/supabase";
import { Habit } from "@/types/database.type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Text } from "react-native-paper";
import tw from "twrnc";

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>();
  const router = useRouter();

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

  const fetchHabits = async () => {
    const { data, error } = await supabase.from("habits").select("*");
    setHabits(data as Habit[]);
    if (error) {
      console.log(error.message);
    } else {
      console.log(habits);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const renderRightActions = () => (
    <View
      style={tw` bg- justify-center items-end flex-1 bg-red-500 rounded-lg  mb-4 mt-1 px-4   `}
    >
      <MaterialCommunityIcons name="trash-can-outline" size={32} color="#fff" />
    </View>
  );
  const renderLeftActions = () => (
    <View
      style={tw` bg- justify-center items-start flex-1 bg-green-500 rounded-lg  mb-4 mt-1 px-4   `}
    >
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={32}
        color="#fff"
      />
    </View>
  );

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("habits").delete().eq("id", id);

      if (error) {
        console.error("Error deleting text:", error);
        return { success: false, error: error.message };
      } else {
        await fetchHabits();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("habits")
        .update({ is_completed: true })
        .eq("id", id);

      if (error) {
        console.error("Error completed text:", error);
        return { success: false, error: error.message };
      } else {
        await fetchHabits();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tw` px-3 flex-1 bg-[#f5f5f5]  `}>
      <View style={tw` flex flex-row mb-4 items-center justify-between`}>
        <Text style={tw` font-bold text-black `} variant="headlineSmall">
          Today&#39;s habbits
        </Text>
        <Button
          onPress={async () => {
            await logOut();
            router.push("/auth");
          }}
          icon={"logout"}
          mode="text"
        >
          Log out
        </Button>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {habits?.length === 0 ? (
          <View style={tw` flex mt-8 justify-center items-center `}>
            {" "}
            <Text style={tw`text-gray-600`}>
              No habbits yet. Add your first Habit!
            </Text>
          </View>
        ) : (
          habits?.map((habit, key) => (
            <Swipeable
              key={key}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={renderLeftActions}
              renderRightActions={renderRightActions}
              onSwipeableOpen={(direction) => {
                if (direction === "right") {
                  handleDelete(habit.id);
                } else {
                  handleComplete(habit.id);
                }

                swipeableRefs.current[habit.id]?.close();
              }}
              ref={(ref) => {
                swipeableRefs.current[habit.id] = ref;
              }}
            >
              <View
                style={tw`flex flex-col bg-white shadow-md rounded-lg p-4 mb-4 `}
              >
                <Text style={tw` font-semibold text-xl text-black mb-0.5  `}>
                  {habit.title}
                </Text>
                <Text style={tw`text-gray-800`}>{habit.description}</Text>
                <View
                  style={tw`flex flex-row mt-4 justify-between items-center `}
                >
                  <View
                    style={tw`flex flex-row items-center py-0.5  gap-1 px-1.5 bg-amber-100 text-orange-600 rounded-md   `}
                  >
                    <MaterialCommunityIcons
                      name="fire"
                      size={16}
                      style={tw`text-orange-600`}
                    />
                    <Text style={tw`text-orange-600 text-sm font-medium `}>
                      {habit.streak_count} day streak
                    </Text>
                  </View>
                  <Text
                    style={tw`font-semibold py-1 px-2 bg-[#ede7f6] text-purple-800 rounded-md`}
                  >
                    {habit.frequency}
                  </Text>
                </View>
              </View>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
