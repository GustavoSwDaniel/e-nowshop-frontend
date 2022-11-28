<template>
    <li>
        <a href="#">
            <i>
                <font-awesome-icon :icon="icon" size="2x" />
            </i>
            <span class="links_name">{{this.name}}</span>
        </a>
    </li>
</template>

<script>
export default {
    name: 'SidebarMenu',
    props: ['name', 'icon']
}
</script>


<style lang="scss">
li {
    position: relative;
    height: 50px;
    width: 100%;
    margin: 0 5px;
    list-style: none;
    line-height: 50px;
}

li a {
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.5s ease;
    border-radius: 12px;
}

li a:hover {
    color: #832727;
    background-color: #fff;
}

li a i {
    height: 50px;
    min-width: 65px;
    border-radius: 12px;
    line-height: 65px;
    text-align: center;
}
</style>