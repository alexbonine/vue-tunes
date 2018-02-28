<template>
  <v-app>
    <header>
      <v-toolbar fixed app color='primary'>
        <v-toolbar-items>
          <v-btn flat nuxt to='/' append exact class='white--text'>Analyze</v-btn>
          <v-btn flat nuxt to='/build' append exact class='white--text'>Build</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </header>
    <nuxt></nuxt>
  </v-app>
</template>
<style>

</style>
