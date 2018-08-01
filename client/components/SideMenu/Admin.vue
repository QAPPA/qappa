<template>
    <div>
        <el-menu-item index="1">
            <i class="el-icon-location"></i>
            <nuxt-link to="/admin/register">Register new user</nuxt-link>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                Admin two
            </template>
            <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item one</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <template slot="title">item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span>Navigator Two</span>
        </el-menu-item>
    </div>
</template>

<script>
    export default {

    };
</script>
