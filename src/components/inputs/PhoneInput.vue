<template>
    <div class="mb-3">
        <label class="form-label">{{ label }}</label>
        <div class="input-group">
            <select
                v-bind="$attrs"
                class="form-select"
                v-model="phoneCountryCode"
            >
                <option value="">Choose...</option>
                <option value="CA">Canada +1</option>
                <option value="US">US +1</option>
            </select>
            <input v-bind="$attrs" class="form-control" v-model="phoneNumber" />
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { toRef, computed } from 'vue'
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: [String, Number],
        default: ''
    },
    phoneCountryCode: {
        type: [String, Number],
        default: ''
    }
})

let emit = defineEmits(['update:phoneNumber', 'update:phoneCountryCode'])
const phoneNumber = computed({
    get() {
        return props.phoneNumber
    },
    set(newValue) {
        emit('update:phoneNumber', newValue)
    }
})
const phoneCountryCode = computed({
    get() {
        return props.phoneCountryCode
    },
    set(newValue) {
        console.log(newValue)
        emit('update:phoneCountryCode', newValue)
    }
})
</script>
