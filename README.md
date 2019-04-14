# ofunk

ofunk is a desktop application that makes creating video memes, video slideshows and applying simple affects simple and easy.

It's free and it's open source.

## disclaimer

This is a proof of concept project. So this is poorly maintend atm, your mileage may vary trying to get it up and running.

### App Structure

```
src/
../main/ - is the main gui rendering and bg processes for the app
../gui/` - is the ui portion of the app
```

### To build

1.  `npm install`
2.  `brew install ffmpeg --with-freetype` - needed to create final video outputs.

### To run

1.  In one terminal, run `npm start`. This fires up electron.
2.  In another terminal, run `npm run start:ui`. This fires up the ui dev enviroment with all its hot reloading goodness.

Notes to self:
use https://github.com/foliojs/font-manager to get fonts on the gui side...
