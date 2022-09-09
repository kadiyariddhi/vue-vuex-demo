<template>
  <div class="row border-1 p-2">
    <div class="col-1 text-left">{{ index + 1 }}</div>
    <div class="col-3">{{ product.title }}</div>
    <div class="col-3">{{ product.description }}</div>
    <div class="col-3">{{ product.published ? 'Active' : 'Inactive' }}</div>
    <div class="col-2">
      <router-link
        :to="{ name: 'ProductEdit', params: { id: product.id } }"
        class="btn btn-primary"
        title="Edit Product"
        >
        <i class="fa fa-pencil"></i></router-link
      >
      <button class="btn btn-danger ml-2" @click="deleteProductModal(product.id)" title="Delete Product">
         <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ProductDetail",
  props: {
    product: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },

  computed: { ...mapGetters(["isDeleting", "deletedData"]) },

  methods: {
    ...mapActions(["deleteProduct", "getAllProducts"]),
    deleteProductModal(id) {
      console.log(id)
      this.$swal
        .fire({
          text: "Are you sure to delete the product ?",
          icon: "error",
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes, Confirm Delete",
          showCancelButton: true,
        })
        .then((result) => {
          if (result["isConfirmed"]) {
            // delete logic
            this.deleteProduct(id);
            this.getAllProducts({
              page: 1,
              title: ''
            });
          }
        });
    },
  },
};
</script>
