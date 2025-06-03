export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "kebutuhan-pokok" | "snack" | "minuman" | "bumbu";
  description: string;
  stock: number;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  type: "single" | "shared";
  size: string;
  facilities: string[];
  description: string;
  available: boolean;
  floor: number;
  maxOccupants: number;
}

export interface Facility {
  name: string;
  icon: string;
  available: boolean;
}
