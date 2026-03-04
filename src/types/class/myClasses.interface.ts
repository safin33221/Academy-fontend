/* ============================================================================
   TYPES
============================================================================ */

import { IBatch } from "../batch/batch.interface";

export type ClassDeliveryType = "LIVE" | "RECORDED";
export type ClassLifecycleStatus = "UPCOMING" | "ONGOING" | "ENDED";

export interface StudentClass {
    id: string;
    title: string;
    description?: string | null;
    startTime: string;
    duration: number;
    classStatus?: string | null;
    status?: string | null;
    zoomJoinUrl?: string | null;
    recordingUrl?: string | null;
    batch?: IBatch;
}

