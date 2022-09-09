<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Edit Product</h6>
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div v-if="isLoading">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <br />
              Loading Product Details
            </div>
          </div>
          <div v-if="product !== null && !isLoading">
            <div class="form-group row">
              <div class="col-6">
                <label>Product Title:</label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  class="form-control"
                  :value="product.title"
                />
                <ErrorMessage name="title" class="text-danger" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-6">
                <label>Product Description:</label>
                <Field
                  name="description"
                  as="textarea"
                  class="form-control"
                  :value="product.description"
                />
                <ErrorMessage name="description" class="text-danger" />
              </div>
            </div>
            <div class="form-group">
              <router-link to="/products" class="btn btn-secondary mr-2"
                >Cancel</router-link
              >
              <input
                type="submit"
                class="btn btn-primary"
                value="Save Update"
                v-if="!isUpdating"
              />
              <button
                class="btn btn-primary"
                type="button"
                disabled
                v-if="isUpdating"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
import * as yup from "yup";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailProduct(this.id);
  },

  computed: { ...mapGetters(["product", "isLoading"]) },

  methods: {
    ...mapActions(["fetchDetailProduct"]),
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().label("Title").required().min(5),
      description: yup.string().label("Description").required().min(5),
    });

    return {
      schema,
    };
  },
};
</script>

<style>
</style>