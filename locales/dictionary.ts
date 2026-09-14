export type Locale = "en" | "hi" | "hry";

export type Dictionary = {
  nav: {
    home: string;
    chambers: string;
    calculator: string;
    booking: string;
    govtProcurement: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    bookNow: string;
    chamberStatus: string;
    chamber1: string;
    chamber2: string;
    booked: string;
    available: string;
  };
  categories: {
    title: string;
    tuber: string;
    tuberDesc: string;
    bulb: string;
    bulbDesc: string;
    fruits: string;
    fruitsDesc: string;
    grains: string;
    grainsDesc: string;
    govt: string;
    govtDesc: string;
  };
  features: {
    title: string;
    enwr: string;
    enwrDesc: string;
    iot: string;
    iotDesc: string;
    dg: string;
    dgDesc: string;
    insurance: string;
    insuranceDesc: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    crop: string;
    quantity: string;
    duration: string;
    calculate: string;
    storageCost: string;
    insurance: string;
    advanceToken: string;
    totalEstimate: string;
    months: string;
    quintals: string;
    perQuintalPerMonth: string;
  };
  booking: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    cropType: string;
    quantity: string;
    duration: string;
    storageType: string;
    fullName: string;
    phone: string;
    aadhaar: string;
    address: string;
    review: string;
    confirm: string;
    next: string;
    back: string;
    bookingConfirmed: string;
    bookingId: string;
    downloadSlip: string;
  };
  contact: {
    title: string;
    address: string;
    addressValue: string;
    phone: string;
    email: string;
    gateTimings: string;
    gateTimingsValue: string;
    reefer: string;
    reeферValue: string;
    getDirections: string;
  };
  chatbot: {
    title: string;
    placeholder: string;
    send: string;
    greeting: string;
  };
  ticker: string;
  common: {
    bookSlot: string;
    viewDetails: string;
    learnMore: string;
    perMonth: string;
    perQuintal: string;
    minDeposit: string;
    humidity: string;
    tempRange: string;
    loading: string;
    submit: string;
  };
};

const en: Dictionary = {
  nav: {
    home: "Home",
    chambers: "Chambers",
    calculator: "Rent Calculator",
    booking: "Book Storage",
    govtProcurement: "Govt Procurement",
    contact: "Contact",
  },
  hero: {
    title: "Premium Cold Storage for Your Harvest",
    subtitle:
      "Rahul Agro Limited — Trusted by 500+ farmers & traders at Sainipura, Taoru. Reserve cold storage space for potatoes, onions, fruits & more.",
    searchPlaceholder: "Search by crop type (e.g. Potato, Onion, Apple)...",
    bookNow: "Book Storage Now",
    chamberStatus: "Live Chamber Status",
    chamber1: "Chamber 1 (Tuber & Bulb)",
    chamber2: "Chamber 2 (Fruits & Grains)",
    booked: "Booked",
    available: "Available",
  },
  categories: {
    title: "Storage Categories",
    tuber: "Tuber Crops",
    tuberDesc: "Potato / Aaloo — 2°C to 4°C",
    bulb: "Bulb Crops",
    bulbDesc: "Onion / Garlic — 0°C to 3°C",
    fruits: "Seasonal Fruits",
    fruitsDesc: "Kinnow, Apple, Tomato — 1°C to 8°C",
    grains: "Grains & Oilseeds",
    grainsDesc: "Mustard / Wheat — 10°C to 15°C",
    govt: "Govt Buffer Reserve",
    govtDesc: "FCI / HAFED / NAFED Tender Slabs",
  },
  features: {
    title: "Why Choose Rahul Agro?",
    enwr: "e-NWR Warehouse Receipts",
    enwrDesc: "Get bank financing against stored produce with e-NWR support",
    iot: "IoT Temp Monitoring",
    iotDesc: "24/7 live temperature & humidity logging for every chamber",
    dg: "100% DG Genset Backup",
    dgDesc: "Uninterrupted power supply at Sainipura Taoru facility",
    insurance: "Crop Insurance Cover",
    insuranceDesc: "Storage insurance available for all perishable commodities",
  },
  calculator: {
    title: "Storage Rent Calculator",
    subtitle: "Estimate your cold storage charges instantly",
    crop: "Select Crop",
    quantity: "Quantity (Quintals)",
    duration: "Storage Duration",
    calculate: "Calculate Charges",
    storageCost: "Storage Cost",
    insurance: "Insurance Levy (0.5%)",
    advanceToken: "Advance Token (20%)",
    totalEstimate: "Total Estimate",
    months: "Months",
    quintals: "Quintals",
    perQuintalPerMonth: "per quintal/month",
  },
  booking: {
    title: "Reserve Cold Storage Space",
    step1: "Crop Details",
    step2: "Storage Preferences",
    step3: "Your Details",
    step4: "Review & Confirm",
    cropType: "Crop Type",
    quantity: "Quantity (Quintals)",
    duration: "Duration (Months)",
    storageType: "Storage Type",
    fullName: "Full Name",
    phone: "Mobile Number",
    aadhaar: "Aadhaar / Kisan ID",
    address: "Village / Address",
    review: "Review Booking",
    confirm: "Confirm Reservation",
    next: "Next Step",
    back: "Back",
    bookingConfirmed: "Booking Confirmed!",
    bookingId: "Booking ID",
    downloadSlip: "Download Entry Slip",
  },
  contact: {
    title: "Visit Our Cold Storage Depot",
    address: "Main Office Address",
    addressValue: "Sainipura, Taoru, Nuh District, Haryana — 122105",
    phone: "Support Helpline",
    email: "Manager Email",
    gateTimings: "Gate Timings",
    gateTimingsValue: "6:00 AM – 10:00 PM (All Days)",
    reefer: "Reefer Parking",
    reeферValue: "Dedicated reefer truck bay available — 24x7 entry",
    getDirections: "Get Directions",
  },
  chatbot: {
    title: "Rahul Agro Sahayak",
    placeholder: "Ask about storage rates, crops, booking...",
    send: "Send",
    greeting:
      "Namaskar! I am your Rahul Agro Sahayak. Ask me about cold storage rates, crop temperatures, or how to book your slot. 🌾",
  },
  ticker:
    "🌾 Rahul Agro Limited — Govt & Private Cold Storage Reservation Open for Rabi & Kharif Crops | Onion & Potato Buffer Stock Available | Call: +91 9728517836 | Main Office: Sainipura, Taoru, Haryana 🌾",
  common: {
    bookSlot: "Book Slot",
    viewDetails: "View Details",
    learnMore: "Learn More",
    perMonth: "/month",
    perQuintal: "/quintal",
    minDeposit: "Min. Deposit",
    humidity: "Humidity",
    tempRange: "Temp Range",
    loading: "Loading...",
    submit: "Submit",
  },
};

