<template>
    <BaseNavLayout>
        <section class="pt-0">
            <div class="container position-relative">
                <div class="home">
                    <img alt="Vue logo" src="../assets/logo.png" />
                    <HelloWorld msg="Welcome to Domivice" />
                </div>
            </div>
        </section>
    </BaseNavLayout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BaseNavLayout from '@/layouts/BaseNavLayout.vue'

export default {
    name: 'HomeView',
    components: {
        HelloWorld,
        BaseNavLayout
    }
}
</script>
