<template>
  <section v-if='accessToken' class='one-page-container'>
    <anaylze :playlistsData='playlistsData'></anaylze>
  </section>
  <section v-else class='one-page-container text-center'>
    <div>
      <h1>Uh oh!</h1>
      <h3 v-if='authError'>There was an issue logging you in. Click below to try again.</h3>
      <h3 v-else>Playlist analysis requires you to be logged into Spotify. Click below to be redirected to Spotify login.</h3>
      <div>
        <v-btn
          color='primary'
          v-on:click.prevent='login'
          >
            Login to Spotify
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { useLocalAccessToken, getMe, getUserPlaylists, login, verifyLogin } from '../services/spotify';
import Actions from '~/store/actions';
import anaylze from '~/components/analyze/parent';

export default {
  components: {
    anaylze,
  },
  computed: mapState({
    accessToken: (state) => state.accessToken,
    authError: (state) => state.authError,
    playlistsData: (state) => state.playlistsData,
  }),
  // async fetch ({ store }) {
  //   if (store.state.accessToken) {
  //     const playlists = await getUserPlaylists();
  //     store.dispatch(Actions.setUserPlaylists, playlists);
  //   }
  // },
  methods: {
    login,
  },
  async beforeMount () {
    if (window.location.hash.length > 0) {
      const accessToken = verifyLogin(window);

     if (accessToken) {
        await this.$store.dispatch(Actions.setAccessToken, accessToken);
        // const response = await axios.post('/api/register', accessToken);
        window.location.replace(process.env.baseUrl);
      } else {
        this.$store.dispatch(Actions.setAuthError);
      }
    } else {
      const accessToken = useLocalAccessToken();

      if (accessToken) {
        await this.$store.dispatch(Actions.setAccessToken, accessToken);
        const [playlistsData, userId] = await Promise.all([getUserPlaylists(), getMe()]);
        this.$store.dispatch(Actions.setPlaylistsData, playlistsData);
        this.$store.dispatch(Actions.setUserId, userId);
      }
    }
  },
}
</script>

<style scoped>

</style>
