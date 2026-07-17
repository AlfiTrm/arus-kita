"use client";

import dynamic from "next/dynamic";
import type { CourierTaskDetail } from "../types/courierTask.types";

const CourierDeliveryMap = dynamic(() => import("./CourierDeliveryMap").then((mod) => mod.CourierDeliveryMap), {
  ssr: false,
});

export function CourierDeliveryMapLoader({
  task,
  courierPosition,
  targetPosition,
}: {
  task: CourierTaskDetail;
  courierPosition: [number, number] | null;
  targetPosition: [number, number];
}) {
  return <CourierDeliveryMap task={task} courierPosition={courierPosition} targetPosition={targetPosition} />;
}
