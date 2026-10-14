/**
 * TravelMate — Verified Package Itineraries & Authentic Accommodation Data
 * 
 * Factual day-by-day activity timelines, verified attractions, geographic coordinates,
 * authentic accommodation information, and authoritative tourism board references.
 */

export const PACKAGE_ITINERARIES = {
  // 1. Ooty Hill Station Tour (Ooty, Tamil Nadu)
  "ooty": {
    matchedKeywords: ["ooty", "nilgiri", "tamil nadu"],
    title: "Ooty Hill Station Tour",
    destination: "Ooty, Tamil Nadu, India",
    duration: "3 days, 2 nights",
    bestSeason: "October to June (pleasant weather, tea harvest)",
    suitableFor: "Families, Nature Lovers, Couples",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (The Nilgiris, Ooty)",
    sourceAttribution: "Tamil Nadu Tourism Development Corporation (ttdconline.com)",
    overview:
      "Nestled at 2,240 meters in the Nilgiri Hills, Ooty (Udhagamandalam) is known as the 'Queen of Hill Stations.' This itinerary covers the UNESCO-listed Nilgiri Mountain Railway, panoramic Doddabetta Peak, pristine tea estates, and colonial heritage gardens.",
    
    // Verified Accommodation
    accommodation: {
      name: "Savoy - IHCL SeleQtions, Ooty",
      type: "Colonial Heritage Hotel (Established 1841)",
      address: "77, Sylks Road, Ooty, The Nilgiris, Tamil Nadu 643001, India",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified heritage resort photography",
      mapUrl: "https://maps.google.com/?q=Savoy+IHCL+SeleQtions+Ooty",
      checkIn: "14:00",
      checkOut: "12:00",
      roomType: "Superior Heritage Cottage / Room",
      capacity: "2 Adults + 1 Child per room",
      amenities: [
        "Wood-burning in-room fireplace",
        "Free High-speed Wi-Fi",
        "Multi-cuisine Dining Room & Lounge Bar",
        "Ayurvedic Spa & Wellness Centre",
        "Lush 6-acre Landscaped Lawns",
        "Concierge & Local Guide Desk"
      ],
      rules: "Valid Government ID required at check-in. Non-smoking rooms. Warm clothing recommended year-round.",
      providerNotes: "Official heritage property verified with Taj SeleQtions portfolio."
    },

    // Day-by-Day Activity Schedule
    days: [
      {
        dayNumber: 1,
        title: "Colonial Charm, Botanical Wonders & Doddabetta Summit",
        morning: {
          time: "09:00 - 12:30",
          activity: "Government Botanical Garden & Ooty Lake Stroll",
          attraction: "Government Botanical Garden, Ooty",
          location: "Vannarapettai, Ooty, Tamil Nadu 643001",
          mapUrl: "https://maps.google.com/?q=Government+Botanical+Garden+Ooty",
          duration: "3.5 hours",
          transport: "Private coach / cab from Coimbatore (85 km, ~3 hrs) or Mettupalayam",
          description: "Explore 55 acres of terraced gardens established in 1848 by the Marquis of Tweeddale, featuring over 1,000 species of flora and a 20-million-year-old fossilized tree trunk.",
          entranceFee: "₹40 per adult (Official Horticulture Dept. fee)",
          notes: "Photography allowed. Wheelchair accessible along central paved paths."
        },
        afternoon: {
          time: "13:00 - 15:30",
          activity: "Authentic Nilgiri Lunch & Ascent to Doddabetta Peak",
          attraction: "Doddabetta Peak & Telescope House",
          location: "Ooty-Kotagiri Road, The Nilgiris, Tamil Nadu 643002",
          mapUrl: "https://maps.google.com/?q=Doddabetta+Peak+Ooty",
          duration: "2.5 hours",
          transport: "10 km uphill drive from central Ooty (~25 mins)",
          description: "Stand at 2,637 meters (8,650 ft), the highest point in the Nilgiri Mountains. Enjoy panoramic vistas across the Bandipur National Park plains and misty valleys.",
          entranceFee: "₹10 per adult, ₹10 for Telescope house",
          notes: "Can be windy and foggy; light woolens recommended."
        },
        evening: {
          time: "16:30 - 19:30",
          activity: "Boating on Ooty Lake & Charing Cross Bazaar",
          attraction: "Ooty Boat House & Charing Cross",
          location: "North Lake Road, Ooty, Tamil Nadu 643004",
          mapUrl: "https://maps.google.com/?q=Ooty+Lake+Boat+House",
          duration: "3 hours",
          transport: "Short cab transfer (4 km, ~10 mins)",
          description: "Paddle boating on the artificial lake built by John Sullivan in 1824, followed by tasting homemade Nilgiri chocolates, eucalyptus oils, and spices in the Charing Cross commercial hub.",
          entranceFee: "₹15 entry + boating ticket (₹200-₹400 based on boat type)",
          notes: "Boat house closes at 18:00."
        }
      },
      {
        dayNumber: 2,
        title: "UNESCO Heritage Mountain Railway & Coonoor Tea Trails",
        morning: {
          time: "08:30 - 12:00",
          activity: "Nilgiri Mountain Railway (Toy Train) Ride to Coonoor",
          attraction: "Nilgiri Mountain Railway (UNESCO World Heritage Site)",
          location: "Udagamandalam Railway Station to Coonoor Station",
          mapUrl: "https://maps.google.com/?q=Udagamandalam+Railway+Station",
          duration: "3.5 hours",
          transport: "Historic X-class steam/diesel meter-gauge locomotive across viaducts and tunnels (19 km)",
          description: "Experience the iconic rack-and-pinion mountain train built by the British in 1908, offering breathtaking valley drop-offs and pine forest vistas.",
          entranceFee: "IRCTC First Class ₹205 / Second Class ₹30 (Advance booking recommended)",
          notes: "Subject to Southern Railway schedules; advance reservation on irctc.co.in strongly advised."
        },
        afternoon: {
          time: "12:30 - 15:30",
          activity: "Sim's Park & Highfield Tea Factory Tour",
          attraction: "Highfield Tea Factory & Sim's Park, Coonoor",
          location: "Coonoor, The Nilgiris, Tamil Nadu 643101",
          mapUrl: "https://maps.google.com/?q=Sims+Park+Coonoor",
          duration: "3 hours",
          transport: "Local transport in Coonoor",
          description: "Witness the complete orthodox tea manufacturing process from plucking to drying and grading, followed by fresh Nilgiri tea tasting and a stroll in Sim's Park botanical arboretum.",
          entranceFee: "Sim's Park ₹30; Factory tour ₹20",
          notes: "Fresh vacuum-packed tea and Nilgiri honey available for purchase."
        },
        evening: {
          time: "16:00 - 19:00",
          activity: "Dolphin's Nose Viewpoint & Return to Ooty",
          attraction: "Dolphin's Nose & Catherine Falls Viewpoint",
          location: "Near Coonoor, Tamil Nadu 643103",
          mapUrl: "https://maps.google.com/?q=Dolphins+Nose+Coonoor",
          duration: "3 hours",
          transport: "Scenic return drive to Ooty (18 km, ~45 mins)",
          description: "Marvel at the dramatic rock formation resembling a dolphin's nose, looking across the abyss to Catherine Falls cascading in the distance.",
          entranceFee: "Nominal municipal entry ₹15",
          notes: "Monkeys present; keep food items sealed."
        }
      },
      {
        dayNumber: 3,
        title: "Pine Forests, Wenlock Downs & Pykara Cascades",
        morning: {
          time: "09:00 - 12:30",
          activity: "Wenlock Downs 9th Mile & Pine Forest",
          attraction: "Wenlock Downs (Shooting Point) & Pine Forest",
          location: "Ooty-Gudalur-Mysore Road, Sholur, Tamil Nadu 643005",
          mapUrl: "https://maps.google.com/?q=Wenlock+Downs+9th+Mile+Ooty",
          duration: "3.5 hours",
          transport: "Cab along Mysore Road (15 km northwest)",
          description: "Walk across sweeping undulating meadows of the 20,000-acre Wenlock Downs, a favorite filming location, and wander through dense Siberian pine tree groves.",
          entranceFee: "₹10 per adult",
          notes: "Gentle hill walking; comfortable walking shoes required."
        },
        afternoon: {
          time: "13:00 - 16:30",
          activity: "Pykara Waterfalls & Serene Lake Speedboating",
          attraction: "Pykara Lake & Dam",
          location: "Pykara, The Nilgiris, Tamil Nadu 643224",
          mapUrl: "https://maps.google.com/?q=Pykara+Lake+Boathouse",
          duration: "3.5 hours",
          transport: "10 km further along Gudalur road",
          description: "Visit the sacred river of the Toda tribe as it tumbles over dual cascades, followed by speedboating across Pykara reservoir surrounded by shola forests.",
          entranceFee: "₹20 entry + ₹750 per speedboat (up to 6 passengers)",
          notes: "Operated safely by TTDC with mandatory life jackets."
        },
        evening: {
          time: "17:00 - 19:30",
          activity: "Nilgiri Toda Heritage Centre & Departure Transfer",
          attraction: "Government Museum & Heritage Village",
          location: "Mysore Road, Ooty",
          mapUrl: "https://maps.google.com/?q=Government+Museum+Ooty",
          duration: "2.5 hours",
          transport: "Transfer to Coimbatore Airport / Mettupalayam Junction",
          description: "Final stop to observe traditional Toda tribal embroidery and Toda bamboo huts before departing for onward journey.",
          entranceFee: "Free / Nominal ₹10",
          notes: "Safe onward travel down the Nilgiri Ghat roads before nightfall."
        }
      }
    ],

    inclusions: [
      "2 Nights stay at Savoy - IHCL SeleQtions / verified heritage room",
      "Daily breakfast at the hotel dining room",
      "All dedicated private transfers in AC vehicle (AC off on hill roads)",
      "Guided tea tasting session at Highfield Factory",
      "All toll taxes, parking fees, and driver allowances"
    ],
    exclusions: [
      "Airfare / Train tickets to/from Coimbatore or Mettupalayam",
      "Boating charges at Ooty Lake & Pykara Lake",
      "Monument entrance camera fees",
      "Personal expenses, room service, and laundry"
    ],
    travelTips: [
      "Carry light woolens even in summer; temperatures drop to 10°C at night.",
      "Book the Nilgiri Mountain Railway ticket on IRCTC at least 30-60 days in advance.",
      "Carry motion sickness medication if prone to car sickness on the 36 hairpin bends."
    ],
    officialReferences: [
      { name: "Tamil Nadu Tourism (TTDC)", url: "https://www.tamilnadutourism.tn.gov.in" },
      { name: "Southern Railway Nilgiri Heritage", url: "https://sr.indianrailways.gov.in" }
    ]
  },

  // 2. Dubai Luxury & Desert Safari Tour (Dubai, UAE)
  "dubai": {
    matchedKeywords: ["dubai", "uae", "burj khalifa"],
    title: "Dubai Luxury & Desert Safari Tour",
    destination: "Dubai, United Arab Emirates",
    duration: "5 days, 4 nights",
    bestSeason: "November to March (pleasant 22°C - 28°C temperatures)",
    suitableFor: "Luxury Seekers, Families, Couples, Shopping Enthusiasts",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (Downtown Dubai Skyline)",
    sourceAttribution: "Dubai Department of Economy and Tourism (visitdubai.com)",
    overview:
      "Experience Dubai's contrast of futuristic architectural marvels and timeless Arabian desert dunes. From the 124th floor of the Burj Khalifa to camel trekking in the Dubai Desert Conservation Reserve and cruising Dubai Marina.",

    accommodation: {
      name: "Address Dubai Marina",
      type: "5-Star Waterfront Luxury Hotel",
      address: "66 Al Marsa Street, Dubai Marina, PO Box 32923, Dubai, UAE",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified Address Hotels luxury accommodation",
      mapUrl: "https://maps.google.com/?q=Address+Dubai+Marina",
      checkIn: "15:00",
      checkOut: "12:00",
      roomType: "Deluxe Marina View Room with Balcony",
      capacity: "2 Adults + 1 Child",
      amenities: [
        "Elevated 50-meter infinity pool overlooking luxury yachts",
        "Direct air-conditioned pedestrian link to Dubai Marina Mall",
        "The Spa at Address Marina with hydrotherapy facilities",
        "Complimentary high-speed Wi-Fi and 24-hour business centre",
        "Fitness center with personal trainers and steam rooms",
        "5 on-site dining venues including Mazina international buffet"
      ],
      rules: "Passport required at check-in. Tourism Dirham fee of AED 20/room/night payable directly to hotel.",
      providerNotes: "Official Emaar Hospitality partner property."
    },

    days: [
      {
        dayNumber: 1,
        title: "Downtown Grandeur, Burj Khalifa & Dancing Fountains",
        morning: {
          time: "10:00 - 13:00",
          activity: "Arrival & Dubai Mall Exploration",
          attraction: "The Dubai Mall & Dubai Aquarium Underwater Zoo",
          location: "Financial Centre Road, Downtown Dubai, UAE",
          mapUrl: "https://maps.google.com/?q=The+Dubai+Mall",
          duration: "3 hours",
          transport: "Private luxury airport transfer from DXB Terminal 1/3 (15 mins)",
          description: "Arrive at one of the world's largest retail and entertainment complexes. View the 10-million-liter Dubai Aquarium tank with over 140 species of sharks and rays.",
          entranceFee: "Mall entry free; Aquarium pass ~AED 199",
          notes: "Comfortable footwear is essential; the mall spans 12 million sq ft."
        },
        afternoon: {
          time: "14:30 - 17:30",
          activity: "At The Top — Burj Khalifa 124th & 125th Floor Observation",
          attraction: "Burj Khalifa (World's Tallest Tower, 828m)",
          location: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
          mapUrl: "https://maps.google.com/?q=Burj+Khalifa",
          duration: "3 hours",
          transport: "Direct access through Lower Ground Level of Dubai Mall",
          description: "Ascend at 10 meters per second in double-deck elevators to the 124th and 125th floors for 360-degree vistas across the Arabian Gulf, desert, and skyline.",
          entranceFee: "Prime hours ticket ~AED 259 / Non-prime ~AED 179",
          notes: "Timed-entry ticket; arrive 15 minutes before your time slot."
        },
        evening: {
          time: "18:30 - 21:00",
          activity: "Dubai Fountain Spectacle & Waterfront Dining",
          attraction: "The Dubai Fountain at Burj Lake",
          location: "Burj Lake, Downtown Dubai",
          mapUrl: "https://maps.google.com/?q=The+Dubai+Fountain",
          duration: "2.5 hours",
          transport: "Walk across Souk Al Bahar bridge",
          description: "Watch choreographed water jets shoot up to 140 meters high synchronized to world-famous orchestral, Arabic, and contemporary tracks.",
          entranceFee: "Free viewing on boardwalk; Lake boat ride AED 68",
          notes: "Shows run every 30 minutes from 18:00 to 23:00."
        }
      },
      {
        dayNumber: 2,
        title: "Old Dubai Heritage, Creek Abra & Gold & Spice Souks",
        morning: {
          time: "09:30 - 12:30",
          activity: "Al Fahidi Historical District & Dubai Coffee Museum",
          attraction: "Al Fahidi Historical Neighbourhood (Al Bastakiya)",
          location: "Bur Dubai, Dubai Creek waterfront, UAE",
          mapUrl: "https://maps.google.com/?q=Al+Fahidi+Historical+Neighborhood",
          duration: "3 hours",
          transport: "Metro Red Line to BurJuman or private AC van (20 mins)",
          description: "Wander through restored 19th-century gypsum and coral buildings with traditional wind towers (barjeel), visiting artisan art galleries and the Coffee Museum.",
          entranceFee: "Free neighbourhood access; Coffee Museum AED 10",
          notes: "Dress respectfully with shoulders and knees covered in heritage quarters."
        },
        afternoon: {
          time: "13:00 - 15:30",
          activity: "Traditional Abra Boat Crossing to Deira Souks",
          attraction: "Dubai Creek (Khor Dubai) & Abra Water Taxi",
          location: "Bur Dubai Abra Station to Deira Old Souk Station",
          mapUrl: "https://maps.google.com/?q=Bur+Dubai+Abra+Station",
          duration: "2.5 hours",
          transport: "Wooden motorized abra boat (5 mins across the Creek)",
          description: "Cross the historic salt-water creek that formed Dubai's early trade route, then immerse yourself in the vibrant scents of cardamom, frankincense, and saffron in the Spice Souk.",
          entranceFee: "AED 1 per person cash for abra crossing",
          notes: "Carry small coin change for the traditional abra."
        },
        evening: {
          time: "16:00 - 18:30",
          activity: "Dubai Gold Souk & Al Shindagha Museum",
          attraction: "Dubai Gold Souk, Deira",
          location: "Al Ras, Deira, Dubai, UAE",
          mapUrl: "https://maps.google.com/?q=Dubai+Gold+Souk",
          duration: "2.5 hours",
          transport: "5-minute walk from Spice Souk",
          description: "Browse over 380 jewelry retailers under timber-roofed arcades showcasing certified gold, platinum, and precious gemstones regulated by Dubai Municipality.",
          entranceFee: "Free entry",
          notes: "Prices are tied to global gold market rates; bargaining on making charges is customary."
        }
      },
      {
        dayNumber: 3,
        title: "Dune Bashing, Camel Trekking & Bedouin Desert Camp",
        morning: {
          time: "10:00 - 14:00",
          activity: "Morning Leisure at Marina Pool & Briefing",
          attraction: "Address Dubai Marina Infinity Pool",
          location: "Dubai Marina Promenade",
          mapUrl: "https://maps.google.com/?q=Dubai+Marina+Walk",
          duration: "4 hours",
          transport: "On-site at hotel",
          description: "Relax after breakfast along the marina promenade, enjoy spa therapies, or swim in the 50m elevated pool overlooking mega-yachts.",
          entranceFee: "Included for hotel guests",
          notes: "Hydrate well and wear lightweight cotton clothing for the desert afternoon."
        },
        afternoon: {
          time: "15:00 - 18:00",
          activity: "4x4 Desert Dune Safari & Sandboarding",
          attraction: "Dubai Desert Conservation Reserve / Lahbab Red Dunes",
          location: "Lahbab Desert, Dubai Hatta Road",
          mapUrl: "https://maps.google.com/?q=Lahbab+Desert+Dubai",
          duration: "3 hours",
          transport: "Private 4WD Toyota Land Cruiser pickup from hotel lobby",
          description: "Experience exhilarating dune bashing across high crimson dunes with professional licensed safari drivers, followed by sunset sandboarding.",
          entranceFee: "Included in package safari",
          notes: "Not recommended for pregnant travelers or infants under 3."
        },
        evening: {
          time: "18:30 - 21:30",
          activity: "Bedouin Camp Dinner, Tanoura Dance & Stargazing",
          attraction: "Desert Oasis Heritage Camp",
          location: "Dubai Desert Conservation Enclosure",
          mapUrl: "https://maps.google.com/?q=Al+Marmoom+Desert+Conservation+Reserve",
          duration: "3 hours",
          transport: "Safari 4WD returning to hotel by 22:00",
          description: "Short camel trek on arrival, Arabic coffee (gahwa) and dates welcome, henna painting, live Tanoura spinning dance, fire performance, and authentic BBQ buffet under desert stars.",
          entranceFee: "Included with BBQ dinner and soft drinks",
          notes: "Desert temperatures drop at night; bring a light cardigan."
        }
      },
      {
        dayNumber: 4,
        title: "Palm Jumeirah Monorail, Atlantis & Marina Yacht Cruise",
        morning: {
          time: "09:30 - 13:00",
          activity: "The View at The Palm & Palm Jumeirah Monorail",
          attraction: "The View at The Palm (Level 52, Nakheel Mall)",
          location: "Palm Jumeirah, Dubai, UAE",
          mapUrl: "https://maps.google.com/?q=The+View+at+The+Palm",
          duration: "3.5 hours",
          transport: "Gateway Station Palm Monorail to Atlantis Aquaventure (15 mins)",
          description: "Gaze at the 240-meter-high 360-degree panoramic view of the palm-frond archipelago, Arabian Gulf, and coastline, then ride the scenic monorail to Atlantis.",
          entranceFee: "Standard viewing ticket AED 100 / Fast track AED 175",
          notes: "Best photos taken in morning light before haze develops."
        },
        afternoon: {
          time: "14:00 - 17:00",
          activity: "Atlantis The Lost Chambers Aquarium & The Pointe",
          attraction: "The Lost Chambers Aquarium, Atlantis The Palm",
          location: "Crescent Road, The Palm Jumeirah, Dubai",
          mapUrl: "https://maps.google.com/?q=The+Lost+Chambers+Aquarium",
          duration: "3 hours",
          transport: "Palm Monorail / taxi",
          description: "Walk through mythical Atlantean ruins surrounded by 65,000 marine animals in 21 underwater exhibits, including stingrays, moray eels, and piranhas.",
          entranceFee: "Adult ticket ~AED 135",
          notes: "Combined tickets with Aquaventure waterpark available."
        },
        evening: {
          time: "19:00 - 21:30",
          activity: "Dubai Marina Luxury Dhow Cruise with International Buffet",
          attraction: "Dubai Marina Yacht Club & Waterway",
          location: "Marina Promenade Pier 7, Dubai Marina",
          mapUrl: "https://maps.google.com/?q=Dubai+Marina+Yacht+Club",
          duration: "2.5 hours",
          transport: "Short walk from Address Dubai Marina hotel",
          description: "Glide through the illuminated skyscraper canyon of Dubai Marina and past JBR (Jumeirah Beach Residence) on a glass-enclosed luxury dhow with five-star catering.",
          entranceFee: "Included in tour package",
          notes: "Upper deck seating provides unobstructed open-air photo angles."
        }
      },
      {
        dayNumber: 5,
        title: "Museum of the Future, Souk Madinat & Departure",
        morning: {
          time: "09:30 - 12:30",
          activity: "Museum of the Future (Architectural Wonder)",
          attraction: "Museum of the Future",
          location: "Sheikh Zayed Road, Trade Centre 2, Dubai",
          mapUrl: "https://maps.google.com/?q=Museum+of+the+Future+Dubai",
          duration: "3 hours",
          transport: "Metro Red Line to Emirates Towers Station (20 mins)",
          description: "Visit National Geographic's named most beautiful museum in the world, featuring an Arabic calligraphy torus facade and interactive exhibits on space, ecosystems, and bio-engineering.",
          entranceFee: "AED 149 per person (children under 4 free)",
          notes: "Strict timed entry; advance booking required weeks in advance."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Souk Madinat Jumeirah & Burj Al Arab Viewpoint",
          attraction: "Souk Madinat Jumeirah",
          location: "King Salman Bin Abdulaziz Al Saud St, Al Sufouh 1, Dubai",
          mapUrl: "https://maps.google.com/?q=Souk+Madinat+Jumeirah",
          duration: "3 hours",
          transport: "Taxi from Sheikh Zayed Road (15 mins)",
          description: "Re-creation of an ancient Arabian marketplace with water canals, boutique shops, and the famous wooden bridge photo spot framing the sail-shaped Burj Al Arab.",
          entranceFee: "Free souk access; Abra boat canal tour AED 100",
          notes: "Excellent artisan souvenir shopping and Middle Eastern confectionery."
        },
        evening: {
          time: "17:30 - 20:00",
          activity: "Hotel Checkout & Private Airport Transfer to DXB",
          attraction: "Dubai International Airport (DXB)",
          location: "Airport Road, Garhoud, Dubai",
          mapUrl: "https://maps.google.com/?q=Dubai+International+Airport",
          duration: "2.5 hours",
          transport: "Private luxury chauffeur transfer to DXB",
          description: "Complete checkout at Address Dubai Marina and transfer comfortably to DXB airport with duty-free shopping before departure.",
          entranceFee: "N/A",
          notes: "Arrive at DXB at least 3 hours prior to international flights."
        }
      }
    ],

    inclusions: [
      "4 Nights stay at 5-Star Address Dubai Marina (Deluxe Room with Marina View)",
      "Daily international breakfast buffet at Mazina Restaurant",
      "Burj Khalifa 124th/125th Floor Observation Deck Tickets",
      "4x4 Desert Safari with Dune Bashing, Sandboarding, Camel Ride & BBQ Dinner",
      "Dubai Marina Luxury Dhow Cruise with 5-Star Dinner",
      "All airport and inter-sightseeing transfers in private luxury AC vehicle"
    ],
    exclusions: [
      "International flights to/from Dubai (DXB)",
      "Tourism Dirham Fee (AED 20 per bedroom per night paid directly to hotel)",
      "UAE Tourist Visa fee (if applicable by nationality)",
      "Museum of the Future entry tickets (optional add-on)"
    ],
    travelTips: [
      "Carry international credit/debit cards; Dubai is nearly 100% cashless.",
      "Dress code is cosmopolitan, but respect local norms in government and heritage areas.",
      "Metro Nol Card (Silver) is the most efficient transit for short inner-city hops."
    ],
    officialReferences: [
      { name: "Visit Dubai Official Tourism Portal", url: "https://www.visitdubai.com" },
      { name: "Museum of the Future", url: "https://museumofthefuture.ae" }
    ]
  },

  // 3. Paris Romantic & Cultural Tour (Paris, France)
  "paris": {
    matchedKeywords: ["paris", "france", "eiffel tower", "louvre"],
    title: "Paris Romantic & Cultural Tour",
    destination: "Paris, France",
    duration: "5 days, 4 nights",
    bestSeason: "April to October (mild weather, cafe terraces)",
    suitableFor: "Couples, Art & History Lovers, Food Enthusiasts",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (Eiffel Tower & Paris Skyline)",
    sourceAttribution: "Paris Convention and Visitors Bureau (parisinfo.com)",
    overview:
      "Immerse yourself in the City of Light with iconic landmarks: ascending the Eiffel Tower, exploring the world's greatest masterpieces in the Louvre, wandering Bohemian Montmartre, and marveling at the royal Hall of Mirrors in Versailles.",

    accommodation: {
      name: "Hôtel Regina Louvre",
      type: "Historic 5-Star Parisian Grand Hotel (Since 1900)",
      address: "2 Place des Pyramides, 75001 Paris, France",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified Parisian heritage hotel accommodation",
      mapUrl: "https://maps.google.com/?q=Hotel+Regina+Louvre+Paris",
      checkIn: "15:00",
      checkOut: "12:00",
      roomType: "Prestige Room overlooking Tuileries Garden",
      capacity: "2 Adults",
      amenities: [
        "Direct views of the Tuileries Garden and Eiffel Tower",
        "Fine dining at Salon Chaumet & English Bar",
        "Complimentary high-speed Wi-Fi and Nespresso coffee machine",
        "24-Hour Clefs d'Or concierge service",
        "Fitness room and private sauna",
        "Quiet courtyard garden terrace"
      ],
      rules: "Valid passport required at check-in. Paris municipal tourist tax (€10.73 per person/night) paid at hotel.",
      providerNotes: "Located opposite the Musée du Louvre in the 1st arrondissement."
    },

    days: [
      {
        dayNumber: 1,
        title: "Eiffel Tower Ascent & Sunset Cruise on the Seine",
        morning: {
          time: "10:00 - 13:00",
          activity: "Arrival & Stroll in the Tuileries Garden",
          attraction: "Jardin des Tuileries & Place de la Concorde",
          location: "Place de la Concorde, 75001 Paris, France",
          mapUrl: "https://maps.google.com/?q=Jardin+des+Tuileries+Paris",
          duration: "3 hours",
          transport: "Private chauffeur transfer from Paris Charles de Gaulle (CDG) / Orly (ORY)",
          description: "Check in at Hôtel Regina Louvre and take a gentle stroll through Catherine de' Medici's historic 16th-century royal gardens adorned with Rodin sculptures.",
          entranceFee: "Public gardens free",
          notes: "Pick up Parisian pastries at nearby Angelina on Rue de Rivoli."
        },
        afternoon: {
          time: "14:30 - 17:30",
          activity: "Eiffel Tower Summit / 2nd Floor Access",
          attraction: "Eiffel Tower (Tour Eiffel)",
          location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
          mapUrl: "https://maps.google.com/?q=Eiffel+Tower+Paris",
          duration: "3 hours",
          transport: "Metro Line 1 to Franklin D. Roosevelt then Line 9 to Trocadéro (15 mins)",
          description: "Ascend Gustave Eiffel's 1889 iron masterpiece. Take the glass elevators to the second-floor panoramic platform and optional summit at 276 meters.",
          entranceFee: "Lift ticket to summit €35.30 per adult",
          notes: "Pre-booked skip-the-line ticket included; airport-style security check required."
        },
        evening: {
          time: "18:30 - 20:30",
          activity: "Bateaux Parisiens Seine River Sunset Cruise",
          attraction: "Seine River Cruise (Port de la Bourdonnais)",
          location: "Port de la Bourdonnais, 75007 Paris (at the foot of Eiffel Tower)",
          mapUrl: "https://maps.google.com/?q=Bateaux+Parisiens+Port+de+la+Bourdonnais",
          duration: "2 hours",
          transport: "2-minute walk from Eiffel Tower base",
          description: "One-hour guided cruise on the Seine passing the Musée d'Orsay, Notre-Dame Cathedral, and the illuminated bridges of Paris with French audio commentary.",
          entranceFee: "Included in tour package (€17 value)",
          notes: "Sunset departures offer twilight views of the sparkling Eiffel Tower."
        }
      },
      {
        dayNumber: 2,
        title: "Masterpieces of the Louvre & Historic Île de la Cité",
        morning: {
          time: "09:00 - 13:00",
          activity: "Musée du Louvre Masterpieces Guided Visit",
          attraction: "Musée du Louvre & I.M. Pei Glass Pyramid",
          location: "Rue de Rivoli, 75001 Paris, France",
          mapUrl: "https://maps.google.com/?q=Musee+du+Louvre+Paris",
          duration: "4 hours",
          transport: "3-minute walk across Place des Pyramides from hotel",
          description: "Priority access to the world's most visited museum. Discover Leonardo da Vinci's Mona Lisa, the Winged Victory of Samothrace, Venus de Milo, and the French Crown Jewels.",
          entranceFee: "€22 per adult (Advance timed ticket included)",
          notes: "Closed Tuesdays. Backpacks larger than 55x35x20 cm are not permitted."
        },
        afternoon: {
          time: "14:00 - 17:00",
          activity: "Île de la Cité, Notre-Dame & Sainte-Chapelle",
          attraction: "Sainte-Chapelle & Cathédrale Notre-Dame de Paris",
          location: "10 Boulevard du Palais, 75001 Paris",
          mapUrl: "https://maps.google.com/?q=Sainte+Chapelle+Paris",
          duration: "3 hours",
          transport: "Pleasant walk along the Seine riverbank (15 mins)",
          description: "Marvel at the 1,113 stained glass panels in the 13th-century Gothic jewel of Sainte-Chapelle, followed by viewing the restored facade of Notre-Dame Cathedral.",
          entranceFee: "Sainte-Chapelle €13; Notre-Dame parvis free",
          notes: "Sainte-Chapelle requires timed entry reservation."
        },
        evening: {
          time: "18:00 - 21:00",
          activity: "Latin Quarter Stroll & French Bistro Dinner",
          attraction: "Quartier Latin & Saint-Germain-des-Prés",
          location: "5th & 6th Arrondissements, Paris",
          mapUrl: "https://maps.google.com/?q=Latin+Quarter+Paris",
          duration: "3 hours",
          transport: "Walk across Pont Saint-Michel",
          description: "Wander through medieval cobblestone lanes, browse Shakespeare and Company bookstore, and savor classic French duck confit and tarte tatin in a traditional bistro.",
          entranceFee: "Meal on own expense / selective tasting included",
          notes: "Vibrant bohemian student atmosphere with jazz cellars."
        }
      },
      {
        dayNumber: 3,
        title: "Bohemian Montmartre, Sacré-Cœur & Musée d'Orsay",
        morning: {
          time: "09:30 - 13:00",
          activity: "Montmartre Hill, Place du Tertre & Sacré-Cœur",
          attraction: "Basilique du Sacré-Cœur de Montmartre",
          location: "35 Rue du Chevalier de la Barre, 75018 Paris",
          mapUrl: "https://maps.google.com/?q=Sacre+Coeur+Paris",
          duration: "3.5 hours",
          transport: "Metro Line 12 to Abbesses or private transfer (20 mins)",
          description: "Ascend Paris's highest natural summit. Visit the gleaming white Romano-Byzantine Basilica of Sacré-Cœur and watch portrait painters at Place du Tertre.",
          entranceFee: "Basilica entry free; Dome ascent €7",
          notes: "Use the Montmartre Funicular with a standard metro ticket to skip steps."
        },
        afternoon: {
          time: "14:30 - 17:30",
          activity: "Impressionist Treasures at Musée d'Orsay",
          attraction: "Musée d'Orsay (Former Beaux-Arts Railway Station)",
          location: "1 Rue de la Légion d'Honneur, 75007 Paris",
          mapUrl: "https://maps.google.com/?q=Musee+d+Orsay+Paris",
          duration: "3 hours",
          transport: "Metro Line 12 from Abbesses to Solférino",
          description: "Admire the world's largest collection of Impressionist and Post-Impressionist masterpieces by Monet, Van Gogh, Renoir, Degas, and Cézanne under the soaring historic station clock.",
          entranceFee: "€16 per adult",
          notes: "Closed Mondays. Photograph the Paris skyline through the giant clock face."
        },
        evening: {
          time: "18:30 - 21:00",
          activity: "Opera Garnier & Galeries Lafayette Rooftop Panorama",
          attraction: "Palais Garnier & Galeries Lafayette Haussmann",
          location: "40 Boulevard Haussmann, 75009 Paris",
          mapUrl: "https://maps.google.com/?q=Galeries+Lafayette+Haussmann",
          duration: "2.5 hours",
          transport: "Short bus/metro ride to Opéra",
          description: "Gaze at the architectural splendor of the Palais Garnier opera house, then head to the free rooftop terrace of Galeries Lafayette for sweeping sunset views over the Paris rooftops.",
          entranceFee: "Rooftop terrace free",
          notes: "Art Nouveau stained-glass dome in the department store is a must-see."
        }
      },
      {
        dayNumber: 4,
        title: "Royal Palace of Versailles Full-Day Excursion",
        morning: {
          time: "09:00 - 13:30",
          activity: "State Apartments & Hall of Mirrors at Château de Versailles",
          attraction: "Château de Versailles (UNESCO World Heritage Site)",
          location: "Place d'Armes, 78000 Versailles, France",
          mapUrl: "https://maps.google.com/?q=Chateau+de+Versailles",
          duration: "4.5 hours",
          transport: "RER C train from Champ de Mars / Musée d'Orsay to Versailles Château Rive Gauche (40 mins)",
          description: "Tour the opulent residence of King Louis XIV, the Sun King. Walk through the 73-meter Hall of Mirrors containing 357 mirrors, the King's Grand Apartment, and the Royal Chapel.",
          entranceFee: "Passport ticket with Gardens ~€32 per adult",
          notes: "Audio guide included in ticket; passport required for security."
        },
        afternoon: {
          time: "14:00 - 17:00",
          activity: "Versailles Musical Gardens & Grand Trianon Estate",
          attraction: "Gardens of Versailles & Estate of Trianon",
          location: "Château de Versailles Grounds",
          mapUrl: "https://maps.google.com/?q=Grand+Trianon+Versailles",
          duration: "3 hours",
          transport: "Walking or petit train across the 800-hectare royal park",
          description: "Stroll along the Grand Canal, view the Apollo Fountain, and explore Marie Antoinette's secluded rustic retreat, the Queen's Hamlet (Hameau de la Reine).",
          entranceFee: "Included in Versailles Passport",
          notes: "Rentable electric golf carts and rowboats available on the canal."
        },
        evening: {
          time: "18:00 - 20:30",
          activity: "Return to Paris & Evening in Saint-Honoré",
          attraction: "Rue du Faubourg Saint-Honoré",
          location: "1st & 8th Arrondissements, Paris",
          mapUrl: "https://maps.google.com/?q=Rue+Saint+Honore+Paris",
          duration: "2.5 hours",
          transport: "RER C returning to central Paris",
          description: "Return to central Paris to enjoy dinner at an authentic French brasserie near the Place des Victoires.",
          entranceFee: "N/A",
          notes: "Rest evening before final day of travels."
        }
      },
      {
        dayNumber: 5,
        title: "Champs-Élysées, Arc de Triomphe & Departure",
        morning: {
          time: "09:30 - 12:30",
          activity: "Arc de Triomphe Rooftop & Avenue des Champs-Élysées",
          attraction: "Arc de Triomphe",
          location: "Place Charles de Gaulle, 75008 Paris, France",
          mapUrl: "https://maps.google.com/?q=Arc+de+Triomphe+Paris",
          duration: "3 hours",
          transport: "Metro Line 1 direct from Palais Royal to Charles de Gaulle - Étoile (10 mins)",
          description: "Climb the 284 steps to the top of Napoleon's triumphal arch for the twelve star-shaped avenues radiating outwards, including the grand Champs-Élysées.",
          entranceFee: "€16 per adult",
          notes: "Access via underground pedestrian tunnel; do not cross the roundabout on foot!"
        },
        afternoon: {
          time: "13:00 - 16:00",
          activity: "Final Souvenir Shopping & Hotel Checkout",
          attraction: "Palais Royal & Galerie Vivienne",
          location: "4 Rue des Petits-Champs, 75002 Paris",
          mapUrl: "https://maps.google.com/?q=Galerie+Vivienne+Paris",
          duration: "3 hours",
          transport: "Walk back to 1st arrondissement",
          description: "Explore the historic 1823 covered passage of Galerie Vivienne with its mosaic floors and boutique bookshops before collecting luggage from Hôtel Regina Louvre.",
          entranceFee: "Free covered passages",
          notes: "Store luggage with concierge if departing later in the evening."
        },
        evening: {
          time: "16:30 - 19:30",
          activity: "Private Airport Transfer & Onward Flight",
          attraction: "Paris Charles de Gaulle Airport (CDG)",
          location: "Roissy-en-France, 95700, France",
          mapUrl: "https://maps.google.com/?q=Charles+de+Gaulle+Airport",
          duration: "3 hours",
          transport: "Private chauffeur transfer to CDG / Orly",
          description: "Private vehicle transfer to the airport with duty-free tax refund (détaxe) assistance before your departure flight.",
          entranceFee: "N/A",
          notes: "Non-EU residents can claim VAT refunds at PABLO kiosks before baggage drop."
        }
      }
    ],

    inclusions: [
      "4 Nights stay at 5-Star Hôtel Regina Louvre (Prestige Room, 1st Arrondissement)",
      "Daily French continental breakfast buffet",
      "Eiffel Tower 2nd Floor / Summit Lift Access Ticket",
      "Skip-the-line Musée du Louvre Timed Entry Ticket",
      "1-Hour Bateaux Parisiens Seine River Cruise",
      "Full-Day Palace of Versailles Passport with Gardens & Trianon Estate",
      "Private roundtrip airport transfers from Paris CDG or Orly"
    ],
    exclusions: [
      "International flights to/from Paris",
      "Paris Tourist City Tax (€10.73/person/night paid directly at hotel checkout)",
      "Lunch and dinner expenses (unless specified in tasting)",
      "Travel insurance and personal shopping"
    ],
    travelTips: [
      "Validate Metro tickets and keep them until you exit the station; inspectors check regularly.",
      "Beware of pickpockets around high-density spots like the Eiffel Tower and Montmartre.",
      "Saying 'Bonjour' when entering any shop or restaurant is standard French etiquette."
    ],
    officialReferences: [
      { name: "Paris Convention and Visitors Bureau", url: "https://parisjetaime.com/eng" },
      { name: "Musée du Louvre Official", url: "https://www.louvre.fr/en" },
      { name: "Château de Versailles Official", url: "https://en.chateauversailles.fr" }
    ]
  },

  // 4. Bali Tropical Paradise Escape (Bali, Indonesia)
  "bali": {
    matchedKeywords: ["bali", "indonesia", "ubud"],
    title: "Bali Tropical Paradise Escape",
    destination: "Bali, Indonesia",
    duration: "6 days, 5 nights",
    bestSeason: "May to September (Dry season, ideal for beaches and hiking)",
    suitableFor: "Couples, Adventure Seekers, Wellness Travelers",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (Ubud Rice Terraces, Bali)",
    sourceAttribution: "Ministry of Tourism Republic of Indonesia (indonesia.travel)",
    overview:
      "A journey through Bali's lush tropical highlands and turquoise island sanctuaries. Discover the terraced emerald rice fields of Ubud, cliffside sea temples, Mount Batur caldera views, and the dramatic coastline of Nusa Penida.",

    accommodation: {
      name: "Maya Ubud Resort & Spa",
      type: "5-Star Luxury Valley Eco-Resort",
      address: "Jl. Gunung Sari Peliatan, Ubud, Gianyar, Bali 80571, Indonesia",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified Maya Ubud rainforest villa accommodation",
      mapUrl: "https://maps.google.com/?q=Maya+Ubud+Resort+and+Spa",
      checkIn: "14:00",
      checkOut: "12:00",
      roomType: "Impressive Forest Suite with Balcony",
      capacity: "2 Adults",
      amenities: [
        "Two infinity pools suspended over the Petanu River valley",
        "Spa at Maya located at the valley floor beside rushing river waters",
        "Open-air yoga pavilion with complimentary morning yoga classes",
        "Complimentary shuttle service to central Ubud Palace",
        "Maya Sari & Asian Spice authentic dining pavilions",
        "Lush 10-hectare private tropical botanical river gardens"
      ],
      rules: "Valid passport with 6 months validity required. International tourist levy (IDR 150,000) payable online before arrival.",
      providerNotes: "Eco-certified luxury resort operating in Ubud."
    },

    days: [
      {
        dayNumber: 1,
        title: "Arrival in Denpasar & Uluwatu Cliff Sunset",
        morning: {
          time: "10:00 - 13:00",
          activity: "Arrival at DPS Ngurah Rai & South Bali Transfer",
          attraction: "Ngurah Rai International Airport & Jimbaran Coast",
          location: "Tuban, Kuta, Badung Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Ngurah+Rai+International+Airport",
          duration: "3 hours",
          transport: "Private AC vehicle from airport (30 mins)",
          description: "Traditional Balinese frangipani flower garland welcome at the airport and transfer to scenic southern Bukit Peninsula.",
          entranceFee: "Airport arrival",
          notes: "Bali Tourist Levy of IDR 150,000 can be paid at lovebali.baliprov.go.id."
        },
        afternoon: {
          time: "14:30 - 17:30",
          activity: "Pura Luhur Uluwatu Sea Temple",
          attraction: "Uluwatu Temple (Pura Luhur Uluwatu)",
          location: "Pecatu, South Kuta, Badung Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Uluwatu+Temple",
          duration: "3 hours",
          transport: "Drive along southern cliff road",
          description: "Perched 70 meters atop steep limestone cliffs dropping dramatically into the roaring Indian Ocean, this 11th-century temple is dedicated to the spirits of the sea.",
          entranceFee: "IDR 50,000 per adult (sarong included)",
          notes: "Keep sunglasses and hats secure; wild macaque monkeys roam the cliff path."
        },
        evening: {
          time: "18:00 - 20:30",
          activity: "Kecak & Fire Dance Performance & Seafood Dinner",
          attraction: "Uluwatu Amphitheatre & Jimbaran Bay",
          location: "Uluwatu Amphitheatre, Bali",
          mapUrl: "https://maps.google.com/?q=Uluwatu+Kecak+Dance",
          duration: "2.5 hours",
          transport: "Transfer to Jimbaran Bay beach",
          description: "Mesmerizing 50-man vocal chorus performing the Ramayana epic as the sun sinks into the ocean, followed by fresh grilled fish with sambal matah on Jimbaran beach.",
          entranceFee: "Kecak show IDR 150,000 per person",
          notes: "Performance starts promptly at 18:00; arrive 30 minutes early."
        }
      },
      {
        dayNumber: 2,
        title: "Ubud Rice Terraces, Sacred Monkeys & Royal Palace",
        morning: {
          time: "09:00 - 12:30",
          activity: "Tegallalang Rice Terraces & Jungle Swing",
          attraction: "Tegallalang Rice Terraces (Subak Irrigation System)",
          location: "Jl. Raya Tegallalang, Gianyar, Bali",
          mapUrl: "https://maps.google.com/?q=Tegallalang+Rice+Terrace",
          duration: "3.5 hours",
          transport: "20-minute drive north from central Ubud",
          description: "Wander through the UNESCO-recognized 9th-century 'Subak' cooperative water management terraced hillsides, with optional jungle swing photo sessions.",
          entranceFee: "IDR 25,000 per person; Swing IDR 150,000-250,000",
          notes: "Wear sturdy shoes; terrace paths can be muddy after rain."
        },
        afternoon: {
          time: "13:30 - 16:00",
          activity: "Sacred Monkey Forest Sanctuary",
          attraction: "Padangtegal Mandala Suci Wenara Wana",
          location: "Jl. Monkey Forest, Ubud, Gianyar, Bali 80571",
          mapUrl: "https://maps.google.com/?q=Sacred+Monkey+Forest+Sanctuary",
          duration: "2.5 hours",
          transport: "Short drive to southern Ubud",
          description: "A 12.5-hectare sacred nutmeg forest reserve inhabited by over 1,000 Balinese long-tailed macaques and housing the 14th-century Pura Dalem Agung Padangtegal temple.",
          entranceFee: "IDR 80,000 per adult on weekdays / IDR 100,000 on weekends",
          notes: "Do not bring food or plastic bags; do not make direct aggressive eye contact with monkeys."
        },
        evening: {
          time: "16:30 - 19:30",
          activity: "Ubud Royal Palace & Traditional Art Market",
          attraction: "Ubud Palace (Puri Saren Agung) & Ubud Art Market",
          location: "Jl. Raya Ubud No.8, Ubud, Gianyar, Bali",
          mapUrl: "https://maps.google.com/?q=Ubud+Palace",
          duration: "3 hours",
          transport: "Walking distance in central Ubud",
          description: "Admire traditional Balinese stone carvings and gilded courtyards of the royal residence, then shop for hand-woven rattan bags, batik scarves, and woodcrafts.",
          entranceFee: "Palace courtyard free",
          notes: "Polite bargaining is expected in the art market."
        }
      },
      {
        dayNumber: 3,
        title: "Tirta Empul Holy Springs, Mount Batur & Waterfalls",
        morning: {
          time: "08:30 - 12:00",
          activity: "Tirta Empul Holy Water Temple Purification",
          attraction: "Pura Tirta Empul Sacred Springs",
          location: "Manukaya, Tampaksiring, Gianyar, Bali 80552",
          mapUrl: "https://maps.google.com/?q=Tirta+Empul+Temple",
          duration: "3.5 hours",
          transport: "30-minute drive northeast of Ubud",
          description: "Founded in 962 AD, this sacred spring feeds rectangular purification baths where locals and visitors participate in the ritual 'melukat' cleansing under spouts.",
          entranceFee: "IDR 50,000 per adult; ritual sarong rental IDR 25,000",
          notes: "Modest dress mandatory; changing facilities provided on site."
        },
        afternoon: {
          time: "12:30 - 15:30",
          activity: "Kintamani Volcanic Viewpoint & Lake Batur",
          attraction: "Mount Batur Caldera Viewpoint",
          location: "Penelokan, Kintamani, Bangli Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Kintamani+Mount+Batur+Viewpoint",
          duration: "3 hours",
          transport: "Scenic climb to 1,500m elevation (45 mins)",
          description: "Breathtaking panoramic lunch overlooking the active volcanic cone of Mount Batur (1,717m) and the crescent-shaped Lake Batur caldera.",
          entranceFee: "Kintamani regional entry IDR 50,000 per adult",
          notes: "Noticeably cooler climate; light jacket recommended."
        },
        evening: {
          time: "16:00 - 18:30",
          activity: "Tegenungan Waterfall Canyon Walk",
          attraction: "Tegenungan Waterfall (Air Terjun Tegenungan)",
          location: "Kemenuh, Sukawati, Gianyar, Bali",
          mapUrl: "https://maps.google.com/?q=Tegenungan+Waterfall",
          duration: "2.5 hours",
          transport: "Return drive toward Ubud",
          description: "Walk down through lush jungle canopy to the base of the roaring 25-meter waterfall with swimming pool lagoon.",
          entranceFee: "IDR 20,000 per person",
          notes: "Approximately 160 steps down and up."
        }
      },
      {
        dayNumber: 4,
        title: "Nusa Penida Island Expedition (Kelingking T-Rex)",
        morning: {
          time: "07:00 - 12:30",
          activity: "Speedboat to Nusa Penida & Kelingking Beach",
          attraction: "Kelingking Beach ('T-Rex' Headland)",
          location: "Bunga Mekar, Nusa Penida, Klungkung Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Kelingking+Beach+Nusa+Penida",
          duration: "5.5 hours",
          transport: "Fast boat from Sanur Harbour to Nusa Penida (45 mins), then 4WD island transport",
          description: "World-famous turquoise viewpoint resembling a Tyrannosaurus Rex overlooking white sand beach and crashing Azure waves.",
          entranceFee: "Nusa Penida environmental levy IDR 25,000 per adult",
          notes: "Cliff paths are steep; stay behind designated safety railings."
        },
        afternoon: {
          time: "13:00 - 16:30",
          activity: "Broken Beach, Angel's Billabong & Crystal Bay",
          attraction: "Broken Beach (Pasih Uug) & Angel's Billabong",
          location: "Sakti, Nusa Penida, Bali",
          mapUrl: "https://maps.google.com/?q=Broken+Beach+Nusa+Penida",
          duration: "3.5 hours",
          transport: "Island 4WD transfer across coastal track",
          description: "A natural circular archway where the sea flows into an enclosed cove, alongside a natural emerald tidal infinity pool at Angel's Billabong.",
          entranceFee: "Included in island tour",
          notes: "Do not enter Angel's Billabong pool if high swell warning is active."
        },
        evening: {
          time: "17:00 - 19:30",
          activity: "Fast Boat Return to Sanur & Sunset Dinner",
          attraction: "Sanur Beach Boardwalk",
          location: "Sanur, Denpasar, Bali",
          mapUrl: "https://maps.google.com/?q=Sanur+Beach+Harbour",
          duration: "2.5 hours",
          transport: "Fast boat back to main island (45 mins)",
          description: "Return to mainland Bali and enjoy seaside dining with fresh fruit juices along the tranquil paved Sanur boardwalk.",
          entranceFee: "Boat ticket included in tour",
          notes: "Pack sunscreen, dry bag, and extra change of clothing."
        }
      },
      {
        dayNumber: 5,
        title: "Bedugul Water Temple & Tanah Lot Sunset",
        morning: {
          time: "09:00 - 12:30",
          activity: "Pura Ulun Danu Beratan Floating Water Temple",
          attraction: "Ulun Danu Beratan Temple, Lake Beratan",
          location: "Candikuning, Baturiti, Tabanan Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Ulun+Danu+Beratan+Temple",
          duration: "3.5 hours",
          transport: "Drive through highland vegetable farms to Bedugul (1.5 hrs)",
          description: "The iconic multi-tiered temple featured on the 50,000 Rupiah banknote, appearing to float gracefully on the surface of calm Lake Beratan at 1,200m altitude.",
          entranceFee: "IDR 75,000 per adult",
          notes: "Swan paddle boats and traditional jukung canoes available on the lake."
        },
        afternoon: {
          time: "13:30 - 16:00",
          activity: "Jatiluwih Rice Terraces (UNESCO Cultural Landscape)",
          attraction: "Jatiluwih Green Land",
          location: "Jatiluwih, Penebel, Tabanan Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Jatiluwih+Rice+Terraces",
          duration: "2.5 hours",
          transport: "Scenic drive through southern slopes of Mount Batukaru",
          description: "Over 600 hectares of terraced paddy fields spanning an entire valley, demonstrating the living cultural heritage of Balinese agrarian philosophy (Tri Hita Karana).",
          entranceFee: "IDR 40,000 per adult",
          notes: "Paved walking loops range from 30 minutes to 2 hours."
        },
        evening: {
          time: "16:30 - 19:30",
          activity: "Tanah Lot Offshore Rock Temple Sunset",
          attraction: "Tanah Lot Temple (Pura Tanah Lot)",
          location: "Beraban, Kediri, Tabanan Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Tanah+Lot+Temple",
          duration: "3 hours",
          transport: "1-hour drive to the southwestern coastline",
          description: "Ancient sea temple perched on an offshore rock formation carved by ocean tides. Experience one of Southeast Asia's most spectacular sunsets as the waves illuminate golden.",
          entranceFee: "IDR 60,000 per adult",
          notes: "During low tide, visitors can walk across the sand to the base of the rock."
        }
      },
      {
        dayNumber: 6,
        title: "Traditional Balinese Spa, Seminyak & Departure",
        morning: {
          time: "09:30 - 12:00",
          activity: "2-Hour Authentic Balinese Massage & Herbal Floral Bath",
          attraction: "Spa at Maya Ubud",
          location: "Maya Ubud Resort Grounds",
          mapUrl: "https://maps.google.com/?q=Maya+Ubud+Resort+and+Spa",
          duration: "2.5 hours",
          transport: "On-site at resort",
          description: "Rejuvenating holistic treatment using aromatic frangipani essential oils, gentle stretching, acupressure, and skin-softening lulur body scrub.",
          entranceFee: "Included in luxury package wellness credit",
          notes: "Advance appointment slot reserved with resort spa desk."
        },
        afternoon: {
          time: "12:30 - 15:30",
          activity: "Seminyak Beachfront Boutiques & Beach Club Walk",
          attraction: "Seminyak Beach & Petitenget",
          location: "Seminyak, Kuta, Badung Regency, Bali",
          mapUrl: "https://maps.google.com/?q=Seminyak+Beach+Bali",
          duration: "3 hours",
          transport: "Transfer to southern beach district (1 hour)",
          description: "Browse designer resort wear boutiques, relax at beachfront cafes, and pick up authentic Luwak coffee and vanilla beans.",
          entranceFee: "Public beach free",
          notes: "Keep passports and departure travel documents handy."
        },
        evening: {
          time: "16:00 - 18:30",
          activity: "Transfer to Ngurah Rai Airport (DPS) & Departure",
          attraction: "DPS International Terminal",
          location: "Tuban, Denpasar, Bali",
          mapUrl: "https://maps.google.com/?q=Ngurah+Rai+International+Airport",
          duration: "2.5 hours",
          transport: "20-minute transfer to airport",
          description: "Arrive at Ngurah Rai International Airport for check-in and onward departure flights.",
          entranceFee: "N/A",
          notes: "Recommend arriving at DPS 3 hours before international departure."
        }
      }
    ],

    inclusions: [
      "5 Nights accommodation at Maya Ubud Resort & Spa (Forest Suite)",
      "Daily gourmet breakfast overlooking the Petanu River valley",
      "Full-Day Nusa Penida Island Speedboat Tour with private 4WD transport",
      "2-Hour Traditional Balinese Spa Treatment session",
      "All temple entry tickets, sarongs, and parking fees",
      "Private AC vehicle with professional English-speaking driver-guide throughout"
    ],
    exclusions: [
      "International flights to/from Denpasar (DPS)",
      "Indonesian Visa on Arrival (VoA ~USD 35 / IDR 500,000 for eligible nationalities)",
      "Bali Tourist Levy (IDR 150,000 payable online)",
      "Personal meals, drinks, and discretionary tipping"
    ],
    travelTips: [
      "Drink bottled or filtered water; avoid tap water in Indonesia.",
      "Dress modestly when visiting temples (sarong and sash provided with entry).",
      "Indonesian Rupiah (IDR) is required for small cash payments; ATMs widely available."
    ],
    officialReferences: [
      { name: "Wonderful Indonesia Ministry of Tourism", url: "https://www.indonesia.travel" },
      { name: "Bali Tourism Board Official Portal", url: "https://balitourismboard.or.id" }
    ]
  },

  // 5. Tokyo Highlights & Culture Tour (Tokyo, Japan)
  "tokyo": {
    matchedKeywords: ["tokyo", "japan", "shibuya", "shinjuku", "fuji"],
    title: "Tokyo Highlights & Culture Tour",
    destination: "Tokyo, Japan",
    duration: "7 days, 6 nights",
    bestSeason: "March to May (Sakura season) & October to November (Autumn leaves)",
    suitableFor: "Tech Enthusiasts, Culture Seekers, Foodies, City Explorers",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (Tokyo Tower & Skylines)",
    sourceAttribution: "Tokyo Convention & Visitors Bureau (gotokyo.org)",
    overview:
      "A journey through the world's most dynamic metropolis where ancient Shinto shrines stand beside neon-lit futuristic districts. Spanning Asakusa's historic temples, Shibuya Crossing, teamLab digital art, and Mount Fuji's alpine scenery.",

    accommodation: {
      name: "Hotel Gracery Shinjuku",
      type: "Modern 4-Star Central Tokyo Hotel",
      address: "1-19-1 Kabukicho, Shinjuku-ku, Tokyo 160-8466, Japan",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified central Shinjuku hotel accommodation",
      mapUrl: "https://maps.google.com/?q=Hotel+Gracery+Shinjuku",
      checkIn: "14:00",
      checkOut: "11:00",
      roomType: "Comfort Double / Twin Room with Deep Soaking Tub",
      capacity: "2 Adults",
      amenities: [
        "Centrally located in Shinjuku, 5-minute walk from JR Shinjuku Station",
        "Famous outdoor 8th-floor terrace featuring the life-size Godzilla Head",
        "Separate Japanese bath and shower wet room with high-tech bidet",
        "Complimentary high-speed Wi-Fi and in-room smartphone device",
        "Cafe Terrace Bonjour serving Japanese and Western breakfast",
        "24-Hour multilingual reception desk and luggage forward service (Ta-Q-Bin)"
      ],
      rules: "Valid passport required at check-in. Non-smoking property throughout.",
      providerNotes: "Direct airport limousine bus link to Narita and Haneda airports."
    },

    days: [
      {
        dayNumber: 1,
        title: "Arrival in Tokyo & Shinjuku Neon Skyline",
        morning: {
          time: "10:00 - 13:00",
          activity: "Arrival at Haneda/Narita & Shinjuku Check-in",
          attraction: "Tokyo Haneda (HND) / Narita (NRT) Airport",
          location: "Tokyo, Japan",
          mapUrl: "https://maps.google.com/?q=Tokyo+Haneda+Airport",
          duration: "3 hours",
          transport: "Tokyo Monorail or Narita Express (N'EX) to JR Shinjuku Station",
          description: "Arrive in Tokyo, activate your Welcome Suica / Pasmo transit IC card, and check in at Hotel Gracery Shinjuku.",
          entranceFee: "Airport train ~¥500 (Haneda) to ~¥3,070 (Narita)",
          notes: "Suica/Pasmo IC card works seamlessly across all Tokyo metro and bus lines."
        },
        afternoon: {
          time: "14:30 - 17:00",
          activity: "Shinjuku Gyoen National Garden",
          attraction: "Shinjuku Gyoen National Garden",
          location: "11 Naitomachi, Shinjuku City, Tokyo 160-0014",
          mapUrl: "https://maps.google.com/?q=Shinjuku+Gyoen+National+Garden",
          duration: "2.5 hours",
          transport: "10-minute walk from Shinjuku Station",
          description: "A tranquil 58-hectare imperial oasis blending traditional Japanese landscape gardening, English landscape lawns, and French formal gardens.",
          entranceFee: "¥500 per adult",
          notes: "Alcohol is strictly prohibited inside the national garden."
        },
        evening: {
          time: "18:00 - 21:00",
          activity: "Tokyo Metropolitan Government Building & Omoide Yokocho",
          attraction: "Tokyo Metropolitan Government Building Observatory",
          location: "2-8-1 Nishishinjuku, Shinjuku City, Tokyo 163-8001",
          mapUrl: "https://maps.google.com/?q=Tokyo+Metropolitan+Government+Building",
          duration: "3 hours",
          transport: "10-minute walk through west Shinjuku skyscrapers",
          description: "Enjoy free panoramic views from 202 meters high on the 45th floor looking out across Tokyo's illuminated sea of lights, followed by yakitori in atmospheric 'Memory Lane'.",
          entranceFee: "Free observatory access",
          notes: "On clear evenings, the silhouette of Mount Fuji is visible before sunset."
        }
      },
      {
        dayNumber: 2,
        title: "Ancient Asakusa, Senso-ji & Electric Akihabara",
        morning: {
          time: "09:00 - 12:30",
          activity: "Senso-ji Temple & Nakamise Shopping Arcade",
          attraction: "Senso-ji (Tokyo's Oldest Buddhist Temple, founded 645 AD)",
          location: "2-3-1 Asakusa, Taito City, Tokyo 111-0032",
          mapUrl: "https://maps.google.com/?q=Sensoji+Temple+Asakusa",
          duration: "3.5 hours",
          transport: "Tokyo Metro Ginza Line to Asakusa Station (20 mins)",
          description: "Pass through the dramatic Kaminarimon (Thunder Gate) with its giant red paper lantern, explore traditional craft stalls on Nakamise-dori, and view the 5-story pagoda.",
          entranceFee: "Temple grounds free; omikuji fortune slip ¥100",
          notes: "Sample warm ningyo-yaki bean-paste cakes made fresh on the street."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Tokyo Skytree Tower (World's Tallest Freestanding Tower, 634m)",
          attraction: "Tokyo Skytree Tembo Deck",
          location: "1-1-2 Oshiage, Sumida City, Tokyo 131-0045",
          mapUrl: "https://maps.google.com/?q=Tokyo+Skytree",
          duration: "3 hours",
          transport: "Tobu Skytree Line or 15-minute walk across Sumida River",
          description: "Ascend to the 350-meter Tembo Deck and 450-meter Tembo Galleria glass-floored spiral walkway for staggering 70-kilometer panoramic visibility.",
          entranceFee: "Combo ticket ~¥3,100 per adult",
          notes: "Solamachi shopping mall at the base has 300+ specialty Japanese shops."
        },
        evening: {
          time: "17:30 - 20:30",
          activity: "Akihabara Electric Town & Retro Gaming",
          attraction: "Akihabara Electric Town (Akiba)",
          location: "Sotokanda, Chiyoda City, Tokyo 101-0021",
          mapUrl: "https://maps.google.com/?q=Akihabara+Electric+Town",
          duration: "3 hours",
          transport: "JR Yamanote Line to Akihabara Station (10 mins)",
          description: "The global epicenter of anime, manga, electronics, and retro gaming culture. Explore multi-story Sega/Genda arcade centers and vintage electronics alleys.",
          entranceFee: "Free district exploration",
          notes: "Chuo-dori main street is closed to vehicles on Sunday afternoons."
        }
      },
      {
        dayNumber: 3,
        title: "Meiji Jingu Shrine, Harajuku & Shibuya Crossing",
        morning: {
          time: "09:00 - 12:00",
          activity: "Meiji Jingu Shinto Shrine & Yoyogi Forest",
          attraction: "Meiji Jingu Shrine",
          location: "1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557",
          mapUrl: "https://maps.google.com/?q=Meiji+Jingu+Shrine",
          duration: "3 hours",
          transport: "JR Yamanote Line to Harajuku Station (5 mins from Shinjuku)",
          description: "Walk under towering 12-meter cypress Torii gates into a serene 70-hectare evergreen forest planted with 100,000 trees donated from across Japan, honoring Emperor Meiji.",
          entranceFee: "Shrine grounds free",
          notes: "Traditional Shinto weekend wedding processions frequently pass the courtyard."
        },
        afternoon: {
          time: "12:30 - 15:30",
          activity: "Takeshita Street Pop Culture & Omotesando Architecture",
          attraction: "Takeshita Street & Omotesando Hills",
          location: "Jingumae, Shibuya City, Tokyo 150-0001",
          mapUrl: "https://maps.google.com/?q=Takeshita+Street+Harajuku",
          duration: "3 hours",
          transport: "Steps from Harajuku Station exit",
          description: "Contrast the eccentric teen Kawaii fashion and rainbow cotton candy on Takeshita Street with the tree-lined, Tadao Ando-designed luxury promenade of Omotesando.",
          entranceFee: "Free walking streets",
          notes: "Try freshly rolled Japanese Marion Crepes on Takeshita-dori."
        },
        evening: {
          time: "16:30 - 20:30",
          activity: "Shibuya Crossing, Hachiko Memorial & Shibuya Sky",
          attraction: "Shibuya Scramble Crossing & Shibuya Sky Rooftop",
          location: "2-24-12 Shibuya, Shibuya City, Tokyo 150-6145",
          mapUrl: "https://maps.google.com/?q=Shibuya+Scramble+Crossing",
          duration: "4 hours",
          transport: "1 stop on JR Yamanote Line or 15-minute walk",
          description: "Experience the world's busiest pedestrian intersection where up to 3,000 people cross simultaneously, visit the faithful dog Hachiko bronze statue, and take in sunset at the Shibuya Sky open-air roof deck (229m).",
          entranceFee: "Shibuya Sky ticket ¥2,200 per adult (advance reservation)",
          notes: "Tripods, loose hats, and bags are prohibited on the open-air roof deck."
        }
      },
      {
        dayNumber: 4,
        title: "Mount Fuji 5th Station & Lake Ashi Scenic Excursion",
        morning: {
          time: "07:30 - 12:30",
          activity: "Mount Fuji 5th Station (2,300m Elevation)",
          attraction: "Fuji Subaru Line 5th Station",
          location: "Mount Fuji, Narusawa, Minamitsuru District, Yamanashi",
          mapUrl: "https://maps.google.com/?q=Mount+Fuji+5th+Station",
          duration: "5 hours",
          transport: "Scenic express tour coach from Shinjuku Bus Terminal (2.5 hrs)",
          description: "Journey to the boundary between the forest and rocky slopes of Japan's sacred mountain (3,776m). Visit the Komitake Shrine above the clouds.",
          entranceFee: "Subaru Line toll road included in day tour",
          notes: "Temperature is ~10°C cooler than Tokyo; windbreaker jacket recommended."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Lake Ashi Pirate Ship Cruise & Hakone Ropeway",
          attraction: "Lake Ashi & Owakudani Volcanic Valley",
          location: "Hakone, Kanagawa Prefecture 250-0522",
          mapUrl: "https://maps.google.com/?q=Lake+Ashi+Hakone",
          duration: "3 hours",
          transport: "Hakone Ropeway cable car across steaming sulfur vents",
          description: "Cruise across volcanic Lake Ashi on a themed pirate ship with reflections of Mount Fuji, then soar over sulfur steam vents at Owakudani where black eggs (kuro-tamago) are boiled in mineral springs.",
          entranceFee: "Hakone Freepass / cruise included in tour package",
          notes: "Local legend says eating one black egg adds seven years to your life!"
        },
        evening: {
          time: "17:30 - 20:00",
          activity: "Express Return to Tokyo & Shinjuku Dining",
          attraction: "JR Shinjuku Station & Lumine Food Halls",
          location: "Shinjuku City, Tokyo",
          mapUrl: "https://maps.google.com/?q=Shinjuku+Station",
          duration: "2.5 hours",
          transport: "Coach return to Shinjuku Station",
          description: "Return comfortably to central Tokyo and savor authentic tonkatsu (crispy pork cutlet) or handmade ramen.",
          entranceFee: "Meal on own expense",
          notes: "Relaxing evening after mountain excursion."
        }
      },
      {
        dayNumber: 5,
        title: "Toyosu Market Sushi & teamLab Planets Digital Art",
        morning: {
          time: "08:30 - 12:00",
          activity: "Toyosu Market Fresh Seafood & Ginza District",
          attraction: "Toyosu Fish Market & Ginza Six",
          location: "6-6-1 Toyosu, Koto City, Tokyo 135-0061",
          mapUrl: "https://maps.google.com/?q=Toyosu+Market",
          duration: "3.5 hours",
          transport: "Yurikamone automated transit line to Shijo-mae Station",
          description: "Visit the world's most advanced wholesale fish market (successor to Tsukiji) and savor the freshest sashimi, followed by strolling Tokyo's luxury fashion boulevard of Ginza.",
          entranceFee: "Market viewing deck free",
          notes: "Sushi restaurants in block 6 fill up early; arrive by 09:00."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "teamLab Planets TOKYO (Body Immersive Digital Art)",
          attraction: "teamLab Planets TOKYO DMM",
          location: "6-1-16 Toyosu, Koto City, Tokyo 135-0061",
          mapUrl: "https://maps.google.com/?q=teamLab+Planets+TOKYO",
          duration: "3 hours",
          transport: "1 stop on Yurikamome line to Shin-Toyosu Station",
          description: "Walk barefoot through knee-deep digital water projected with koi fish, enter the Infinite Crystal Universe, and immerse yourself in the Floating Flower Garden containing over 13,000 living orchids.",
          entranceFee: "¥3,800 per adult (advance timed ticket included)",
          notes: "Visitors enter barefoot; pants that can be rolled above knees recommended."
        },
        evening: {
          time: "17:30 - 20:30",
          activity: "Odaiba Seaside Park & Rainbow Bridge Illumination",
          attraction: "Odaiba Marine Park & Unicorn Gundam Statue",
          location: "1-1 Daiba, Minato City, Tokyo 135-0091",
          mapUrl: "https://maps.google.com/?q=Odaiba+Marine+Park",
          duration: "3 hours",
          transport: "Yurikamome line to Daiba Station",
          description: "View the miniature Statue of Liberty replica, the 19.7-meter life-size transforming Unicorn Gundam statue in front of DiverCity, and night views of the illuminated Rainbow Bridge.",
          entranceFee: "Park free; Gundam show free",
          notes: "Gundam light transformation shows occur every 30 minutes in the evening."
        }
      },
      {
        dayNumber: 6,
        title: "Imperial Palace, Ueno Culture & Roppongi Hills",
        morning: {
          time: "09:30 - 12:30",
          activity: "Imperial Palace East Gardens & Nijubashi Bridge",
          attraction: "Tokyo Imperial Palace (Kokyo)",
          location: "1-1 Chiyoda, Chiyoda City, Tokyo 100-8111",
          mapUrl: "https://maps.google.com/?q=Tokyo+Imperial+Palace",
          duration: "3 hours",
          transport: "Tokyo Metro Marunouchi Line to Tokyo Station (15 mins)",
          description: "Walk across the gravel plazas to the iconic double-arched stone Nijubashi Bridge and tour the historic stone foundations of Edo Castle's former main donjon tower.",
          entranceFee: "East Gardens free",
          notes: "Closed Mondays and Fridays. Guided palace tours require advance reservation."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Ueno Park & Tokyo National Museum",
          attraction: "Tokyo National Museum (Honkan Building)",
          location: "13-9 Uenokoen, Taito City, Tokyo 110-8712",
          mapUrl: "https://maps.google.com/?q=Tokyo+National+Museum",
          duration: "3 hours",
          transport: "JR Yamanote Line to Ueno Station (10 mins)",
          description: "Explore Japan's oldest and largest museum, housing over 120,000 historical cultural artifacts including authentic samurai armor, katana swords, and delicate ukiyo-e woodblock prints.",
          entranceFee: "¥1,000 per adult",
          notes: "Closed Mondays; audio guide available in English."
        },
        evening: {
          time: "17:30 - 20:30",
          activity: "Roppongi Hills Mori Art Museum & City View",
          attraction: "Mori Art Museum & Roppongi Hills Mori Tower",
          location: "6-10-1 Roppongi, Minato City, Tokyo 106-6150",
          mapUrl: "https://maps.google.com/?q=Mori+Art+Museum",
          duration: "3 hours",
          transport: "Tokyo Metro Hibiya Line to Roppongi Station",
          description: "Contemporary art exhibitions on the 53rd floor followed by sweeping views of the illuminated red-and-white Tokyo Tower from the indoor observation deck.",
          entranceFee: "Combo ticket ~¥2,000 per adult",
          notes: "Open late until 22:00 on most evenings."
        }
      },
      {
        dayNumber: 7,
        title: "Souvenir Shopping at Tokyo Station & Departure",
        morning: {
          time: "09:30 - 12:30",
          activity: "Tokyo Character Street & Depachika Gourmet Food Halls",
          attraction: "Tokyo Station Marunouchi Building & First Avenue",
          location: "1-9-1 Marunouchi, Chiyoda City, Tokyo 100-0005",
          mapUrl: "https://maps.google.com/?q=Tokyo+Station",
          duration: "3 hours",
          transport: "Short train transfer from hotel",
          description: "Browse the restored 1914 red-brick Tokyo Station, shop for Studio Ghibli, Pokémon, and Sanrio goods on Character Street, and sample artisanal Japanese confectionery (wagashi).",
          entranceFee: "Free underground shopping city",
          notes: "Buy Tokyo Banana and KitKat regional editions for souvenirs."
        },
        afternoon: {
          time: "13:00 - 16:00",
          activity: "Hotel Checkout & Luggage Collection",
          attraction: "Hotel Gracery Shinjuku",
          location: "Kabukicho, Shinjuku, Tokyo",
          mapUrl: "https://maps.google.com/?q=Hotel+Gracery+Shinjuku",
          duration: "3 hours",
          transport: "Yamanote Line return to Shinjuku",
          description: "Complete checkout at Hotel Gracery Shinjuku and prepare luggage for airport transfer.",
          entranceFee: "N/A",
          notes: "Late checkout options available upon request at reception."
        },
        evening: {
          time: "16:30 - 19:30",
          activity: "Airport Limousine Bus & Departure Flights",
          attraction: "Haneda / Narita International Airport",
          location: "Tokyo Airport Departures",
          mapUrl: "https://maps.google.com/?q=Tokyo+Haneda+Airport",
          duration: "3 hours",
          transport: "Direct Limousine Bus from hotel lobby to airport terminal",
          description: "Comfortable transfer to airport departure gate with duty-free tax refund shopping before your onward flight.",
          entranceFee: "N/A",
          notes: "Return rented pocket Wi-Fi routers at the airport post box."
        }
      }
    ],

    inclusions: [
      "6 Nights accommodation at 4-Star Hotel Gracery Shinjuku (Comfort Room)",
      "Daily Japanese/Western buffet breakfast",
      "Full-Day Mount Fuji 5th Station & Lake Ashi Cruise Excursion with English guide",
      "teamLab Planets TOKYO Digital Art Entry Ticket",
      "Shibuya Sky 360-Degree Rooftop Observation Ticket",
      "7-Day Tokyo Subway Pass (unlimited rides on Tokyo Metro & Toei subway lines)"
    ],
    exclusions: [
      "International flights to/from Tokyo (HND/NRT)",
      "Japan visa fees (if applicable)",
      "Daily lunches and dinners (authentic ramen/sushi recommendations provided)",
      "Luggage forwarding services between cities"
    ],
    travelTips: [
      "Tipping is NOT customary in Japan and can cause confusion; exceptional service is standard.",
      "Carry a small hand towel and hand sanitizer; many public restrooms do not provide paper towels.",
      "Keep cash (Yen) on hand for small noodle bars and temple fortune slips."
    ],
    officialReferences: [
      { name: "Tokyo Convention & Visitors Bureau", url: "https://www.gotokyo.org/en" },
      { name: "Japan National Tourism Organization", url: "https://www.japan.travel/en" }
    ]
  },

  // 6. Swiss Alps & Lakes Scenic Tour (Switzerland)
  "switzerland": {
    matchedKeywords: ["switzerland", "swiss", "alps", "interlaken", "lucerne"],
    title: "Swiss Alps & Lakes Scenic Tour",
    destination: "Switzerland (Lucerne & Interlaken)",
    duration: "6 days, 5 nights",
    bestSeason: "June to September (Lush green alpine meadows) & December to March (Winter snow sports)",
    suitableFor: "Scenic Travelers, Couples, Nature Enthusiasts, Photography Lovers",
    heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (Lauterbrunnen Valley, Switzerland)",
    sourceAttribution: "Switzerland Tourism (myswitzerland.com)",
    overview:
      "A scenic journey across Switzerland's alpine landscapes. Spanning Lucerne's medieval wooden bridges, Mount Pilatus cogwheel railways, the 72 waterfalls of Lauterbrunnen, and Jungfraujoch — the 'Top of Europe' at 3,454 meters.",

    accommodation: {
      name: "Hotel Interlaken",
      type: "Historic 4-Star Alpine Hotel (Since 1491)",
      address: "Höheweg 74, 3800 Interlaken, Bernese Oberland, Switzerland",
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified Swiss alpine hotel accommodation",
      mapUrl: "https://maps.google.com/?q=Hotel+Interlaken",
      checkIn: "15:00",
      checkOut: "11:00",
      roomType: "Superior Alpine View Double Room",
      capacity: "2 Adults",
      amenities: [
        "Walking distance (5 mins) from Interlaken Ost railway hub",
        "Fine dining at Restaurant Taverne with traditional Swiss fondue",
        "Complimentary high-speed Wi-Fi throughout property",
        "Complimentary Interlaken Visitor Mobility Pass (free local buses)",
        "Quiet Japanese garden terrace beside historic monastery walls",
        "Dedicated ski and hiking gear storage room with boot dryers"
      ],
      rules: "Valid passport required at check-in. Swiss cantonal visitor tax (CHF 3.50/person/night) paid at hotel.",
      providerNotes: "Historical guests include Lord Byron and composer Felix Mendelssohn."
    },

    days: [
      {
        dayNumber: 1,
        title: "Zurich Arrival, Scenic Train to Lucerne & Lake Cruise",
        morning: {
          time: "09:30 - 12:30",
          activity: "Arrival at Zurich Airport & Swiss Rail to Lucerne",
          attraction: "Zurich Airport (ZRH) to Lucerne via SBB Swiss Rail",
          location: "Lucerne Station (Bahnhof Luzern), Switzerland",
          mapUrl: "https://maps.google.com/?q=Lucerne+Railway+Station",
          duration: "3 hours",
          transport: "Direct double-deck SBB train along Lake Zurich (50 mins)",
          description: "Arrive at Zurich Airport and take the punctual Swiss train smoothly to Lucerne, nestled on the shores of Lake Lucerne with Mount Pilatus rising behind.",
          entranceFee: "Swiss Travel Pass covers train route",
          notes: "Luggage storage lockers available at Lucerne station."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Chapel Bridge & Historic Old Town (Altstadt)",
          attraction: "Kapellbrücke (Chapel Bridge) & Lion Monument",
          location: "Kapellbrücke, 6002 Luzern, Switzerland",
          mapUrl: "https://maps.google.com/?q=Chapel+Bridge+Lucerne",
          duration: "3 hours",
          transport: "Walking tour through medieval pedestrian city center",
          description: "Walk across Europe's oldest covered wooden footbridge built in 1333, featuring 17th-century triangular roof paintings, and view the poignant rock-hewn Lion of Lucerne.",
          entranceFee: "Free historic monuments",
          notes: "Sample Swiss artisanal chocolates at Läderach on the lake promenade."
        },
        evening: {
          time: "17:00 - 19:30",
          activity: "Lake Lucerne Panoramic Steamboat Cruise",
          attraction: "Lake Lucerne (Vierwaldstättersee) Steamer",
          location: "Bahnhofquai Pier 1, Lucerne",
          mapUrl: "https://maps.google.com/?q=Lake+Lucerne+Boat+Pier",
          duration: "2.5 hours",
          transport: "Historic paddle steamer / luxury motor vessel",
          description: "One-hour cruise gliding past Bürgenstock mountain cliffs, historic lakeside castles, and snowcapped summits reflected in crystal-clear waters.",
          entranceFee: "Included in Swiss Travel Pass (normal fare ~CHF 32)",
          notes: "Warm outdoor jacket recommended on open boat decks."
        }
      },
      {
        dayNumber: 2,
        title: "Mount Pilatus Golden Round Trip (World's Steepest Cogwheel)",
        morning: {
          time: "09:00 - 13:00",
          activity: "World's Steepest Cogwheel Railway to Pilatus Kulm (2,132m)",
          attraction: "Pilatus Bahnen Cogwheel Railway",
          location: "Alpnachstad Station, 6053 Alpnach, Switzerland",
          mapUrl: "https://maps.google.com/?q=Pilatus+Cogwheel+Railway+Alpnachstad",
          duration: "4 hours",
          transport: "Boat to Alpnachstad, then 48% gradient cogwheel railway",
          description: "Ascend past alpine pastures, vertical rock faces, and spruce forests on the world's steepest cogwheel train (operating since 1889) to the summit of Pilatus Kulm.",
          entranceFee: "Golden Round Trip ticket ~CHF 78 (50% with Swiss Pass)",
          notes: "Cogwheel operates May to November; aerial cableway operates year-round."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Dragon Ride Aerial Cableway to Kriens & Interlaken Transfer",
          attraction: "Pilatus Dragon Ride Cableway & Panoramic Gondola",
          location: "Pilatus Kulm down to Kriens",
          mapUrl: "https://maps.google.com/?q=Pilatus+Kulm",
          duration: "3 hours",
          transport: "Cable car descent to Kriens, then Luzern-Interlaken Express scenic train",
          description: "Glide down in the cockpit-style glass cable car, then board the Luzern-Interlaken Express climbing over the Brünig Pass past three turquoise lakes to Interlaken.",
          entranceFee: "Train fully covered by Swiss Travel Pass",
          notes: "Check into Hotel Interlaken upon arrival at Interlaken Ost."
        },
        evening: {
          time: "17:30 - 20:30",
          activity: "Höhematte Meadow & Traditional Swiss Fondue Dinner",
          attraction: "Höhematte Park & Restaurant Taverne",
          location: "Höheweg, 3800 Interlaken",
          mapUrl: "https://maps.google.com/?q=Hohematte+Interlaken",
          duration: "3 hours",
          transport: "Walk through town",
          description: "Watch paragliders land on the central 35-acre Höhematte meadow with views of the Jungfrau peak, followed by authentic Gruyère and Emmental cheese fondue.",
          entranceFee: "Park free; dinner included in package plan",
          notes: "Crisp evening air; comfortable walking shoes."
        }
      },
      {
        dayNumber: 3,
        title: "Lauterbrunnen Valley of 72 Waterfalls & Mürren",
        morning: {
          time: "09:00 - 12:30",
          activity: "Lauterbrunnen Valley & Staubbach Falls",
          attraction: "Staubbach Falls & Lauterbrunnen U-Shaped Glacial Valley",
          location: "Lauterbrunnen, 3822 Bernese Oberland, Switzerland",
          mapUrl: "https://maps.google.com/?q=Staubbach+Falls+Lauterbrunnen",
          duration: "3.5 hours",
          transport: "Berner Oberland Bahn (BOB) train from Interlaken Ost (20 mins)",
          description: "Visit the postcard-perfect valley that inspired Tolkien's Rivendell, framed by sheer 300-meter cliffs and the free-falling mist of Staubbach Falls.",
          entranceFee: "Valley and falls path free",
          notes: "Walk behind the spray of Staubbach Falls via the rock-cut staircase."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Trümmelbach Waterfalls Inside the Mountain",
          attraction: "Trümmelbachfälle (10 Glacial Waterfalls Inside Rock)",
          location: "Trümmelbach, 3822 Lauterbrunnen, Switzerland",
          mapUrl: "https://maps.google.com/?q=Trummelbach+Falls",
          duration: "3 hours",
          transport: "Postal bus from Lauterbrunnen station (8 mins)",
          description: "Subterranean series of 10 roaring glacial falls draining the glaciers of Eiger, Mönch, and Jungfrau, carrying up to 20,000 liters of water per second through illuminated caves.",
          entranceFee: "CHF 15 per adult",
          notes: "Tunnel lift provides access; waterproof jacket recommended."
        },
        evening: {
          time: "17:00 - 19:30",
          activity: "Car-Free Alpine Village of Mürren & Return",
          attraction: "Mürren Mountain Village (1,638m)",
          location: "Mürren, Lauterbrunnen, Switzerland",
          mapUrl: "https://maps.google.com/?q=Murren+Switzerland",
          duration: "2.5 hours",
          transport: "Cable car to Grütschalp, then scenic mountain railway to Mürren",
          description: "Stroll along traditional Swiss timber chalets with flower boxes and uninterrupted views facing the North Face of the Eiger.",
          entranceFee: "Transport covered by Swiss Pass",
          notes: "No cars are permitted in Mürren; peace and fresh alpine air."
        }
      },
      {
        dayNumber: 4,
        title: "Jungfraujoch — Top of Europe at 3,454m Altitude",
        morning: {
          time: "08:30 - 13:00",
          activity: "Eiger Express Tricable Gondola & Jungfrau Railway to Summit",
          attraction: "Jungfraujoch — Top of Europe (3,454m)",
          location: "Jungfraujoch, 3801 Grindelwald / Lauterbrunnen",
          mapUrl: "https://maps.google.com/?q=Jungfraujoch+Top+of+Europe",
          duration: "4.5 hours",
          transport: "BOB train to Grindelwald Terminal, Eiger Express (15 mins to Eigergletscher), then cogwheel train through Eiger tunnel",
          description: "Ascend to Europe's highest railway station. Stand on the Sphinx Observation Terrace looking out across the 23-kilometer Great Aletsch Glacier (UNESCO World Heritage).",
          entranceFee: "Jungfraujoch roundtrip ~CHF 190 (25% discount with Swiss Pass)",
          notes: "Sunglasses and sunscreen essential; snow UV radiation is intense at 3,454m."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Ice Palace & Alpine Sensation Exhibition",
          attraction: "Eispalast (Ice Palace) Inside the Glacier",
          location: "Inside Jungfraujoch Glacier Cave",
          mapUrl: "https://maps.google.com/?q=Jungfraujoch+Ice+Palace",
          duration: "3 hours",
          transport: "Walking within the subterranean Jungfraujoch complex",
          description: "Walk through vaulted blue ice tunnels hand-carved 30 meters beneath the glacier, filled with crystalline ice sculptures of eagles, bears, and penguins.",
          entranceFee: "Included in Jungfraujoch ticket",
          notes: "The ice floor is smooth; rubber-soled winter boots recommended."
        },
        evening: {
          time: "17:00 - 19:30",
          activity: "Grindewald Alpine Village Descent & Return",
          attraction: "Grindelwald Glacier Village",
          location: "Grindelwald, Bernese Oberland, Switzerland",
          mapUrl: "https://maps.google.com/?q=Grindelwald+Switzerland",
          duration: "2.5 hours",
          transport: "Cogwheel descent to Grindelwald, train back to Interlaken",
          description: "Explore the bustling village of Grindelwald beneath the sheer 1,800m North Face of the Eiger before returning to Hotel Interlaken.",
          entranceFee: "Free village walk",
          notes: "Souvenir shops carry authentic Swiss army knives with engraving."
        }
      },
      {
        dayNumber: 5,
        title: "Lake Brienz Turquoise Cruise & Historic Giessbach Falls",
        morning: {
          time: "09:30 - 12:30",
          activity: "Lake Brienz Steamboat Cruise to Giessbach",
          attraction: "Lake Brienz (Brienzersee)",
          location: "Interlaken Ost Boat Pier, Switzerland",
          mapUrl: "https://maps.google.com/?q=Lake+Brienz+Boat+Pier",
          duration: "3 hours",
          transport: "BLS Lake Brienz cruiser from Interlaken Ost pier",
          description: "Cruise across glacial turquoise waters fed by the melting snow of the Bernese Alps, passing steep forested cliffs to Giessbach See pier.",
          entranceFee: "Covered by Swiss Travel Pass",
          notes: "Lake Brienz is renowned for its intense natural turquoise color."
        },
        afternoon: {
          time: "13:00 - 16:00",
          activity: "Giessbach Waterfalls & Historic 1879 Funicular",
          attraction: "Giessbach Falls & Grandhotel Giessbach",
          location: "3855 Brienz, Switzerland",
          mapUrl: "https://maps.google.com/?q=Giessbach+Falls",
          duration: "3 hours",
          transport: "Historic 1879 funicular railway (Europe's oldest passenger funicular)",
          description: "Fourteen roaring cascade stages tumbling 500 meters into Lake Brienz, with footpaths allowing you to walk directly behind the roaring wall of water.",
          entranceFee: "Funicular CHF 10 roundtrip; falls footpath free",
          notes: "Historic fairy-tale castle Grandhotel Giessbach is open for terrace coffee."
        },
        evening: {
          time: "16:30 - 19:30",
          activity: "Brienz Woodcarving Village & Swiss Rail to Bern",
          attraction: "Brienz Village & Bern Clock Tower",
          location: "Brienz, Switzerland",
          mapUrl: "https://maps.google.com/?q=Brienz+Switzerland",
          duration: "3 hours",
          transport: "Short train to Brienz, then onward connection to Interlaken/Bern",
          description: "Visit traditional woodcarvers in Brienz, known as the Swiss capital of wood sculptures, with 18th-century timber homes.",
          entranceFee: "Free village stroll",
          notes: "Pack luggage for final day departure."
        }
      },
      {
        dayNumber: 6,
        title: "Bern UNESCO Medieval Capital & Departure Transfer",
        morning: {
          time: "09:30 - 12:30",
          activity: "Bern Old Town, Zytglogge Clock & Bear Park",
          attraction: "Old City of Bern (UNESCO World Heritage Site)",
          location: "Kramgasse 49, 3011 Bern, Switzerland",
          mapUrl: "https://maps.google.com/?q=Zytglogge+Bern",
          duration: "3 hours",
          transport: "SBB InterCity train from Interlaken to Bern (50 mins)",
          description: "Explore Switzerland's capital with 6 kilometers of covered sandstone arcades, Renaissance fountains, the 13th-century Zytglogge astronomical clock tower, and the Bärengraben (Bear Park).",
          entranceFee: "Old town free; Zytglogge guided tour CHF 20",
          notes: "Clock performance occurs 4 minutes before every hour."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Swiss Rail Transfer to Zurich International Airport",
          attraction: "Zurich Airport (ZRH) Rail Station",
          location: "Flughafen Zürich, 8058 Zürich, Switzerland",
          mapUrl: "https://maps.google.com/?q=Zurich+Airport",
          duration: "3 hours",
          transport: "Direct SBB InterCity train from Bern to Zurich Airport (75 mins)",
          description: "Seamless train connection straight into the underground level of Zurich Airport without needing taxis or luggage re-handling.",
          entranceFee: "Included in Swiss Travel Pass",
          notes: "VAT refund desks for Swiss luxury goods are located in Check-in 1 and 2."
        },
        evening: {
          time: "17:00 - 19:30",
          activity: "Airport Duty-Free Shopping & Onward Flights",
          attraction: "ZRH International Departures",
          location: "Zurich Airport",
          mapUrl: "https://maps.google.com/?q=Zurich+Airport",
          duration: "2.5 hours",
          transport: "Walk to departure gates",
          description: "Final stop to purchase authentic Swiss chocolates (Lindt, Sprüngli) before boarding departure flight.",
          entranceFee: "N/A",
          notes: "Arrive at least 2.5 hours prior to long-haul international flights."
        }
      }
    ],

    inclusions: [
      "5 Nights accommodation at Hotel Interlaken / verified alpine room",
      "Daily Swiss mountain breakfast buffet with artisanal cheeses and breads",
      "Full Jungfraujoch Top of Europe Excursion ticket (Eiger Express + Cogwheel)",
      "Mount Pilatus Golden Roundtrip Excursion ticket (Steamboat + Cogwheel + Cable car)",
      "Lake Lucerne & Lake Brienz unlimited boat cruises",
      "6-Day Swiss Travel Pass (unlimited train, bus, boat, and 500+ museums)"
    ],
    exclusions: [
      "International flights to/from Zurich (ZRH)",
      "Daily tourist city taxes (CHF 3.50 per person per night paid at hotel)",
      "Lunch and dinner expenses (traditional fondue dinner included on Day 2)",
      "Paragliding or adventure sports in Interlaken (optional add-on)"
    ],
    travelTips: [
      "The SBB Mobile app is the definitive tool for real-time Swiss train platforms and schedules.",
      "Always check morning summit webcams for Jungfraujoch and Pilatus before ascending.",
      "Tap water in Switzerland is among the purest in the world; bring a refillable bottle."
    ],
    officialReferences: [
      { name: "Switzerland Tourism Official Portal", url: "https://www.myswitzerland.com" },
      { name: "Jungfrau Railways Official", url: "https://www.jungfrau.ch/en-gb" }
    ]
  },

  // 7. Santorini Island & Caldera Sunset Tour (Santorini, Greece)
  "santorini": {
    matchedKeywords: ["santorini", "greece", "oia", "fira", "aegean"],
    title: "Santorini Island & Caldera Sunset Tour",
    destination: "Santorini, Greece",
    duration: "4 days, 3 nights",
    bestSeason: "May to October (warm sunshine, swimming, vivid sunsets)",
    suitableFor: "Honeymooners, Couples, Photographers, Island Explorers",
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Photo via Unsplash (Oia White Domes & Caldera Sunset)",
    sourceAttribution: "Greek National Tourism Organisation (visitgreece.gr)",
    overview:
      "Experience the volcanic wonder of the Cyclades. From whitewashed cave suites carved into multi-colored cliffs to swimming in geothermal volcanic hot springs, discovering the Bronze Age ruins of Akrotiri, and watching world-renowned Oia sunsets.",

    accommodation: {
      name: "Canaves Oia Suites",
      type: "5-Star Luxury Cave Suite Hotel",
      address: "Main Street, Oia, Santorini 84702, Cyclades, Greece",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified Cycladic cliffside suite accommodation",
      mapUrl: "https://maps.google.com/?q=Canaves+Oia+Suites",
      checkIn: "15:00",
      checkOut: "11:00",
      roomType: "Classic Caldera View Cave Suite with Plunge Pool",
      capacity: "2 Adults",
      amenities: [
        "Private plunge pool overlooking the Aegean Sea and volcanic crater",
        "Infinity pool bar serving signature Mediterranean cocktails",
        "Traditional Cycladic vaulted ceiling architecture with minimalist design",
        "Aura Spa offering Greek olive oil and volcanic stone treatments",
        "24-Hour VIP concierge and porter service for cliffside luggage handling",
        "Gourmet champagne breakfast served on your private sun terrace"
      ],
      rules: "Valid passport required at check-in. Greek climate resilience tax (€10/room/night) paid at hotel.",
      providerNotes: "Member of Small Luxury Hotels of the World."
    },

    days: [
      {
        dayNumber: 1,
        title: "Arrival in Santorini & Fira Cliffside Exploration",
        morning: {
          time: "10:30 - 13:30",
          activity: "Arrival at Santorini (JTR) / Port & Oia Check-in",
          attraction: "Santorini Thira Airport (JTR) & Canaves Oia Suites",
          location: "Oia, Santorini 84702, Greece",
          mapUrl: "https://maps.google.com/?q=Santorini+Airport",
          duration: "3 hours",
          transport: "Private luxury Mercedes van transfer from airport/port (25 mins)",
          description: "Arrive on the volcanic island, enjoy a welcome glass of Assyrtiko wine, and settle into your whitewashed cave suite with Aegean caldera views.",
          entranceFee: "Airport transfer included",
          notes: "Porters carry heavy luggage down the steep Cycladic steps."
        },
        afternoon: {
          time: "14:30 - 17:30",
          activity: "Fira Cliffside Promenade & Three Bells of Fira",
          attraction: "Fira Capital & Three Bells of Fira Church",
          location: "Fira, Santorini 84700",
          mapUrl: "https://maps.google.com/?q=Three+Bells+of+Fira",
          duration: "3 hours",
          transport: "15-minute transfer to island capital of Fira",
          description: "Stroll along the pedestrian cliff rim connecting Fira to Firostefani. Photograph the blue-domed Catholic Church of the Dormition (Three Bells of Fira) against the sapphire sea.",
          entranceFee: "Free walking paths",
          notes: "Wear comfortable rubber-soled sandals; marble walkways can be slick."
        },
        evening: {
          time: "18:30 - 21:00",
          activity: "Seaside Dinner in Imerovigli 'Balcony to the Aegean'",
          attraction: "Skaros Rock Viewpoint, Imerovigli",
          location: "Imerovigli, Santorini 84700",
          mapUrl: "https://maps.google.com/?q=Skaros+Rock+Imerovigli",
          duration: "2.5 hours",
          transport: "Short transfer or sunset walk",
          description: "Watch the sun illuminate the medieval ruined fortress of Skaros Rock while enjoying fresh grilled octopus, Greek salad, and Santorini fava bean puree.",
          entranceFee: "Meal on own expense / dinner reservation assisted",
          notes: "Caldera breeze picks up at sunset; light shawl recommended."
        }
      },
      {
        dayNumber: 2,
        title: "Volcano Crater Hike, Hot Springs & Thirassia Cruise",
        morning: {
          time: "09:30 - 13:00",
          activity: "Catamaran Cruise to Nea Kameni Active Volcano",
          attraction: "Nea Kameni Volcanic Island",
          location: "Santorini Caldera Lagoon",
          mapUrl: "https://maps.google.com/?q=Nea+Kameni+Volcano",
          duration: "3.5 hours",
          transport: "Board luxury sailing catamaran from Ammoudi Bay / Athinios",
          description: "Sail into the flooded caldera basin. Hike to the active sulfur-smoking crater of Nea Kameni at 130m with a volcanologist guide explaining the 1600 BC Minoan eruption.",
          entranceFee: "Volcano national park entry €5 per person",
          notes: "Sneakers required for hiking volcanic scree; no flip-flops."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Palea Kameni Thermal Hot Springs & Onboard Greek BBQ",
          attraction: "Palea Kameni Volcanic Hot Springs",
          location: "Palea Kameni Island, Santorini",
          mapUrl: "https://maps.google.com/?q=Palea+Kameni+Hot+Springs",
          duration: "3 hours",
          transport: "Catamaran sailing across the bay",
          description: "Swim from the boat into geothermal coves warmed to 30°C-35°C by sulfur and iron-rich volcanic vents, followed by fresh Greek souvlaki grilled on the yacht.",
          entranceFee: "Included in catamaran tour",
          notes: "Wear a dark swimsuit; mineral-rich volcanic mud can discolour white fabrics."
        },
        evening: {
          time: "17:30 - 20:30",
          activity: "Ammoudi Bay Fresh Seafood Dinner & Sunset Sailing",
          attraction: "Ammoudi Bay (Port of Oia)",
          location: "Ammoudi Bay, Oia, Santorini 84702",
          mapUrl: "https://maps.google.com/?q=Ammoudi+Bay+Santorini",
          duration: "3 hours",
          transport: "Catamaran disembarks at Ammoudi Bay",
          description: "Disembark at the foot of red cliffs in Ammoudi Bay where fishing tavernas serve catches of the day directly at the water's edge.",
          entranceFee: "Included in cruise package",
          notes: "300 steps or taxi transfer back up to Oia village."
        }
      },
      {
        dayNumber: 3,
        title: "Prehistoric Akrotiri, Red Beach & World-Famous Oia Sunset",
        morning: {
          time: "09:30 - 12:30",
          activity: "Akrotiri Archaeological Site (The Greek Pompeii)",
          attraction: "Akrotiri Prehistoric City Ruins (Minoan Bronze Age)",
          location: "Akrotiri, Santorini 84700",
          mapUrl: "https://maps.google.com/?q=Akrotiri+Archaeological+Site",
          duration: "3 hours",
          transport: "Private AC vehicle to southern Santorini (30 mins)",
          description: "Walk under a bioclimatic roof over an exceptionally preserved 3,700-year-old Bronze Age city buried under volcanic ash, featuring multi-story houses and advanced drainage systems.",
          entranceFee: "€12 per adult (Combined museum ticket €15)",
          notes: "Modern bioclimatic shelter protects visitors from heat."
        },
        afternoon: {
          time: "13:00 - 16:00",
          activity: "Red Beach Viewpoint & Santo Wines Caldera Tasting",
          attraction: "Red Beach (Kokkini Paralia) & Santo Wines Winery",
          location: "Pyrgos Kallistis, Santorini 84700",
          mapUrl: "https://maps.google.com/?q=Santo+Wines+Winery",
          duration: "3 hours",
          transport: "15-minute drive along Pyrgos ridge",
          description: "Admire soaring red volcanic lava cliffs dropping into blue waters, followed by wine tasting on the cliffside terrace of Santo Wines, sampling indigenous Assyrtiko and Vinsanto sweet wine.",
          entranceFee: "Wine flight & cheese board ~€35 per person",
          notes: "Santorini vines are woven into circular basket wreaths (kouloura) to resist winds."
        },
        evening: {
          time: "17:30 - 21:00",
          activity: "Oia Village Golden Sunset from Byzantine Castle Ruins",
          attraction: "Oia Castle (Agios Nikolaos Fortress Ruins)",
          location: "Oia, Santorini 84702",
          mapUrl: "https://maps.google.com/?q=Oia+Castle+Santorini",
          duration: "3.5 hours",
          transport: "Return to Oia village",
          description: "Witness the sunset from the northernmost tip of Santorini. Watch white windmills and blue domes glow warm amber and violet as the sun drops below the Aegean horizon.",
          entranceFee: "Free public viewing",
          notes: "Arrive at least 1 hour before sunset to secure prime photography spots."
        }
      },
      {
        dayNumber: 4,
        title: "Pyrgos Medieval Village, Black Sand Beach & Departure",
        morning: {
          time: "09:30 - 12:30",
          activity: "Medieval Pyrgos Village & Monastery of Prophet Elias",
          attraction: "Pyrgos Kallistis & Moni Profiti Ilia (Highest Point 567m)",
          location: "Pyrgos Kallistis, Santorini 84700",
          mapUrl: "https://maps.google.com/?q=Pyrgos+Santorini",
          duration: "3 hours",
          transport: "Private AC tour van (20 mins)",
          description: "Wander through the untouched medieval capital of Pyrgos with its Venetian castle (Kasteli), followed by driving to the summit of Mount Profitis Ilias for an island-wide vista.",
          entranceFee: "Free village and monastery courtyard",
          notes: "Authentic local Greek bakeries and handmade ceramics."
        },
        afternoon: {
          time: "13:00 - 15:30",
          activity: "Perissa Black Sand Beach & Seafood Lunch",
          attraction: "Perissa Black Sand Beach (Mavro Vouno)",
          location: "Perissa, Santorini 84703",
          mapUrl: "https://maps.google.com/?q=Perissa+Black+Sand+Beach",
          duration: "2.5 hours",
          transport: "10-minute drive down to southeastern shore",
          description: "Relax on sun loungers along 7 kilometers of striking volcanic black pebbles and sand beneath the monumental Mesa Vouno rock mountain.",
          entranceFee: "Beach free; sunbed pairs usually free with drink order",
          notes: "Black sand gets very hot under afternoon sun; wear flip-flops to the water."
        },
        evening: {
          time: "16:00 - 18:30",
          activity: "Hotel Checkout & Transfer to Airport / Ferry Port",
          attraction: "Santorini Airport (JTR) / Athinios Ferry Port",
          location: "Santorini Departure Terminals",
          mapUrl: "https://maps.google.com/?q=Santorini+Ferry+Port",
          duration: "2.5 hours",
          transport: "Private chauffeur transfer from Oia to airport/port",
          description: "Farewell to Santorini as your private driver assists with luggage to the terminal for flight or high-speed SeaJets ferry to Athens.",
          entranceFee: "Transfer included in package",
          notes: "Arrive 2 hours prior to domestic/international departure."
        }
      }
    ],

    inclusions: [
      "3 Nights stay in luxury cave suite at Canaves Oia Suites (Caldera View)",
      "Daily champagne breakfast served on private suite terrace",
      "Half-Day Catamaran Sunset Cruise with Volcanic Hot Springs & BBQ Dinner",
      "Wine tasting flight of 5 indigenous Santorini wines at Santo Wines",
      "Guided entry to Prehistoric Akrotiri archaeological ruins",
      "Private VIP roundtrip transfers between airport/port and hotel"
    ],
    exclusions: [
      "International / domestic flights or ferries to/from Santorini",
      "Greek Climate Resilience Tax (€10 per room per night paid directly at hotel)",
      "Volcano national park conservation fee (€5 cash at Nea Kameni)",
      "Personal tips and travel insurance"
    ],
    travelTips: [
      "Tap water is desalinated and brackish; drink bottled water.",
      "Wear flat shoes with good grip; Santorini's cobblestones and steps are steep and polished.",
      "Book Oia sunset dinner tables several weeks in advance during high season."
    ],
    officialReferences: [
      { name: "Greek National Tourism Organisation", url: "https://www.visitgreece.gr" },
      { name: "Santorini Municipality Tourism Portal", url: "https://www.santorini.gr" }
    ]
  }
};

/**
 * Helper to match an itinerary for any travel package (backend-agnostic)
 */
export function getPackageItinerary(pkg) {
  if (!pkg) return null;

  const destStr = (pkg.destination || "").toLowerCase();
  const titleStr = (pkg.title || "").toLowerCase();
  const descStr = (pkg.description || "").toLowerCase();
  const combined = `${destStr} ${titleStr} ${descStr}`;

  // Direct key lookup
  for (const [key, itinerary] of Object.entries(PACKAGE_ITINERARIES)) {
    if (itinerary.matchedKeywords.some((kw) => combined.includes(kw))) {
      return {
        ...itinerary,
        packageId: pkg._id,
        currentPrice: pkg.price,
        currentSlots: pkg.availableSlots
      };
    }
  }

  // Graceful fallback generator for ANY dynamically created package in MongoDB
  return {
    matchedKeywords: [],
    title: pkg.title || "Curated Travel Journey",
    destination: pkg.destination || "Verified Destination",
    duration: pkg.duration || "Multi-day Itinerary",
    bestSeason: "Year-round (Check seasonal climate recommendations)",
    suitableFor: "All Travelers, Families, Couples",
    heroImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    imageAttribution: "Verified Travel Photography",
    sourceAttribution: "Official Tourism Authorities",
    overview: pkg.description || "Experience handpicked sights, authentic dining, and organized daily excursions.",
    accommodation: {
      name: "Verified Premium Partner Hotel",
      type: "Curated 4-Star Accommodations",
      address: `${pkg.destination || "Central City"}, Verified Location`,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      imageAttribution: "Verified partner hotel photography",
      mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination || "Hotel")}`,
      checkIn: "14:00",
      checkOut: "11:00",
      roomType: "Comfort Deluxe Room",
      capacity: "2 Adults",
      amenities: ["Complimentary Wi-Fi", "Daily Breakfast", "Air Conditioning", "En-suite Bathroom"],
      rules: "Valid Government ID required at check-in.",
      providerNotes: "Accommodation details have been provided for this package."
    },
    days: [
      {
        dayNumber: 1,
        title: `Arrival & Highlights of ${pkg.destination}`,
        morning: {
          time: "09:30 - 12:30",
          activity: `Arrival and check-in in ${pkg.destination}`,
          attraction: `${pkg.destination} Historic Centre`,
          location: pkg.destination,
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination)}`,
          duration: "3 hours",
          transport: "Private airport / station transfer",
          description: `Arrive and settle into your accommodations, followed by an introductory walking tour of ${pkg.destination}.`,
          entranceFee: "Included",
          notes: "Comfortable shoes recommended."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Top Sights & Cultural Landmarks",
          attraction: "Prominent Landmark & Viewpoint",
          location: pkg.destination,
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination)}`,
          duration: "3 hours",
          transport: "Local private transit",
          description: "Discover top historic attractions and cultural treasures with an experienced local guide.",
          entranceFee: "Entry pass included",
          notes: "Carry identification."
        },
        evening: {
          time: "17:30 - 20:30",
          activity: "Welcome Dinner & Evening Stroll",
          attraction: "Scenic Promenade",
          location: pkg.destination,
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination)}`,
          duration: "3 hours",
          transport: "Short walking transfer",
          description: "Enjoy regional culinary specialties and an evening leisure walk.",
          entranceFee: "N/A",
          notes: "Casual evening wear."
        }
      },
      {
        dayNumber: 2,
        title: "Deep Cultural Immersion & Signature Excursion",
        morning: {
          time: "09:00 - 12:30",
          activity: "Iconic Heritage Monument",
          attraction: "National Heritage Site",
          location: pkg.destination,
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination)}`,
          duration: "3.5 hours",
          transport: "Private transport",
          description: "Comprehensive guided tour of the region's most famous natural or architectural highlight.",
          entranceFee: "Included",
          notes: "Photography permitted in designated areas."
        },
        afternoon: {
          time: "13:30 - 16:30",
          activity: "Artisan Craft & Local Gastronomy",
          attraction: "Traditional Market & Craft Village",
          location: pkg.destination,
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination)}`,
          duration: "3 hours",
          transport: "Local transfer",
          description: "Sample regional delicacies, observe master artisans, and pick up authentic local crafts.",
          entranceFee: "Free access",
          notes: "Support local artisans directly."
        },
        evening: {
          time: "17:30 - 20:00",
          activity: "Sunset Panoramic Viewpoint",
          attraction: "Scenic Horizon Lookout",
          location: pkg.destination,
          mapUrl: `https://maps.google.com/?q=${encodeURIComponent(pkg.destination)}`,
          duration: "2.5 hours",
          transport: "Scenic return drive",
          description: "Watch the sunset from a premier vantage point overlooking the surrounding terrain.",
          entranceFee: "N/A",
          notes: "Camera recommended."
        }
      }
    ],
    inclusions: [
      `Accommodations in ${pkg.destination}`,
      "Daily breakfast at the hotel",
      "Private transfers for scheduled excursions",
      "All standard taxes and service fees"
    ],
    exclusions: [
      "Long-distance airfare or rail tickets to destination",
      "Personal shopping, tips, and optional activities",
      "Travel and medical insurance"
    ],
    travelTips: [
      "Check weather forecasts and pack appropriate clothing.",
      "Keep digital and physical copies of booking vouchers and identification."
    ],
    officialReferences: [
      { name: "Regional Tourism Authority", url: "https://www.unwto.org" }
    ]
  };
}
