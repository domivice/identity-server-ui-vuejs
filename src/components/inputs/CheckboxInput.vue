<template>
    <div class="form-check mb-3">
        <label class="form-check-label" :for="id">
            {{ label }}
        </label>
        <input
            class="form-check-input"
            v-bind="$attrs"
            type="checkbox"
            :value="true"
            :id="id"
            v-model="checkBoxValue"
        />
        <slot></slot>
    </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [Boolean],
        default: false
    }
})
let emit = defineEmits(['update:modelValue'])
const checkBoxValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', !!newValue)
    }
})
</script>
