const { google } = require('googleapis');
const fs = require('fs');

// Your actual YouTube API Key
const API_KEY = ''; // <----- Put the API Key between ''

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});

// Get all video IDs from a playlist
async function getVideoIdsFromPlaylist(playlistId) {
  let videoIds = [];
  let nextPageToken = '';
  
  do {
    const res = await youtube.playlistItems.list({
      part: 'contentDetails',
      maxResults: 50,
      playlistId,
      pageToken: nextPageToken
    });

    res.data.items.forEach(item => {
      videoIds.push(item.contentDetails.videoId);
    });

    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);

  return videoIds;
}

// Fetch the titlename of a playlist
async function getPlaylistTitle(playlistId) {
  const res = await youtube.playlists.list({
    part: 'snippet',
    id: playlistId
  });

  return res.data.items.length > 0
    ? res.data.items[0].snippet.title
    : `Unknown Playlist (${playlistId})`;
}

// Compare playlists
async function comparePlaylists(playlistId1, playlistId2) {
  const [title1, title2] = await Promise.all([
    getPlaylistTitle(playlistId1),
    getPlaylistTitle(playlistId2)
  ]);

  const ids1 = new Set(await getVideoIdsFromPlaylist(playlistId1));
  const ids2 = new Set(await getVideoIdsFromPlaylist(playlistId2));

  const onlyIn1 = [...ids1].filter(id => !ids2.has(id));
  const onlyIn2 = [...ids2].filter(id => !ids1.has(id));

  let output = '';

  output += `📹 Videos in "${title1}" but not in "${title2}":\n`;
  onlyIn1.forEach(id => {
    const url = `https://www.youtube.com/watch?v=${id}`;
    output += url + '\n';
    console.log(url);
  });

  output += `\n📹 Videos in "${title2}" but not in "${title1}":\n`;
  onlyIn2.forEach(id => {
    const url = `https://www.youtube.com/watch?v=${id}`;
    output += url + '\n';
    console.log(url);
  });

  // Save to text file
  fs.writeFileSync('missing_videos.txt', output);
  console.log('\n✅ Results saved to missing_videos.txt');
}

// Replace inside '' with your playlist IDs
const playlist1 = 'PLJYnzg7Cheug5Fef9n_Sxa74WLAWJEVo5'; // Playlist 1
const playlist2 = 'PLJYnzg7Cheugz3JzxOIkcKNwVmVvwoObd'; // Playlist 2

// Run it
comparePlaylists(playlist1, playlist2).catch(console.error);
