# Champilove Install guidelines

## Install Node and npm
```bash
apt update
apt install nodejs npm
npm -g install npm # Update npm
```

## Create new project
```bash
npm install -g expo-cli # Install Expo (Expo est un outil de développement permettant de créer des applications React Native)
cd ./parent-dir
expo init Champilove
```
Sur votre smartphone, installer l'application Expo disponible sur l'AppStore et sur le PlayStore

## Clone repository
```bash
git clone git@gitlab.com:grosclara/champilove.git
```

## Install npm dependencies
```bash
cd ./champilove
npm install
```

## Run project
```bash
cd ./champilove
npm start # You can open iOS, Android, or web from here, or run rhem directly with the commands below
npm run android
npm run iOS
npm run web
```

