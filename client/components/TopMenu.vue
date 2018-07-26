<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            background-color="#2d3a4b"
            text-color="#fff"
            active-text-color="#409EFF"
            @select="handleSelect">
            <el-menu-item index="1">Home</el-menu-item>
            <div class="menu-text">
                <p class="menu-user"><strong>Logged user:</strong> {{ user }}</p>
            </div>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            };
        },
        computed: {
            user() {
                return this.$auth.user;
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>

<style lang="sass" scoped>
    .menu-text
        float: right
        color: #fff
    .menu-user
        height: 60px
        line-height: 60px
        margin: 0
        font-size: 14px
        padding: 0 20px
</style>
