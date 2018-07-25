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
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>
