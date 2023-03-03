<template>
    <div class="position-relative">
        <BaseInput :label="label" v-model="password" type="password">
            <span
                class="position-absolute top-50 end-0 translate-middle-y p-0 mt-3"
            >
                <i
                    class="fakepasswordicon fas fa-eye-slash cursor-pointer p-2"
                ></i>
            </span>
        </BaseInput>
    </div>
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
