<template>
    <BaseNavLayout>
        <section class="pt-0">
            <div class="container position-relative">
                <div class="about">
                    <h1>This is an about page for domivice</h1>
                </div>
            </div>
        </section>
    </BaseNavLayout>
</template>
<script>
// @ is an alias to /src

import BaseNavLayout from '@/layouts/BaseNavLayout.vue'

export default {
    name: 'HomeView',
    components: {
        BaseNavLayout
    }
}
</script>
