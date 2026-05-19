# 🍺 Drunk Strava

A friends-only night-out tracker. Like Strava, but the activity is going out drinking.

**GitHub:** https://github.com/revaix7/drunk-strava

---

## 📱 Quick Start

### Prerequisites
- **Node.js** (v20+) — https://nodejs.org/
- **Expo Go app** on your phone (iPhone/Android) — Download from App Store or Play Store
- **Git** — https://git-scm.com/download/win

### Installation

```bash
cd C:\Users\xvrma\OneDrive\Bureau\Coding\Project\Strava
npm install
```

### Run the App

```bash
npx expo start
```

Then:
1. **On your phone:** Open Expo Go app
2. **Scan the QR code** shown in the terminal
3. **App loads instantly** on your phone
4. **File changes reload automatically** (press `r` in terminal to manually reload)

---

## 🎯 What It Does (Phase 1)

### ✅ Tracking Core (Live)
- **Start tracking** → GPS + accelerometer
- **Live map** shows your walking path in real-time
- **Stats display:**
  - ⏱️ Elapsed time
  - 📍 Total distance (km)
  - 🌀 Sway score (0-100, drunkness metric)
- **Stop & save** → Stores night to phone locally
- **View past nights** → Full map, stats, timestamps

### 🔄 Features Coming Soon (Phases 2-6)
- **Phase 2:** Supabase cloud sync + auth (sign in with email)
- **Phase 3:** BAC slider + bar checkpoints (detect where you stopped)
- **Phase 4:** Friends + feed (see friends' nights, reactions)
- **Phase 5:** Leaderboards (slowest stumble, most bars, sway records)
- **Phase 6:** Polish, notifications, background tracking

---

## 🗂️ Project Structure

```
drunk-strava/
├── app/                    # Screen files (tab-based routing)
│   ├── (tabs)/
│   │   ├── index.tsx       # Home - start night & night list
│   │   ├── feed.tsx        # Friends' nights (Phase 4)
│   │   ├── leaderboards.tsx # Rankings (Phase 5)
│   │   └── profile.tsx     # User profile (Phase 2)
│   └── night/
│       ├── tracking.tsx    # Active tracking screen
│       └── [id].tsx        # View saved night details
├── components/             # Reusable UI
│   ├── NightCard.tsx       # Night list item
│   ├── MapView.tsx         # Map component
│   ├── StatBlock.tsx       # Stat display
│   └── BACSlider.tsx       # BAC input (Phase 3)
├── lib/                    # Core logic
│   ├── tracking.ts         # GPS service
│   ├── sway.ts             # Accelerometer sway scoring
│   ├── geometry.ts         # Distance calculations
│   ├── db.ts               # SQLite local storage
│   └── supabase.ts         # Cloud sync (Phase 2)
├── stores/                 # State management (Zustand)
│   ├── nightStore.ts       # Current night being tracked
│   ├── authStore.ts        # User auth (Phase 2)
│   └── friendsStore.ts     # Friends list (Phase 4)
├── types/                  # TypeScript types
│   └── index.ts            # User, Night, GeoPoint, etc.
├── constants/              # App config
│   └── theme.ts            # Colors, spacing, typography
├── App.tsx                 # Root navigation setup
└── package.json            # Dependencies
```

---

## 🚀 How to Use

### 1️⃣ Start a Night

1. Open app on your phone
2. Tap **"Start Night"** (green button)
3. App requests location permission → **tap "Allow"**
4. Tap **"Start Night"** again on tracking screen
5. **Leave your phone in your pocket** — it tracks GPS in background

### 2️⃣ Watch Your Path

- **Map updates live** as you walk
- **Time, distance, sway score** update every few seconds
- Phone uses **low-power GPS** to save battery
- Works even with **screen off**

### 3️⃣ End the Night

1. Tap **"Stop & Save"** (red button)
2. Night saves to your phone
3. Redirected to **night detail screen**
4. See full map + stats
5. Tap back to home → **night appears in list**

### 4️⃣ View Past Nights

- **Home screen** shows all nights, newest first
- Tap any night → **full map + details**
- **Swipe back** to return to list

---

## 📊 Understanding the Stats

| Stat | What It Means | Example |
|------|---------------|---------|
| **Distance** | How far you walked | 2.5 km |
| **Time** | How long you were tracking | 2h 15m |
| **Sway Score** | Drunk-ness metric (0-100) | 42 = moderate |

### Sway Score Explained
- Uses your phone's **accelerometer** (motion sensor)
- Measures **body movement variance**
- Higher = more "sway" = appears more drunk
- **Not a real BAC measurement** — just for fun
- Will improve in Phase 3 with manual BAC slider

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Language | **TypeScript** | Type safety |
| Mobile | **React Native** + **Expo** | One codebase, iOS + Android |
| Navigation | **React Navigation** | Simple, stable |
| Maps | **react-native-maps** + Mapbox | Free, looks great |
| Location | **expo-location** | Background GPS |
| Sensors | **expo-sensors** | Accelerometer for sway |
| Storage | **expo-sqlite** | Offline-first, local |
| State | **Zustand** | Simple state management |
| Backend | **Supabase** | Coming in Phase 2 |

---

## 🔧 Troubleshooting

### App won't load on phone
```bash
# Clear cache and restart
npx expo start --clear
# Then press 'r' in terminal to reload
```

### Location not tracking
- Check phone settings: Settings → Drunk Strava → Location → **Allow "While Using"**
- On iPhone: Allow background location (Settings → Privacy → Location)

### Battery draining fast
- This is normal for background GPS
- Sway score can be disabled to save power (future phase)
- Phone switches to lower accuracy when stationary

### "Cannot read property 'useContext' of null"
```bash
npm install --legacy-peer-deps
npm start -- --clear
```

---

## 🧪 Testing on Emulator

**Android Emulator:**
```bash
npx expo start
# Press 'a' in terminal
```

**iOS Simulator (Mac only):**
```bash
npx expo start
# Press 'i' in terminal
```

---

## 📦 Installation from GitHub

```bash
git clone https://github.com/revaix7/drunk-strava.git
cd drunk-strava
npm install --legacy-peer-deps
npx expo start
```

---

## 📝 Development Notes

### Adding to Your Friends' Phones
- Share the GitHub link: https://github.com/revaix7/drunk-strava
- Friends install locally, run `npx expo start`
- They scan **your QR code** in their Expo Go app
- Phase 2 will add cloud sync so everyone sees the same data

### Clearing Local Data
```bash
# Deletes all saved nights from your phone
# (SQLite database)
rm -rf ~/.expo
```

### Rebuilding After Dependency Changes
```bash
npm install --legacy-peer-deps
npm start -- --clear
```

---

## 🎯 Roadmap

| Phase | Status | Features |
|-------|--------|----------|
| **1. Tracking Core** | ✅ Done | GPS, maps, sway, local storage |
| **2. Auth + Cloud** | 🔄 Next | Supabase, sign in, sync nights |
| **3. BAC + Bars** | ⏳ Planned | BAC slider, checkpoint detection |
| **4. Friends** | ⏳ Planned | Add friends, feed, reactions |
| **5. Leaderboards** | ⏳ Planned | Weekly rankings, achievements |
| **6. Polish** | ⏳ Planned | Notifications, background mode, sharing |

---

## 🤝 Contributing

Want to add a feature? Edit the relevant file and test:
```bash
npx expo start
# Scan QR code on phone
# Changes reload automatically
```

---

## 📞 Support

- **Issues:** Open on GitHub: https://github.com/revaix7/drunk-strava/issues
- **Questions:** Check the troubleshooting section above

---

## 📄 License

Personal use only (not yet open source).

---

**Happy tracking! 🚀🍺**
