<template>
    <div
        class="alert d-flex align-items-center"
        :class="`alert-${type}`"
        role="alert"
    >
        <component :is="icons[icon]"></component>
        <slot></slot>
    </div>
</template>

<script>
import { shallowRef } from 'vue'
import AlertSvgTriangleFill from '@/components/layout/AlertSvgTriangleFill.vue'
import AlertSvgCircleFill from '@/components/layout/AlertSvgCircleFill.vue'
import AlertSvgInfoFill from '@/components/layout/AlertSvgInfoFill.vue'

export default {
    props: {
        type: {
            type: String,
            default: 'warning'
        },
        icon: {
            type: String,
            default: 'warning'
        }
    },
    data() {
        return {
            icons: {
                warning: shallowRef(AlertSvgTriangleFill),
                circle: shallowRef(AlertSvgCircleFill),
                info: shallowRef(AlertSvgInfoFill)
            }
        }
    }
}
</script>
