import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    // Navigation
    home: "Home",
    findPros: "Find Pros",
    login: "Login",
    signUp: "Sign Up",
    
    // Home page
    findPerfectPhotographer: "Find the Perfect Photographer or Videographer in Sri Lanka",
    bookTalentedProfessionals: "Book talented professionals for your weddings, events, portraits, and more. Browse portfolios, compare prices, and book with confidence.",
    findProfessionals: "Find Professionals",
    joinAsPro: "Join as a Pro",
    
    // How it works
    howItWorks: "How BookMyShoot Works",
    findPerfectPro: "Find the Perfect Pro",
    browseCuratedSelection: "Browse through our curated selection of talented photographers, videographers, and editors across Sri Lanka.",
    bookPaySecurely: "Book & Pay Securely",
    selectPackage: "Select your preferred package, choose a date, and make secure payments through our platform.",
    captureMoments: "Capture Your Moments",
    enjoyEvent: "Enjoy your event while our professionals capture your special moments. Leave a review when you're done!",
    
    // Categories
    popularCategories: "Popular Categories",
    weddingPhotography: "Wedding Photography",
    portraitSessions: "Portrait Sessions",
    eventCoverage: "Event Coverage",
    droneVideography: "Drone Videography",
    
    // Footer
    connectingClients: "Connecting clients with talented photographers, videographers, and editors in Sri Lanka.",
    forClients: "For Clients",
    forProfessionals: "For Professionals",
    support: "Support",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    termsOfService: "Terms of Service",
    
    // Login/Register
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone Number",
    confirmPassword: "Confirm Password",
    iAm: "I am a:",
    clientLooking: "Client (Looking to book services)",
    professional: "Professional (Photographer/Videographer/Editor)",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    signingIn: "Signing in",
    dontHaveAccount: "Don't have an account?",
    createAccount: "Create an account",
    creatingAccount: "Creating account",
    passwordsDoNotMatch: "Passwords do not match",
    registrationFailed: "Registration failed",
    serverError: "Server error. Please try again.",
    optional: "optional",
    
    // Search
    findProfessionals: "Find Professionals",
    category: "Category",
    location: "Location",
    date: "Date",
    minPrice: "Min Price (LKR)",
    maxPrice: "Max Price (LKR)",
    minimumRating: "Minimum Rating",
    anyRating: "Any Rating",
    professionalsFound: "Professional(s) Found",
    noProfessionalsFound: "No professionals found matching your criteria.",
    
    // Service Detail
    aboutThisService: "About this service",
    packages: "Packages",
    noPackages: "No packages available for this service.",
    bookThisService: "Book this service",
    selectDate: "Select Date",
    requestBooking: "Request Booking",
    confirmBooking: "Confirm Booking",
    service: "Service",
    total: "Total",
    cancel: "Cancel",
    confirm: "Confirm",
    
    // Dashboard
    myBookings: "My Bookings",
    noBookingsYet: "No bookings yet",
    startExploring: "Start exploring professionals and book your first service.",
    serviceColumn: "Service",
    dateTime: "Date & Time",
    professional: "Professional",
    status: "Status",
    actions: "Actions",
    view: "View",
    
    // Pro Dashboard
    professionalDashboard: "Professional Dashboard",
    totalBookings: "Total Bookings",
    pendingRequests: "Pending Requests",
    thisMonthEarnings: "This Month Earnings",
    averageRating: "Average Rating",
    availability: "Availability",
    portfolio: "Portfolio",
    addAvailability: "Add Availability",
    addMedia: "Add Media",
    
    // Admin Dashboard
    adminDashboard: "Admin Dashboard",
    users: "Users",
    bookings: "Bookings",
    settings: "Settings",
    recentActivity: "Recent Activity",
    topProfessionals: "Top Professionals",
    user: "User",
    role: "Role",
    joined: "Joined",
    deleteUser: "Delete",
    siteName: "Site Name",
    supportEmail: "Support Email",
    commissionRate: "Commission Rate (%)",
    maintenanceMode: "Maintenance Mode",
    enableMaintenance: "Enable maintenance mode",
    saveChanges: "Save Changes"
  }
};

