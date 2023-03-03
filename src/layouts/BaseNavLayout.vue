<template>
    <div>
        <MainHeader></MainHeader>
        <main>
            <slot></slot>
        </main>
        <MainFooter></MainFooter>
    </div>
</template>

<script>
// @ is an alias to /src
import MainFooter from '@/components/layout/MainFooter.vue'
import MainHeader from '@/components/layout/MainHeader.vue'

export default {
    name: 'BaseNavLayout',
    components: {
        MainFooter,
        MainHeader
    }
}
</script>
