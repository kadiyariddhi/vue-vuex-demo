<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h6>Add Product</h6>
      </div>
      <div class="card-body">
        <Form @submit="onSubmit" :validation-schema="schema">
          <div class="form-group row">
            <div class="col-6">
              <label>Product Title:</label>
              <Field
                id="title"
                name="title"
                type="text"
                class="form-control"
                v-model="product.title"
              />
              <ErrorMessage name="title" class="text-danger" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-6">
              <label>Product description:</label>
              <Field
                name="description"
                as="textarea"
                class="form-control"
                v-model="product.description"
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
              value="Add Product"
              v-if="!isCreating"
            />
            <button
              class="btn btn-primary"
              type="button"
              disabled
              v-if="isCreating"
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      product: {},
    };
  },

  components: {
    Field,
    Form,
    ErrorMessage,
  },

  computed: { ...mapGetters(["isCreating", "createdData"]) },

  methods: {
		...mapActions(["storeProduct"]),
    onSubmit() {
      const { title, description } = this.product;
      this.storeProduct({
        title: title,
        description: description
      });
    }
  },

  watch: {
    createdData: function () {
      if (this.createdData !== null && !this.isCreating) {
        this.$swal.fire({
          text: "Success, Product has been added.",
          icon: "success",
          timer: 1000
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().label('Title').required().min(5),
      description: yup.string().label('Description').required().min(5),
    });

    return {
      schema,
    };
  },
};
</script>
