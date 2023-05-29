# Stefan Jordan - Mobile Version

## Built with: 
1. Expo
2. XCode
3. React Native
4. JavaScript
5. Tailwind / Nativewind
6. React-Hook-Form
7. React-Native-Gesture-Handler
8. HeroIcons

## Instructions:
1. Clone this repository to your local machine
2. Open your terminal and navigate to the root directory
3. Run `npm i` to install all dependencies
4. Run `npx expo start` to build the mobile app
5. Follow the directions in the terminal to check it out
    - There should be a QR code to scan with your mobile device
    - You will need to download **Expo Go** on your phone to view the app on your phone or **XCode** on your computer to access a simulated device on your computer


## Notes:
- No apiKey, so I just hard-coded some data for the UI
- Add, Delete, Edit are all updating a state array
- Items are **Pressable** and **Swipeable**
    - Swipe from left to right for Edit functionality
    - Swipe from right to left for Delete functionality
- I implemented Tailwind/Nativewind for styling in a few places, but not throughout
- React Native did not like uuid() to generate unique keys, so I just did a Math.random() * 1000000