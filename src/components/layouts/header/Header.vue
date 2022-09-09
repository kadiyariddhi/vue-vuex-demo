<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand"># Advance Vue CRUD </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/products" class="nav-link">
            <i class="fa fa-shopping-cart"></i>
            Products
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products/create" class="nav-link">
            <i class="fa fa-plus-circle"></i> Add
          </router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>
