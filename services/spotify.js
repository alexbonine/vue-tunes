import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const CLIENT_ID = '3654e1bc34e744b0b746a5860a639b0d';
const REDIRECT_URI = `${process.env.baseUrl}`;
const SCOPE = 'user-read-private user-read-email';
const SPOTIFY_URL = 'https://accounts.spotify.com/authorize';
const STATE_KEY = 'spotify_auth_state';
const ACCESS_TOKEN_KEY = 'temp_spotify_auth';
const ACCESS_TOKEN_PARAM = 'access_token';
const ACCESS_TOKEN_EXPIRATION_KEY = 'temp_spotify_auth_expiration';
const ACCESS_TOKEN_EXPIRATION_PARAM = 'expires_in';
const STATE_PARAM = 'state';

export const useLocalAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiration = localStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY);
  const current = new Date().getTime();

  if (token && current < parseInt(expiration, 10)) {
    spotifyApi.setAccessToken(token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY);
  }

  return token || null;
};

const getHashParams = (win) => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = win.location.hash.substring(1);
  
  while (e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getExpiration = (seconds) => {
  const current = new Date();
  return current.getTime() + (seconds * 1000);
};

export const verifyLogin = (win) => {
  const params = getHashParams(win);
  const localState = localStorage.getItem(STATE_KEY);

  if (params[ACCESS_TOKEN_PARAM] && params[STATE_PARAM] === localState) {
    localStorage.setItem(ACCESS_TOKEN_KEY, params[ACCESS_TOKEN_PARAM]);
    localStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, getExpiration(params[ACCESS_TOKEN_EXPIRATION_PARAM]));
    spotifyApi.setAccessToken(params[ACCESS_TOKEN_PARAM]);
    return params[ACCESS_TOKEN_PARAM];
  } else {
    return null;
  }
}

// const openSpotifyPopup = (url) => {
//   const params = 'location:0,status=0,width=400,height=300';
//   const win = window.open(url, 'Login to Spotify', params);

//   const interval = window.setInterval(() => {
//     if (!win || win.closed) {
//       window.clearInterval(interval);
//       checkRedirectURI(win);
//     }
//   }, 1000);
// };

export const login = () => {
  var state = generateRandomString(16);
  localStorage.setItem(STATE_KEY, state);

  const url = `${SPOTIFY_URL}?response_type=token&client_id=${encodeURIComponent(CLIENT_ID)}&scope=${encodeURIComponent(SCOPE)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${encodeURIComponent(state)}`;
  // openSpotifyPopup(url);
  window.location = url;
};

export const getUserPlaylists = (offset = 0, limit = 20) => {
  return spotifyApi.getUserPlaylists({ offset, limit })
    .then(({ items, limit: newLimit, offset: newOffset, total } = {}) => {
      return {
        currentPage: Math.ceil(newOffset / limit) + 1,
        items,
        limit: newLimit,
        offset: newOffset,
        total,
        totalPages: Math.ceil(total / limit),
      };
    })
    .catch((err) => {
      // show error
    });
}

export const getMe = () => {
  return spotifyApi.getMe()
    .then(({ id } = {}) => {
      return id;
    })
    .catch(() => {
      // show error?
    });
};

export const getPlaylistTracks = (userId, playlistId, offset = 0, limit = 100) => {
  let tracks = [];
  return spotifyApi.getPlaylistTracks(userId, playlistId, { offset, limit })
    .then(({ items, limit: newLimit, offset: newOffset, total }) => {
      tracks = tracks.concat(items);
      
      if (tracks.length < total) {
        return spotifyApi.getPlaylistTracks(userId, playlistId, { offset: newOffset + newLimit, limit: newLimit });
      } else {
        return tracks;
      }
    })
    .catch(() => {
      // show error
    });
};

export default spotifyApi;
