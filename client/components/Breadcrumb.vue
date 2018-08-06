<template>
    <b-row>
        <b-col>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item
                    v-for="item in breadcrumbs"
                    :key="item.index"
                    :to="{ path: item.path }">{{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                required: false,
                default: null
            }
        },
        data() {
            return {
                breadcrumbs: [],
            };
        },
        async mounted() {
            if (this.items) {
                this.breadcrumbs = this.items;
            }
            else {
                await this.updateBreadcrumbs();
            }
        },
        methods: {
            async updateBreadcrumbs() {
                // TODO: will need some rework when we'll have more complex paths, especially splitPaths()
                const currentPath = this.$route.path;
                const availableRoutes = this.$router.options.routes;
                const paths = this.splitPaths(currentPath);
                const routes = paths.map(path => availableRoutes.find(route => route.path === path));
                this.breadcrumbs = await this.getTitles(routes);
            },
            splitPaths(path) {
                let p = path;
                let i;
                const paths = [];

                do {
                    paths.push(p);
                    i = p.lastIndexOf('/');
                    p = p.substring(0, i);
                } while (p !== '');

                paths.reverse();
                return paths;
            },
            getTitles(routes) {
                const crumbs = [];
                let i = 0;
                const promises = routes.map((route) => {
                    const crumb = {
                        index: i++
                    };
                    return route.component()
                        .then((component) => {
                            const head = (component.head && component.head());
                            const title = (head && head.title) || route.name;
                            crumbs.push({
                                ...crumb,
                                path: route.path,
                                name: title
                            });
                        });
                });
                return Promise.all(promises)
                    .then(() => {
                        crumbs.sort((a, b) => a.index - b.index);
                        return crumbs;
                    });
            }
        }
    };
</script>
