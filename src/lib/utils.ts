import {
  ClassDeliveryType,
  ClassLifecycleStatus,
  StudentClass,
} from "@/types/class/myClasses.interface";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const normalizeDeliveryType = (rawType?: string | null): ClassDeliveryType => {
  return rawType === "RECORDED" ? "RECORDED" : "LIVE";
};

export const resolveLifecycleStatus = (
  classItem: StudentClass,
  nowMilliseconds: number
): ClassLifecycleStatus => {
  const startMilliseconds = new Date(classItem.startTime).getTime();

  if (!Number.isFinite(startMilliseconds)) {
    const backendStatus = (classItem.status || "").toUpperCase();
    if (backendStatus === "ONGOING") return "ONGOING";
    if (["ENDED", "END", "COMPLETED"].includes(backendStatus)) {
      return "ENDED";
    }
    return "UPCOMING";
  }

  const durationMinutes = Number.isFinite(classItem.duration) && classItem.duration > 0
    ? classItem.duration
    : 60;

  const endMilliseconds = startMilliseconds + durationMinutes * 60 * 1000;

  if (nowMilliseconds < startMilliseconds) return "UPCOMING";
  if (nowMilliseconds >= startMilliseconds && nowMilliseconds < endMilliseconds) {
    return "ONGOING";
  }
  return "ENDED";
};

export const calculateOverallProgress = (
  classes: StudentClass[],
  nowMilliseconds: number
): number => {
  if (classes.length === 0) return 0;

  const completed = classes.filter(
    c => resolveLifecycleStatus(c, nowMilliseconds) === "ENDED"
  ).length;

  return Math.round((completed / classes.length) * 100);
};
