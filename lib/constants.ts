export type CropType = {
  id: string;
  name: string;
  nameHi: string;
  nameHry: string;
  category: string;
  tempMin: number;
  tempMax: number;
  humidity: string;
  ratePerQuintalPerMonth: number;
  image: string;
  stackingTypes: string[];
  minDeposit: number;
};

export const CROPS: CropType[] = [
  {
    id: "potato",
    name: "Potato (Aaloo)",
    nameHi: "आलू",
    nameHry: "Aaloo",
    category: "tuber",
    tempMin: 2,
    tempMax: 4,
    humidity: "90-95%",
    ratePerQuintalPerMonth: 18,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
    stackingTypes: ["Jute Sacks", "Wooden Crates", "Palletized"],
    minDeposit: 2500,
  },
  {
    id: "onion",
    name: "Onion (Pyaz)",
    nameHi: "प्याज",
    nameHry: "Pyaz",
    category: "bulb",
    tempMin: 0,
    tempMax: 3,
    humidity: "65-70%",
    ratePerQuintalPerMonth: 15,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&q=80",
    stackingTypes: ["Jute Sacks", "Mesh Bags"],
    minDeposit: 2000,
  },
  {
    id: "garlic",
    name: "Garlic (Lehsun)",
    nameHi: "लहसुन",
    nameHry: "Lehsun",
    category: "bulb",
    tempMin: 0,
    tempMax: 2,
    humidity: "60-65%",
    ratePerQuintalPerMonth: 20,
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=80",
    stackingTypes: ["Jute Sacks", "Mesh Bags"],
    minDeposit: 3000,
  },
  {
    id: "apple",
    name: "Apple (Seb)",
    nameHi: "सेब",
    nameHry: "Seb",
    category: "fruits",
    tempMin: 1,
    tempMax: 4,
    humidity: "90-95%",
    ratePerQuintalPerMonth: 28,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&q=80",
    stackingTypes: ["Wooden Crates", "Palletized"],
    minDeposit: 4000,
  },
  {
    id: "kinnow",
    name: "Kinnow (Kinnu)",
    nameHi: "किन्नू",
    nameHry: "Kinnu",
    category: "fruits",
    tempMin: 3,
    tempMax: 8,
    humidity: "85-90%",
    ratePerQuintalPerMonth: 25,
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80",
    stackingTypes: ["Wooden Crates", "Palletized"],
    minDeposit: 3500,
  },
  {
    id: "tomato",
    name: "Tomato (Tamatar)",
    nameHi: "टमाटर",
    nameHry: "Tamatar",
    category: "fruits",
    tempMin: 8,
    tempMax: 12,
    humidity: "85-90%",
    ratePerQuintalPerMonth: 22,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80",
    stackingTypes: ["Wooden Crates"],
    minDeposit: 3000,
  },
  {
    id: "mustard",
    name: "Mustard (Sarson)",
    nameHi: "सरसों",
    nameHry: "Sarson",
    category: "grains",
    tempMin: 10,
    tempMax: 15,
    humidity: "55-60%",
    ratePerQuintalPerMonth: 10,
    image: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400&q=80",
    stackingTypes: ["Jute Sacks", "Palletized"],
    minDeposit: 1500,
  },
  {
    id: "wheat",
    name: "Wheat (Gehu)",
    nameHi: "गेहूँ",
    nameHry: "Gehu",
    category: "grains",
    tempMin: 10,
    tempMax: 15,
    humidity: "50-60%",
    ratePerQuintalPerMonth: 8,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
    stackingTypes: ["Jute Sacks", "Palletized"],
    minDeposit: 1200,
  },
  {
    id: "chilli",
    name: "Chilli (Mirchi)",
    nameHi: "मिर्च",
    nameHry: "Mirchi",
    category: "fruits",
    tempMin: 7,
    tempMax: 10,
    humidity: "90-95%",
    ratePerQuintalPerMonth: 24,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80",
    stackingTypes: ["Wooden Crates", "Palletized"],
    minDeposit: 3500,
  },
];

export const CATEGORIES = [
  { id: "tuber", icon: "🥔", color: "bg-amber-100 border-amber-800", textColor: "text-amber-900" },
  { id: "bulb", icon: "🧅", color: "bg-purple-100 border-purple-800", textColor: "text-purple-900" },
  { id: "fruits", icon: "🍎", color: "bg-red-100 border-red-800", textColor: "text-red-900" },
  { id: "grains", icon: "🌾", color: "bg-yellow-100 border-yellow-800", textColor: "text-yellow-900" },
  { id: "govt", icon: "🏛️", color: "bg-blue-100 border-blue-800", textColor: "text-blue-900" },
];

export const CHAMBER_STATUS = [
  { id: 1, name: "Chamber 1", crops: "Tuber & Bulb Crops", booked: 82, temp: "0°C – 4°C" },
  { id: 2, name: "Chamber 2", crops: "Fruits & Seasonal", booked: 45, temp: "1°C – 12°C" },
  { id: 3, name: "Chamber 3", crops: "Grains & Oilseeds", booked: 65, temp: "10°C – 15°C" },
];

export const GOVT_AGENCIES = ["FCI", "HAFED", "NAFED", "HSAMB", "Other State Agency", "Municipal Corporation"];

export const STACKING_TYPES = ["Palletized", "Wooden Crates", "Jute Sacks", "Mesh Bags"];

export const TEMP_RANGES = [
  { label: "-2°C to 4°C (Deep Cold)", min: -2, max: 4 },
  { label: "4°C to 12°C (Standard Cold)", min: 4, max: 12 },
  { label: "10°C to 15°C (Cool Ambient)", min: 10, max: 15 },
];

export const COMPANY = {
  name: "Rahul Agro Limited",
  address: "Sainipura, Taoru, Nuh District, Haryana — 122105",
  phone: "+91 9728517836",
  email: "info@rahulагроlimited.in",
  gateTimings: "6:00 AM – 10:00 PM (All Days)",
  mapUrl: "https://maps.google.com/?q=Sainipura+Taoru+Haryana",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.3!2d76.9!3d28.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDEyJzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890",
};
