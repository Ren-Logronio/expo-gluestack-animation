import { ScrollView } from "@gluestack-ui/themed";
import { useState } from "react";

export default function SwipeableForm({
  onGestureSubmit,
  FirstScreen,
  SecondScreen,
}: {
  onGestureSubmit: () => Promise<any>;
  initialDisabled?: boolean;
  FirstScreen: React.ReactNode;
  SecondScreen: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleGesture = () => {
    onGestureSubmit()
      .then(() => {
        // success
      })
      .catch(() => {
        // failed
      })
      .finally(() => {
        // loaded
      });
  };
  return (
    <>
      <ScrollView>{FirstScreen}</ScrollView>
    </>
  );
}

export function calculateVelocity(
  initialPosition: number,
  finalPosition: number,
  initialTimestamp: number,
  finalTimestamp: number
) {
  return (
    (finalPosition - initialPosition) / (finalTimestamp - initialTimestamp)
  );
}
