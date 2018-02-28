import Vuex from 'vuex';
import Actions from './actions';
import { getPlaylistTracks, getUserPlaylists } from '~/services/spotify';

const store = () => new Vuex.Store({
  state: {
    accessToken: null,
    authError: false,
    playlistsData: { items: [], limit: 20, offset: 0, total: 0 },
    playlistTracks: [],
    selectedPlaylistId: '',
    userId: '',
  },
  mutations: {
    [Actions.setAccessToken] (state, accessToken) {
      state.accessToken = accessToken;
      state.authError = false;
    },
    [Actions.setAuthError] (state) {
      state.accessToken = null;
      state.authError = true;
    },
    [Actions.setPlaylistsData] (state, playlistsData) {
      state.playlistsData = { ...state.playlistsData, ...playlistsData };
    },
    [Actions.setPlaylistTracks] (state, playlistTracks) {
      state.playlistTracks = playlistTracks;
    },
    [Actions.setSelectedPlaylistId] (state, playlistId) {
      state.selectedPlaylistId = playlistId;
    },
    [Actions.setUserId] (state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    // nuxtServerInit ({ commit }, { req, route }) {
    //   if (req.session && req.session.accessToken) {
    //     commit(Actions.setAccessToken, req.session.accessToken);
    //   }
    // },
    [Actions.setAccessToken]({ commit }, accessToken) {
      commit(Actions.setAccessToken, accessToken);
    },
    [Actions.setAuthError]({ commit }) {
      commit(Actions.setAuthError);
    },
    [Actions.setPlaylistsData]({ commit }, playlistsData) {
      commit(Actions.setPlaylistsData, playlistsData);
    },
    [Actions.setUserId]({ commit }, userId) {
      commit(Actions.setUserId, userId);
    },
    async [Actions.setPlaylistId]({ commit, state }, playlistId) {
      await commit(Actions.setSelectedPlaylistId, playlistId);
      const playlistTracks = await getPlaylistTracks(state.userId, playlistId);
      commit(Actions.setPlaylistTracks, playlistTracks);
    },
    async [Actions.nextPlaylists]({ commit, state }) {
      const playlistsData = await getUserPlaylists(state.playlistsData.offset + state.playlistsData.limit, state.playlistsData.limit);
      commit(Actions.setPlaylistsData, playlistsData);
    },
    async [Actions.previousPlaylists]({ commit, state }) {
      const playlistsData = await getUserPlaylists(state.playlistsData.offset - state.playlistsData.limit, state.playlistsData.limit);
      commit(Actions.setPlaylistsData, playlistsData);
    },
  },
});

export default store;