// Sinhala translations
const si = {
  translation: {
    // Navigation
    home: "මුල් පිටුව",
    findPros: "වෘත්තීය පුද්ගලයින් සොයන්න",
    login: "පිවිසීම",
    signUp: "ලියාපදිංචි වන්න",
    
    // Home page
    findPerfectPhotographer: "ශ්‍රී ලංකාවේ පරිපූර්ණ ඡායාරූප ශිල්පියා හෝ දෘශ්‍ය ශිල්පියා සොයා ගන්න",
    bookTalentedProfessionals: "ඔබේ විවාහ, සැමරීම්, පුද්ගලික ඡායාරූප සහ තවත් බොහෝ දේ සඳහා දක්ෂ වෘත්තීය පුද්ගලයින් පොත් කරගන්න. ඡායාරූප පොත්, මිල සංසන්දනය කර ආත්මවිශ්වාසයෙන් පොත් කරගන්න.",
    findProfessionals: "වෘත්තීය පුද්ගලයින් සොයන්න",
    joinAsPro: "වෘත්තීය පුද්ගලයෙකු ලෙස එකතු වන්න",
    
    // How it works
    howItWorks: "BookMyShoot යනු කුමක්ද",
    findPerfectPro: "පරිපූර්ණ වෘත්තීය පුද්ගලයා සොයා ගන්න",
    browseCuratedSelection: "ශ්‍රී ලංකාව පුරා ඇති දක්ෂ ඡායාරූප ශිල්පියන්, දෘශ්‍ය ශිල්පියන් සහ සංස්කරණ ශිල්පියන්ගේ අපගේ තෝරාගත් තේරීම පිළිබඳව ගවේෂණය කරන්න.",
    bookPaySecurely: "ආරක්ෂිතව පොත් කර ගෙවන්න",
    selectPackage: "ඔබ කැමති පැකේජය තෝරා ගෙන, දිනය තෝරා ගෙන, අපගේ වේදිකාව හරහා ආරක්ෂිත ගෙවීම් සිදු කරන්න.",
    captureMoments: "ඔබේ මොහොත් රැස් කරගන්න",
    enjoyEvent: "ඔබේ සැමරීම පිළිබඳව ප්‍රීති වන අතර අපගේ වෘත්තීය පුද්ගලයින් ඔබේ විශේෂ මොහොත් රැස් කර ගනී. ඔබ අවසන් වූ පසු සමාලෝචනයක් තැපෑලෙන්!",
    
    // Categories
    popularCategories: "හොඳින්ම ප්‍රවර්ග",
    weddingPhotography: "විවාහ ඡායාරූප ශිල්පය",
    portraitSessions: "පුද්ගලික ඡායාරූප සැසි",
    eventCoverage: "සැමරීම් රඳුනු දැක්වීම",
    droneVideography: "ඩ්‍රෝන් දෘශ්‍ය ශිල්පය",
    
    // Footer
    connectingClients: "ශ්‍රී ලංකාවේ ඇති දක්ෂ ඡායාරූප ශිල්පියන්, දෘශ්‍ය ශිල්පියන් සහ සංස්කරණ ශිල්පියන් සමඟ ග්‍රාහකයන් සම්බන්ධ කරයි.",
    forClients: "ග්‍රාහකයන් සඳහා",
    forProfessionals: "වෘත්තීය පුද්ගලයින් සඳහා",
    support: "සහය",
    helpCenter: "උදව් මධ්‍යස්ථානය",
    contactUs: "අප අමතන්න",
    termsOfService: "සේවා නියමයන්",
    
    // Login/Register
    email: "ඊමේල්",
    password: "මුරපදය",
    name: "නම",
    phone: "දුරකථන අංකය",
    confirmPassword: "මුරපදය තහවුරු කරන්න",
    iAm: "මම වන්නේ:",
    clientLooking: "ග්‍රාහක (සේවාවන් පොත් කිරීමට බලාපොරොත්තු වන)",
    professional: "වෘත්තීය පුද්ගලයෙකු (ඡායාරූප ශිල්පියා/දෘශ්‍ය ශිල්පියා/සංස්කරණ ශිල්පියා)",
    alreadyHaveAccount: "දැනටමත් ගිණුමක් තිබේ ද?",
    signIn: "පිවිසීම",
    dontHaveAccount: "ගිණුමක් නැද් ද?",
    createAccount: "ගිණුමක් සාදන්න",
    
    // Search
    findProfessionals: "වෘත්තීය පුද්ගලයින් සොයන්න",
    category: "ප්‍රවර්ගය",
    location: "ස්ථානය",
    date: "දිනය",
    minPrice: "අවම මිල (රු.)",
    maxPrice: "උපරිම මිල (රු.)",
    minimumRating: "අවම මැතිවීම",
    anyRating: "ඕනෑම මැතිවීමක්",
    professionalsFound: "වෘත්තීය පුද්ගලයා/හු (වෝ) හමු විය",
    noProfessionalsFound: "ඔබේ ප්‍රමාණවත් තත්ත්වයන් සමඟ හුදෙක් වෘත්තීය පුද්ගලයෙකු හමු නොවිණි.",
    
    // Service Detail
    aboutThisService: "මෙම සේවාව පිළිබඳව",
    packages: "පැකේජ",
    noPackages: "මෙම සේවාව සඳහා පැකේජ නොමැත.",
    bookThisService: "මෙම සේවාව පොත් කරගන්න",
    selectDate: "දිනය තෝරන්න",
    requestBooking: "පොත් කිරීමට ඉල්ලන්න",
    confirmBooking: "පොත් කිරීම තහවුරු කරන්න",
    service: "සේවාව",
    total: "එකතුව",
    cancel: "අවලංගු කරන්න",
    confirm: "තහවුරු කරන්න",
    
    // Dashboard
    myBookings: "මාගේ පොත්වාගැනීම්",
    noBookingsYet: "දැනට පොත්වාගැනීම් නැත",
    startExploring: "වෘත්තීය පුද්ගලයින් සොයා ගෙන ඔබේ පළමු සේවාව පොත් කරගන්න.",
    serviceColumn: "සේවාව",
    dateTime: "දිනය සහ වේලාව",
    professional: "වෘත්තීය පුද්ගලයා",
    status: "තත්ත්වය",
    actions: "ක්‍රියා",
    view: "බලන්න",
    
    // Pro Dashboard
    professionalDashboard: "වෘත්තීය පුද්ගලයාගේ උපකරණ පුවරුව",
    totalBookings: "එකතු පොත්වාගැනීම්",
    pendingRequests: "ඉල්ලීම් අවස්ථාවේ",
    thisMonthEarnings: "මෙම මාසයේ ආදායම්",
    averageRating: "සාමාන්‍ය මැතිවීම",
    availability: "ලබා ගත හැකි කාලය",
    portfolio: "ඡායාරූප පොත",
    addAvailability: "ලබා ගත හැකි කාලය එකතු කරන්න",
    addMedia: "මාධ්‍යය එකතු කරන්න",
    
    // Admin Dashboard
    adminDashboard: "පරිපාලක උපකරණ පුවරුව",
    users: "පරිශීලකයින්",
    bookings: "පොත්වාගැනීම්",
    settings: "සැකසුම්",
    recentActivity: "මෑත ක්‍රියාකාරකම්",
    topProfessionals: "හොඳම වෘත්තීය පුද්ගලයින්",
    user: "පරිශීලකයා",
    role: "භූමිකාව",
    joined: "එකතු වූයේ",
    deleteUser: "මකන්න",
    siteName: "අඩවියේ නම",
    supportEmail: "සහය ඊමේල්",
    commissionRate: "කොමිෂන් අනුපාතය (%)",
    maintenanceMode: "නඩත්තු ප්‍රකාරය",
    enableMaintenance: "නඩත්තු ප්‍රකාරය සක්‍රීය කරන්න",
    saveChanges: "වෙනස්කම් සුරකින්න"
  }
};

