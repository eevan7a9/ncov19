<template>
  <b-navbar
    id="navbar"
    :sticky="true"
    toggleable="lg"
    type="dark"
    variant="danger"
  >
    <div class="container">
      <b-navbar-brand href="/" class="font-weight-bold">Ncov19</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" class="text-capitalize">home</b-nav-item>
          <b-nav-item to="/about" class="text-capitalize">about</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <!-- <b-nav-item to="/item" class="text-capitalize">item</b-nav-item> -->
          </b-navbar-nav>
          <!-- Searchbar starts -->
          <SearchBar />
          <!-- Searchbar ends -->
          <!--
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import SearchBar from '@/components/SearchBar'
export default {
  name: 'TopNavbar',
  components: {
    SearchBar
  }
}
</script>

<style scoped>
#navbar {
  z-index: 1021 !important;
}
a.nav-link.nuxt-link-exact-active {
  color: rgb(255, 255, 255);
}
</style>
