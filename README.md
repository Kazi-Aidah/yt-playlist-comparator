# yt-playlist-comparator
Compare two YouTube playlists and find missing videos, with results saved to a text file.


# Prerequisites

### Before running this script, make sure you have Node.js and npm
- Install from: https://nodejs.org/
- To check if installed:
```
  node -v
  npm -v
```

### Google APIs Client Library for Node.js
```
    Install via npm (inside your project folder):
    npm install googleapis
```

### How to Get a YouTube Data API Key (Simplified)
- Go to: https://console.cloud.google.com/
- Create a project
- From the left menu, go to “APIs & Services” → “Library”.
- Search for YouTube Data API v3 and click Enable.
- Go to “Credentials” → click “Create Credentials” → “API key”.
- Copy your API key (DO NOT EXPOSE YOUR API KEY)

## Using the Script
- Download the compare_playlists.js
- I like placing it inside a folder (Because after running the code, you'll have a text file with the missing links.)
- Right Click on the compare_playlists.js and click on "Edit"
- Paste the API Key you copied it into the script at,
```
    const API_KEY = 'PASTE-THE-API-KEY-HERE';
```
- Replace the playlist IDs at the bottom of the script:
```
const playlist1 = 'YOUR_FIRST_PLAYLIST_ID';
const playlist2 = 'YOUR_SECOND_PLAYLIST_ID';
```
!!! The ID is the part after ?list= in a playlist URL.
- Save the compare_playlists.js
- Go to the Folder you have the js file in
- Click on the File Location thingy at the top (Something like C:Downloads/Folder)
- Type "cmd" there and a Command Prompt will open
- Run "node compare_playlists.js"
- If there are missing links, it'll show up in the Command Prompt and you should also check the Folder to find missing_videos.txt

