<template>
    <BaseInput
        v-bind="$attrs"
        :label="label"
        v-model="password"
        type="password"
    >
        <slot></slot>
    </BaseInput>
</template>

<script>
import BaseInput from '@/components/inputs/BaseInput.vue'
export default {
    components: {
        BaseInput
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },
    computed: {
        password: {
            get() {
                return this.modelValue
            },
            set(newPassword) {
                this.$emit('update:modelValue', newPassword)
            }
        }
    }
}
</script>
