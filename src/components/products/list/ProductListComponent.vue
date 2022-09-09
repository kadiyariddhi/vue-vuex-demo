<template>
  <div class="container">
    <div class="row justify-content-center mt-2 mb-2">
      <div class="col-8">
        <h4 class="text-left mb-2">All Products</h4>
      </div>
      <div class="col-4">
        <input
          type="text"
          class="form-control"
          placeholder="Search Products..."
          @input="searchProducts"
          v-model="query.title"
        />
      </div>
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-1">Sl</div>
          <div class="col-3">Product Title</div>
          <div class="col-3">Description</div>
          <div class="col-3">Status</div>
          <div class="col-2">Actions</div>
        </div>

        <div v-for="(item, index) in productsPaginatedData.products" :key="item.id">
          <Product-detail :index="index" :product="item" />
        </div>
      </div>

      <div v-if="isLoading" class="text-center mt-5 mb-5">
        Loading Products...
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Insert Pagination Part -->
    <div v-if="productsPaginatedData !== null" class="vertical-center mt-2 mb-5">
      <v-pagination
        v-model="query.page"
        :pages="productsPaginatedData.pagination.total_pages"
        :range-size="2"
        active-color="#DCEDFF"
        @update:modelValue="getResults"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductDetail from "../list/ProductDetail";
import VPagination from "@hennge/vue3-pagination";

export default {
  data() {
    return {
      query: {
        page: 1,
        title: ''
      },
    };
  },
  components: {
    ProductDetail,
    VPagination
  },
  computed: { ...mapGetters(["productList", "productsPaginatedData", "isLoading"]) },
  methods: {
		...mapActions(["getAllProducts"]),

    getResults() {
      this.getAllProducts(this.query);
    },

    searchProducts() {
      this.getAllProducts(this.query);
    },
  },

	created() {
    this.getAllProducts(this.query);
  }
};
</script>
