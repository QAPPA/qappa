export const state = () => ({
    rolesError: null
});

export const getters = {
    rolesError (state) {
        return state.rolesError;
    }
};

export const mutations = {
    setRolesError (state, error) {
        state.rolesError = error;
    },
    removeRolesError (state) {
        state.rolesError = null;
    }
};

export const actions = {
    setRolesError({ commit }, error) {
        commit('setRolesError', error);
    },
    removeRolesError({ commit }) {
        commit('removeRolesError');
    }
};
