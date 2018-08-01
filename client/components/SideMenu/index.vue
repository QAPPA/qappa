<template>
    <el-menu
        default-active="1"
        class="side-menu"
        @open="handleOpen"
        @close="handleClose">
        <component :is="currentMenuName"></component>
    </el-menu>
</template>

<script>
import Default from './Default.vue';
import Admin from './Admin.vue';

export default {
    components: {
        Default,
        Admin
    },
    computed: {
        currentMenuName() {
            return (this.$route.path.includes('admin')) ? 'admin' : 'default';
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="sass">
    .side-menu
        height: 100%
</style>
