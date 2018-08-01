<template>
    <el-container id="content">
        <el-header>
            <top-menu />
        </el-header>
        <el-container>
            <el-aside width="17%">
                <side-menu-admin />
            </el-aside>
            <el-container>
                <el-main>
                    <nuxt />
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import TopMenu from '~/components/TopMenu.vue';
    import SideMenuAdmin from '~/components/SideMenuAdmin.vue';

    export default {
        components: {
            TopMenu,
            SideMenuAdmin
        }
    };
</script>

<style lang="sass">
    #content
        min-height: 100%
        .el-footer
            padding: 20px
            text-align: center
</style>
