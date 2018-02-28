<template>
  <div class='one-page-container text-center'>
    <div>
      <h1 v-if='error.statusCode === 404' class='title green-text text-darken-2'>Page not found. Dealbreaker!</h1>
      <h1 v-else class='title'>Blergh! An error occurred</h1>
      <img class='lemur-img' src='https://upload.wikimedia.org/wikipedia/commons/c/cf/Ringtailed_lemurs.jpg' title='By Keven Law from Los Angeles, USA - Flickr, CC BY-SA 2.0, https://commons.wikimedia.org/w/index.php?curid=6180475'>
      <div>
        <nuxt-link class='button--green' to='/'>Home page</nuxt-link>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  // layout: 'blog' // you can set a custom layout for the error page
}
</script>
<style>
.title {
  font-size: 60px;
  letter-spacing: 1px;
}

.lemur-img {
  padding: 30px 0;
  width: 750px;
}
</style>