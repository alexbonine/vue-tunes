<template>
  <div class='playlists' v-if='playlistsData.items.length > 0'>
    <h1 class='header text-center'>Select a playlist</h1>
    <div class='playlists-header green--text'>
      <p class='image text-bold' />
      <p class='name text-bold'>Name</p>
      <p class='tracks text-bold text-center'>Tracks</p>
      <p class='public text-bold text-center'>Public</p>
      <p class='link text-bold text-center'>Open</p>
    </div>
    <ul class='playlists-container'>
      <li class='playlist' v-for='playlist in playlistsData.items' :key='playlist.id' v-on:click='choosePlaylist' :data-playlist-id='playlist.id'>
        <a class='playlist-info image' v-on:click.stop :href='playlist.images[0].url' target='_blank'><img :src='playlist.images[2].url' alt='Playlist image to open playlist image' /></a>
        <p class='playlist-info name'>{{ playlist.name }}</p>
        <p class='playlist-info tracks text-center'>{{ playlist.tracks.total }}</p>
        <p class='playlist-info public text-center'>{{ playlist.public | yesNo }}</p>
        <a class='playlist-info link text-center' v-on:click.stop :href='playlist.external_urls.spotify' target='_blank'><img src='~/assets/svgs/headphones.svg' alt='Headphones to open playlist link' /></a>
      </li>
    </ul>
    <div class='playlist-pagination text-center'>
      <v-pagination :length='playlistsData.totalPages' :value='playlistsData.currentPage' v-on:input='clickPlaylists' total-visible='10' circle></v-pagination>
    </div>
  </div>
  <div class='playlists empty text-center' v-else>
    <h3>No playlists found to analyze</h3>
  </div>
</template>
<script>
import Actions from '~/store/actions';

export default {
  name: 'playlists',
  methods: {
    choosePlaylist (evt) {
      const id = evt.currentTarget.dataset.playlistId;
      this.$store.dispatch(Actions.setPlaylistId, id);
    },
    clickPlaylists (newPage) {
      if (newPage > this.playlistsData.currentPage) {
        this.$store.dispatch(Actions.nextPlaylists);
      } else {
        this.$store.dispatch(Actions.previousPlaylists);
      }
    },
  },
  props: [
    'playlistsData'
  ],
}
</script>
<style scoped>
:root {
  --primary-color: #4CAF50;
  --secondary-color: #FAFAFA;
}

.playlists {
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  margin-top: 20px;
  margin-bottom: 10px;
}

.playlists-container {
  overflow: auto;
}

.playlists-header {
  display: flex;
  border-bottom: 2px solid var(--primary-color);
  flex-shrink: 0;
  padding: 0 0 5px 0;
}

.playlists-header p {
  padding: 0 5px;
}

.playlist {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  height: 60px;
  border-bottom: 1px solid var(--primary-color);
}

.playlist:last-child {
  border-bottom: none;
}

.playlist:hover {
  opacity: .7;
  cursor: pointer;
}

.playlist-info {
  padding: 5px;
}

.image {
  margin-left: 10px;
  margin-right: 10px;
  width: 60px;
}

.image.playlist-info {
  height: 60px;
}

.image img {
  width: 50px;
}

.name {
  flex: 1 1 auto;
}

.tracks {
  flex-basis: 10%;
}

.public {
  flex-basis: 10%;
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.link img {
  height: 36px;
}

.playlist-pagination {
  margin-top: 10px;
  margin-bottom: 20px;
}

.empty {
  justify-content: center;
}
</style>
