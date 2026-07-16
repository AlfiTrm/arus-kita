import { apiClient } from "@/shared/services/apiClient";
import type { CreateEventData, CreateEventItemInput, CreateEventResponse } from "../types/adminEvent.types";

export const adminEventService = {
  create: async (params: {
    name: string;
    description: string;
    disasterType: string;
    address: string;
    latitude: number;
    longitude: number;
    geofenceRadius: number;
    photoBlob: Blob;
    items: CreateEventItemInput[];
  }): Promise<CreateEventData> => {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("description", params.description);
    formData.append("disaster_type", params.disasterType);
    formData.append("address", params.address);
    formData.append("latitude", String(params.latitude));
    formData.append("longitude", String(params.longitude));
    formData.append("geofence_radius", String(params.geofenceRadius));
    formData.append("photo", params.photoBlob, "event-photo.jpg");
    formData.append("items", JSON.stringify(params.items));

    const res = await apiClient.post<CreateEventResponse>("/admin/events", formData);
    return res.data;
  },
};