const hi: Dictionary = {
  nav: {
    home: "होम",
    chambers: "चैंबर्स",
    calculator: "किराया कैलकुलेटर",
    booking: "भंडारण बुक करें",
    govtProcurement: "सरकारी खरीद",
    contact: "संपर्क",
  },
  hero: {
    title: "अपनी फसल के लिए प्रीमियम कोल्ड स्टोरेज",
    subtitle:
      "राहुल एग्रो लिमिटेड — सैनीपुरा, तावरू में 500+ किसानों और व्यापारियों का भरोसा। आलू, प्याज, फल और अधिक के लिए कोल्ड स्टोरेज स्थान आरक्षित करें।",
    searchPlaceholder: "फसल के प्रकार से खोजें (जैसे आलू, प्याज, सेब)...",
    bookNow: "अभी भंडारण बुक करें",
    chamberStatus: "लाइव चैंबर स्थिति",
    chamber1: "चैंबर 1 (कंद एवं कंद फसलें)",
    chamber2: "चैंबर 2 (फल एवं अनाज)",
    booked: "बुक हुआ",
    available: "उपलब्ध",
  },
  categories: {
    title: "भंडारण श्रेणियाँ",
    tuber: "कंद फसलें",
    tuberDesc: "आलू — 2°C से 4°C",
    bulb: "बल्ब फसलें",
    bulbDesc: "प्याज / लहसुन — 0°C से 3°C",
    fruits: "मौसमी फल",
    fruitsDesc: "किन्नू, सेब, टमाटर — 1°C से 8°C",
    grains: "अनाज और तिलहन",
    grainsDesc: "सरसों / गेहूँ — 10°C से 15°C",
    govt: "सरकारी बफर रिजर्व",
    govtDesc: "FCI / HAFED / NAFED टेंडर स्लैब",
  },
  features: {
    title: "राहुल एग्रो क्यों चुनें?",
    enwr: "e-NWR वेयरहाउस रसीद",
    enwrDesc: "e-NWR के जरिए संग्रहीत उपज पर बैंक ऋण प्राप्त करें",
    iot: "IoT तापमान निगरानी",
    iotDesc: "हर चैंबर में 24/7 लाइव तापमान व नमी लॉगिंग",
    dg: "100% DG जनसेट बैकअप",
    dgDesc: "सैनीपुरा तावरू सुविधा में निर्बाध विद्युत आपूर्ति",
    insurance: "फसल बीमा कवर",
    insuranceDesc: "सभी नाशवान वस्तुओं के लिए भंडारण बीमा उपलब्ध",
  },
  calculator: {
    title: "किराया कैलकुलेटर",
    subtitle: "अपने कोल्ड स्टोरेज शुल्क का अनुमान तुरंत लगाएं",
    crop: "फसल चुनें",
    quantity: "मात्रा (क्विंटल)",
    duration: "भंडारण अवधि",
    calculate: "शुल्क गणना करें",
    storageCost: "भंडारण लागत",
    insurance: "बीमा शुल्क (0.5%)",
    advanceToken: "अग्रिम टोकन (20%)",
    totalEstimate: "कुल अनुमान",
    months: "महीने",
    quintals: "क्विंटल",
    perQuintalPerMonth: "प्रति क्विंटल/माह",
  },
  booking: {
    title: "कोल्ड स्टोरेज स्थान आरक्षित करें",
    step1: "फसल विवरण",
    step2: "भंडारण प्राथमिकता",
    step3: "आपका विवरण",
    step4: "समीक्षा करें और पुष्टि करें",
    cropType: "फसल का प्रकार",
    quantity: "मात्रा (क्विंटल)",
    duration: "अवधि (महीने)",
    storageType: "भंडारण प्रकार",
    fullName: "पूरा नाम",
    phone: "मोबाइल नंबर",
    aadhaar: "आधार / किसान ID",
    address: "गाँव / पता",
    review: "बुकिंग की समीक्षा",
    confirm: "आरक्षण की पुष्टि करें",
    next: "अगला चरण",
    back: "वापस",
    bookingConfirmed: "बुकिंग की पुष्टि हो गई!",
    bookingId: "बुकिंग ID",
    downloadSlip: "प्रवेश पर्ची डाउनलोड करें",
  },
  contact: {
    title: "हमारे कोल्ड स्टोरेज डिपो पर आएं",
    address: "मुख्य कार्यालय का पता",
    addressValue: "सैनीपुरा, तावरू, नूह जिला, हरियाणा — 122105",
    phone: "सपोर्ट हेल्पलाइन",
    email: "प्रबंधक ईमेल",
    gateTimings: "गेट समय",
    gateTimingsValue: "सुबह 6:00 – रात 10:00 (सभी दिन)",
    reefer: "रीफर पार्किंग",
    reeферValue: "समर्पित रीफर ट्रक बे उपलब्ध — 24x7 प्रवेश",
    getDirections: "दिशा-निर्देश पाएं",
  },
  chatbot: {
    title: "राहुल एग्रो सहायक",
    placeholder: "भंडारण दर, फसल, बुकिंग के बारे में पूछें...",
    send: "भेजें",
    greeting:
      "नमस्कार! मैं आपका राहुल एग्रो सहायक हूँ। कोल्ड स्टोरेज दरों, फसल तापमान, या स्लॉट बुकिंग के बारे में पूछें। 🌾",
  },
  ticker:
    "🌾 राहुल एग्रो लिमिटेड — रबी और खरीफ फसलों के लिए सरकारी व निजी कोल्ड स्टोरेज आरक्षण खुला है | प्याज और आलू बफर स्टॉक उपलब्ध | कॉल करें: +91 9728517836 | मुख्य कार्यालय: सैनीपुरा, तावरू, हरियाणा 🌾",
  common: {
    bookSlot: "स्लॉट बुक करें",
    viewDetails: "विवरण देखें",
    learnMore: "और जानें",
    perMonth: "/माह",
    perQuintal: "/क्विंटल",
    minDeposit: "न्यूनतम जमा",
    humidity: "नमी",
    tempRange: "तापमान सीमा",
    loading: "लोड हो रहा है...",
    submit: "जमा करें",
  },
};