// Tamil translations
const ta = {
  translation: {
    // Navigation
    home: "முகப்பு",
    findPros: "தொழில்நுட்பவாதிகளை கண்டறியவும்",
    login: "உள்நுழைய",
    signUp: "பதிவு செய்யவும்",
    
    // Home page
    findPerfectPhotographer: "இலங்கையில் சரியான புகைப்படக் கலைஞர் அல்லது வீடியோ கலைஞரைக் கண்டறியவும்",
    bookTalentedProfessionals: "உங்கள் திருமணங்கள், நிகழ்ச்சிகள், உருவப்படங்கள் மற்றும் பலவற்றிற்கு திறமையுள்ள தொழில்நுட்பவாதிகளை முன்பதிவு செய்து கொள்ளுங்கள். தொகுப்புகளை உலாவி, விலைகளை ஒப்பிட்டு, நம்பிக்கையுடன் முன்பதிவு செய்து கொள்ளுங்கள்.",
    findProfessionals: "தொழில்நுட்பவாதிகளை கண்டறியவும்",
    joinAsPro: "தொழில்நுட்பவாதியாக சேரவும்",
    
    // How it works
    howItWorks: "BookMyShoot எப்படி வேலை செய்கிறது",
    findPerfectPro: "சரியான தொழில்நுட்பவாதியைக் கண்டறியவும்",
    browseCuratedSelection: "இலங்கை முழுவதும் உள்ள திறமையுள்ள புகைப்படக் கலைஞர்கள், வீடியோ கலைஞர்கள் மற்றும் திருத்தியவர்களின் நமது தேர்ந்தெடுக்கப்பட்ட தேர்வுகளை உலாவவும்.",
    bookPaySecurely: "பாதுகாப்பாக முன்பதிவு செய்து கட்டணம் செலுத்தவும்",
    selectPackage: "உங்களுக்கு விருப்பமான தொகுப்பைத் தேர்ந்தெடுத்து, தேதியைத் தேர்ந்தெடுத்து, எங்கள் தளத்தின் மூலம் பாதுகாப்பான கட்டணங்களைச் செலுத்தவும்.",
    captureMoments: "உங்கள் நிமிஷங்களைப் பிடிக்கவும்",
    enjoyEvent: "உங்கள் நிகழ்ச்சியில் இன்புறுங்கள், நமது தொழில்நுட்பவாதிகள் உங்கள் சிறப்பு நிமிஷங்களைப் பதிவு செய்வார்கள். முடிந்தவுடன் மதிப்பீட்டை விடுங்கள்!",
    
    // Categories
    popularCategories: "பிரபலமான வகைகள்",
    weddingPhotography: "திருமண புகைப்படக் கலை",
    portraitSessions: "உருவப்பட அமர்வுகள்",
    eventCoverage: "நிகழ்ச்சி கவரேஜ்",
    droneVideography: "டிரோன் வீடியோகிராஃபி",
    
    // Footer
    connectingClients: "இலங்கையில் உள்ள திறமையுள்ள புகைப்படக் கலைஞர்கள், வீடியோ கலைஞர்கள் மற்றும் திருத்தியவர்களுடன் வாடிக்கையாளர்களை இணைக்கிறது.",
    forClients: "வாடிக்கையாளர்களுக்கு",
    forProfessionals: "தொழில்நுட்பவாதிகளுக்கு",
    support: "ஆதரவு",
    helpCenter: "உதவி மையம்",
    contactUs: "எங்களை தொடர்பு கொள்ள",
    termsOfService: "சேவை விதிமுறைகள்",
    
    // Login/Register
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    name: "பெயர்",
    phone: "தொலைபேசி எண்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    iAm: "நான்:",
    clientLooking: "வாடிக்கையாளர் (சேவைகளை முன்பதிவு செய்ய விரும்புகிறேன்)",
    professional: "தொழில்நுட்பவாதி (புகைப்படக் கலைஞர்/வீடியோ கலைஞர்/திருத்தியவர்)",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    signIn: "உள்நுழைய",
    dontHaveAccount: "கணக்கு இல்லையா?",
    createAccount: "கணக்கை உருவாக்கவும்",
    
    // Search
    findProfessionals: "தொழில்நுட்பவாதிகளை கண்டறியவும்",
    category: "வகை",
    location: "இடம்",
    date: "தேதி",
    minPrice: "குறைந்தபட்ச விலை (ரூ.)",
    maxPrice: "அதிகபட்ச விலை (ரூ.)",
    minimumRating: "குறைந்தபட்ச மதிப்பீடு",
    anyRating: "எந்த மதிப்பீடும்",
    professionalsFound: "தொழில்நுட்பவாதி(கள்) கண்டறியப்பட்டது",
    noProfessionalsFound: "உங்கள் தேடல் தரவுகளுடன் பொருந்தும் தொழில்நுட்பவாதிகள் கிடைக்கவில்லை.",
    
    // Service Detail
    aboutThisService: "இந்த சேவை பற்றி",
    packages: "தொகுப்புகள்",
    noPackages: "இந்த சேவைக்கு தொகுப்புகள் எதுவும் கிடைக்கவில்லை.",
    bookThisService: "இந்த சேவையை முன்பதிவு செய்யவும்",
    selectDate: "தேதியை தேர்ந்தெடுக்கவும்",
    requestBooking: "முன்பதிவு கோரிக்கை",
    confirmBooking: "முன்பதிவை உறுதிப்படுத்தவும்",
    service: "சேவை",
    total: "மொத்தம்",
    cancel: "ரத்துசெய்",
    confirm: "உறுதிப்படுத்தவும்",
    
    // Dashboard
    myBookings: "எனது முன்பதிவுகள்",
    noBookingsYet: "இதுவரை முன்பதிவுகள் எதுவும் இல்லை",
    startExploring: "தொழில்நுட்பவாதிகளை உலாவி உங்கள் முதல் சேவையை முன்பதிவு செய்யுங்கள்.",
    serviceColumn: "சேவை",
    dateTime: "தேதி மற்றும் நேரம்",
    professional: "தொழில்நுட்பவாதி",
    status: "நிலை",
    actions: "செயல்கள்",
    view: "பார்வையிடு",
    
    // Pro Dashboard
    professionalDashboard: "தொழில்நுட்பவாதி டாஷ்போர்டு",
    totalBookings: "மொத்த முன்பதிவுகள்",
    pendingRequests: "நிலுவையிலுள்ள கோரிக்கைகள்",
    thisMonthEarnings: "இந்த மாத வருவாய்",
    averageRating: "சராசரி மதிப்பீடு",
    availability: "கிடைக்கும் நேரம்",
    portfolio: "தொகுப்பு",
    addAvailability: "கிடைக்கும் நேரத்தைச் சேர்க்கவும்",
    addMedia: "மீடியாவைச் சேர்க்கவும்",
    
    // Admin Dashboard
    adminDashboard: "நிர்வாக டாஷ்போர்டு",
    users: "பயனர்கள்",
    bookings: "முன்பதிவுகள்",
    settings: "அமைப்புகள்",
    recentActivity: "சமீபத்திய செயல்பாடுகள்",
    topProfessionals: "சிறந்த தொழில்நுட்பவாதிகள்",
    user: "பயனர்",
    role: "பங்கு",
    joined: "சேர்ந்தார்",
    deleteUser: "நீக்கு",
    siteName: "தளத்தின் பெயர்",
    supportEmail: "ஆதரவு மின்னஞ்சல்",
    commissionRate: "கமிஷன் விகிதம் (%)",
    maintenanceMode: "பராமரிப்பு பயன்முறை",
    enableMaintenance: "பராமரிப்பு பயன்முறையை இயக்கவும்",
    saveChanges: "மாற்றங்களை சேமி"
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      si: si,
      ta: ta
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;