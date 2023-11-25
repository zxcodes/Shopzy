# Shopzy Mobile App

### Technical Details

- This app has been bootstrapped with Expo TypeScript (https://expo.dev)

# Run this app (development):

- Clone the repo HTTPS:

```
git clone https://github.com/zxcodes/Shopzy.git

```

- Clone Over SSH:

```
git clone git@github.com:zxcodes/Shopzy.git
```

## Install dependencies

```
cd Shopzy && yarn install
```

## To install any expo dependency use yarn package manager:

- Example (add --yarn flag at the end to force yarn usage):

```
npx expo install expo-av --yarn
```

## Running on a simulator (or) emulator:

- Start the development server after installing dependencies via `yarn install`

```
yarn run ios || yarn run android
```

## Running on a physical device:

- Start the development server after installing dependencies via `yarn install`

```
yarn start
```

- Download the Expo Go App and scan the QR Code from the terminal. On iOS, scan the QR Code from the inbuilt scanner or the native Camera App.

- Expo Go Android App: https://play.google.com/store/apps/details?id=host.exp.exponent

- Expo Go iOS App: https://apps.apple.com/us/app/expo-go/id982107779

## 2. Commit rules:

- Lint files before committing changes.

```
yarn lint
```

## IMPORTANT:

- Commit messages should be descriptive & task-related. Don't do: (changes done, fixed bug, etc.)