const hry: Dictionary = {
  nav: {
    home: "Ghar",
    chambers: "Khaat-Godaam",
    calculator: "Kiraya Calculator",
    booking: "Bhandar Book Karo",
    govtProcurement: "Sarkar Khareed",
    contact: "Baat Karo",
  },
  hero: {
    title: "Apni Fasal Khatir Premium Thanda Bhandar",
    subtitle:
      "Rahul Agro Limited — Sainipura, Taoru mein 500+ kisaan te wapaariyan ka bharosa. Aaloo, Pyaz, Phal aur hor cheej khatir thande kamre book karo.",
    searchPlaceholder: "Fasal ke hisaab se dhundo (jaise Aaloo, Pyaz, Seb)...",
    bookNow: "Abhi Bhandar Book Karo",
    chamberStatus: "Live Kamra Haalat",
    chamber1: "Kamra 1 (Aaloo / Pyaz Rakhwai)",
    chamber2: "Kamra 2 (Phal te Gehu)",
    booked: "Bhar Gaya",
    available: "Khali Hai",
  },
  categories: {
    title: "Bhandar ki Kism",
    tuber: "Kand Fasal",
    tuberDesc: "Aaloo — 2°C se 4°C",
    bulb: "Pyaz-Lehsun Fasal",
    bulbDesc: "Pyaz / Lehsun — 0°C se 3°C",
    fruits: "Mausami Phal",
    fruitsDesc: "Kinnow, Seb, Tamatar — 1°C se 8°C",
    grains: "Anaj te Sarson",
    grainsDesc: "Sarson / Gehu — 10°C se 15°C",
    govt: "Sarkar Buffer Reserve",
    govtDesc: "FCI / HAFED / NAFED Tender Slab",
  },
  features: {
    title: "Rahul Agro Kyun Chuno?",
    enwr: "e-NWR Bhandar Parchi",
    enwrDesc: "e-NWR se rakhi fasal pe bank karza lo",
    iot: "IoT Taapman Jaanch",
    iotDesc: "Har kamre mein 24/7 live taapman te nami log",
    dg: "100% DG Genset Backup",
    dgDesc: "Sainipura Taoru mein bijli kabhi nahi jaandi",
    insurance: "Fasal Bima Cover",
    insuranceDesc: "Sabhi kharab hone wali cheejaan khatir bhandar bima",
  },
  calculator: {
    title: "Kiraya Calculator",
    subtitle: "Apna thanda bhandar kiraya abhi pata karo",
    crop: "Fasal Chuno",
    quantity: "Tadaad (Quintal)",
    duration: "Kitne Mahine",
    calculate: "Kiraya Pata Karo",
    storageCost: "Bhandar Kiraya",
    insurance: "Bima Lagaan (0.5%)",
    advanceToken: "Paishgi Token (20%)",
    totalEstimate: "Poora Andaaza",
    months: "Mahine",
    quintals: "Quintal",
    perQuintalPerMonth: "per quintal/mahina",
  },
  booking: {
    title: "Thanda Kamra Book Karo",
    step1: "Fasal Bataao",
    step2: "Bhandar Pasand",
    step3: "Apna Haal Bataao",
    step4: "Jaancho te Pakko",
    cropType: "Fasal ki Kism",
    quantity: "Tadaad (Quintal)",
    duration: "Avadhi (Mahine)",
    storageType: "Bhandar Kism",
    fullName: "Poora Naam",
    phone: "Mobile Number",
    aadhaar: "Aadhaar / Kisan ID",
    address: "Gaon / Pata",
    review: "Booking Jaancho",
    confirm: "Pakki Karo",
    next: "Agla Kadam",
    back: "Pichhe",
    bookingConfirmed: "Booking Pakki Ho Gayi!",
    bookingId: "Booking ID",
    downloadSlip: "Entry Parchi Utaaro",
  },
  contact: {
    title: "Saade Thande Godaam Aa Jao",
    address: "Mukhya Daftar Pata",
    addressValue: "Sainipura, Taoru, Nuh Zila, Haryana — 122105",
    phone: "Madad Ke Liye Fon",
    email: "Manager Email",
    gateTimings: "Gate ka Waqt",
    gateTimingsValue: "Subah 6:00 – Raat 10:00 (Roz)",
    reefer: "Reefer Parking",
    reeферValue: "Reefer truck khatir alag jagah — 24x7 aao",
    getDirections: "Raasta Pata Karo",
  },
  chatbot: {
    title: "Rahul Agro Sahayak",
    placeholder: "Kiraya, fasal, booking baare puchho...",
    send: "Bhejo",
    greeting:
      "Ram Ram! Main hun Rahul Agro Sahayak. Thande bhandar ke kiraye, Aaloo/Pyaz ki sahi temperature, ya slot booking baare puchho. 🌾",
  },
  ticker:
    "🌾 Rahul Agro Limited — Rabi te Kharif Fasal khatir Sarkar te Nijji Thanda Bhandar Booking Khuli Hai | Pyaz te Aaloo Buffer Stock Hai | Fon Karo: +91 9728517836 | Mukhya Daftar: Sainipura, Taoru, Haryana 🌾",
  common: {
    bookSlot: "Slot Book Karo",
    viewDetails: "Tafseel Dekho",
    learnMore: "Hor Jaano",
    perMonth: "/mahina",
    perQuintal: "/quintal",
    minDeposit: "Thooda Paisha Pehle",
    humidity: "Nami",
    tempRange: "Taapman Seemaa",
    loading: "Load Ho Raha Hai...",
    submit: "Bhejo",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, hi, hry };
