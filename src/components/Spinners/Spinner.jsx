"use client";

import {
  ClipLoader,
  BeatLoader,
  RingLoader,
  BarLoader,
  PulseLoader,
} from "react-spinners";

export default function Spinner({
  type = "clip",
  size = 40,
  color = "#1E3A5F",
}) {
  switch (type) {
    case "beat":
      return <BeatLoader color={color} />;
    case "ring":
      return <RingLoader size={size} color={color} />;
    case "bar":
      return <BarLoader width={150} color={color} />;
    case "pulse":
      return <PulseLoader color={color} />;
    default:
      return <ClipLoader size={size} color={color} />;
  }
}
