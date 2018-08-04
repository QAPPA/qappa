<template>
    <b-row>
        <b-col>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                <el-breadcrumb-item
                    v-for="item in items"
                    :key="item.id"
                    :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                default: null
            }
        }
    };
</script>
