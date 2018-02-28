<template>
  <playlists :playlistsData='playlistsData'></playlists>
</template>
<script>
import { mapState } from 'vuex';
import Actions from '~/store/actions';
import playlists from '~/components/spotify/playlists';

export default {
  name: 'anaylyze',
  components: {
    playlists,
  },
  props: [
    'playlistsData'
  ],
}
</script>
