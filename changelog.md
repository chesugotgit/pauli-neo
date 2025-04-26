# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## **[1.4.2] 04-26-2025**
### [Added]
- **Quickly added an account page**
  - Realized I didn't add it.

## **[1.4.1] 04-26-2025**
### [Changes]
- Move `index.html` to highest level.

## **[1.4.0] 04-26-2025**
### [Added]
- **[Experimental] Mood Tracker Function**
  - Uses the user's webcam and `face-api.js` to detect moods based on the user's face.
  - Logs these moods to the browser's storage.
- **Calculator Functions**
  - Added functions to the calculator cards through the use of `math.js`.
- **GPA Calculator Functions**
  - Added functions to the GPA calculator through by adopting functions of `math.js`.

### [Changes]
- **Improved Landing Page**
  - No longer uses absolute positioning.
  - Still needs some fixing on smaller devices.
- **Polished Lesson Plans Feature**
  - Fleshed out the feature to include actual functions.
- Changes to several JavaScript files to improve stability and to add more features.

### [Deprecated]

### [Removed]

### [Fixed]

### [Security]

### [Extra Notes]
- Many changes made were not carefully tracked due to time constraints.
- ICIA Global Round 2025.

## **[1.3.0] 04-19-2025**
### [Added]
- **Added Experiments Button**
  - Toggle for showing experimental features.
  - Experimental features are hidden when disabled, and shown when enabled.
- **[Experimental] Mental Health Management Page**
  - Added a specific page for features specifically for managing mental health.
  - Currently experimental as all functions are placeholders, and existing functions are extremely unstable.

### [Changes]
- **Improved Back Function**
  - Pages no longer need to redirect back to `index.html` every time.
    - Stores current page and moves it to an index when changing pages.
    - Back buttons now redirect to the last visited page instead of returning to `index.html`.
    - Fallbacks to returning to `index.html` if the index is empty or doesn't exist.

### [Deprecated]

### [Removed]

### [Fixed]
- Fixed the issue where transitioning from any page back to `index.html` would break the fade animation.

### [Security]

### [Extra Notes]
- Now all of the foundations for adding functions are laid.
- I'm going to start adding functions soon, slowly and surely all of these cards will have a function tied to them.
- Unfortunately, what exists on the pages now will be final. I do not plan on adding more.
- Experimental features will be added when they are stable enough for usage.
- Next update will be full release.

## **[1.2.1] 04-14-2025**
### [Added]
- **Added Placeholder Functions to select Features**
  - Modals
    - Used for simpler, quick-action tools.
  - Side Panel
    - Tools that benefit from being accessible alongside main content.
  - Page Redirect
    - For more complex, feature-rich applications.
- **[Experimental] Settings Page**
  - Added a dynamic settings page for customizing the website globally.
    - Not tested yet and is currently functionless.
    - Automatically adds sections depending on data added to LocalStorage.
- **[Experimental] User Account**
  - Added a simple LocalStorage account system
    - Saves data to the browser through LocalStorage.
    - Not very safe, but works in this use case.

### [Changes]
- **Changed Page Redirect Transition Functionality**
  - More dynamic and should work better.

### [Deprecated]

### [Removed]

### [Fixed]

### [Security]

### [Extra Notes]
- The foundation for adding functions is now placed. This will make it to add functions easier in the future.
- This is also where the real trouble starts, currently these are placeholders. Actual functions will be added later.
- Also, I'm pretty sure I'm considered a Vibe Coder now. Seriously, Use AI.
- Yes, I'm also keeping the comments left by the AI I'm using.

## **[1.1.0] 04-10-2025**
### [Added]
- Added Pages
  - Student Toolkit
  - General Resources
  - Teacher Dashboard
- More Interactions
  - Added more animations.
    - Redirect Animations

### [Changes]
- Landing Page
  - Changed Main text to a fitting SVG Icons (from Heroicons).
  - Fixed transition animations for redirecting.
  - Made animations smoother.

### [Deprecated]

### [Removed]

### [Fixed]

### [Security]

### [Extra Notes]
- Many changes this time around, finally found some time and motivation to continue working on this project.
- Thanks to some YouTube videos, I found some inspiration for the modern design of the pages.
- Many more features coming, including adding more tools and actually making them function.

## **[1.0.1] 03-26-2025**
### [Added]

### [Changes]

### [Deprecated]

### [Removed]

### [Fixed]

### [Security]

## **[1.0.0] 03-26-2025**
### [Added]
- Initial Commit
  - Added initial files.
- Better Landing Page

### [Changes]
- Landing Page
  - Style Changes for a more modernized look.
- Upgrade Tailwind CSS version
  - From `v3.14.7` to `v4.0`.

### [Deprecated]

### [Removed]

### [Fixed]

### [Security]