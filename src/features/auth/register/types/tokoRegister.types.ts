import type { RegisteredUser } from "./adminRegister.types";

interface Envelope<T> {
  status: { code: number; isSuccess: boolean };
  message: string;
  data: T;
}

export interface StoreData {
  store_id: string;
  owner_id: string;
  name: string;
  business_number: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CompleteStoreProfileData {
  token: string;
  user: RegisteredUser;
  store: StoreData;
}

export type CompleteStoreProfileResponse = Envelope<CompleteStoreProfileData>;
