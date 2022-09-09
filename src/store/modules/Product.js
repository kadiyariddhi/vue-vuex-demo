import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

// initial state
const state = () => ({
  products: [],
  productsPaginatedData: null,
  product: null,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null
});

// getters
const getters = {
  productList: state => state.products,
  productsPaginatedData: state => state.productsPaginatedData,
  isLoading: state => state.isLoading,
  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData,
  isCreating: state => state.isCreating,
  createdData: state => state.createdData,
  product: state => state.product

};

const actions = {
  async getAllProducts({ commit }, query = null) {
    let page = "";
    let title = "";
    if (query !== null) {
      page = query.page;
      title = query.title;
    }

    commit("setProductIsLoading", true);
    let url = `${API_URL}products?page=${page}`;
    if (title === null) {
      url = `${url}?page=${page}`;
    } else {
      url = `${API_URL}products?title=${title}&page=${page}`;
    }

    await axios
      .get(url)
      .then(res => {
        const products = res.data.products;
        commit("setProducts", products);
        const pagination = {
          total: res.data.totalItems, // total number of elements or items
          per_page: res.data.products.length, // items per page
          current_page: res.data.currentPage, // current page (it will be automatically updated when users clicks on some page number).
          total_pages: res.data.totalPages // total pages in record
        };
        res.data.pagination = pagination;
        commit("setProductsPaginated", res.data);
        commit("setProductIsLoading", false);
      })
      .catch(err => {
        console.log("error", err);
        commit("setProductIsLoading", false);
      });
  },

  async deleteProduct({ commit }, id) {
    commit('setProductIsDeleting', true);
    await axios.delete(`${API_URL}products/${id}`)
      .then(res => {
        commit('setDeleteProduct', res.data.id);
        commit('setProductIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsDeleting', false);
      });
  },

  async storeProduct({commit}, product) {
    commit('setProductIsCreating', true);
    await axios.post(`${API_URL}products`, product)
    .then(res => {
      commit('saveNewProducts', res.data);
      commit('setProductIsCreating', false);
    }).catch(err => {
      console.log('error', err);
        commit('setProductIsCreating', false);
    })
  },

  async fetchDetailProduct({ commit }, id) {
    commit('setProductIsLoading', true);
    await axios.get(`${API_URL}products/${id}`)
      .then(res => {
        commit('setProductDetail', res.data);
        commit('setProductIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setProductIsLoading', false);
      });
  },

};

const mutations = {
  setProductIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setProducts: (state, products) => {
    state.products = products
  },

  setProductsPaginated: (state, productsPaginatedData) => {
    state.productsPaginatedData = productsPaginatedData
  },

  setProductIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

  setDeleteProduct: (state, id) => {
    state.productsPaginatedData.products.filter(x => x.id !== id);
  },

  setProductIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  saveNewProducts: (state, product) => {
    state.products.unshift(product)
    state.createdData = product;
  },

  setProductDetail: (state, product) => {
    state.product = product
  }

}
export default {
  state,
  actions,
  mutations,
  getters
};
