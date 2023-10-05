<template>
    <!-- Request Verification -->
    <div class="p-4 p-sm-7">
        <h1 class="mb-2 h3">{{ $t('headings.weSentYouACode') }}</h1>
        <form @submit="verifyUser" class="mt-4 text-start">
            <AlertBox
                :icon="alert.icon"
                :type="alert.type"
                v-if="alert.content"
            >
                <div>{{ alert.content }}</div>
            </AlertBox>
            <BaseInput
                :label="$t('forms.verificationCodeLabel')"
                v-model="verificationCodeRequest.code"
                :class="{
                    'is-invalid': v$.code.$invalid
                }"
                @blur="v$.code.$touch"
            >
                <div v-if="v$.code.$invalid" class="invalid-feedback">
                    {{ $t('forms.verificationCodeErrorMessage') }}
                </div>
            </BaseInput>
            <!-- Button -->
            <div>
                <button
                    :disabled="v$.$invalid"
                    type="submit"
                    class="btn btn-primary w-100 mb-0"
                >
                    {{ $t('forms.buttonNext') }}
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
// @ is an alias to /src
import axios from '@/axios'
import BaseInput from '@/components/inputs/BaseInput.vue'
import AlertBox from '@/components/layout/AlertBox.vue'
import { reactive, unref } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    verificationId: String,
    registrationStep: {
        type: String,
        default: 'gettingStarted'
    }
})
const verificationCodeRequest = reactive({
    code: null
})

const validationRules = {
    code: { required, $lazy: true }
}

const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})

const v$ = useVuelidate(validationRules, verificationCodeRequest)
const { t } = useI18n({ useScope: 'global' })

let emit = defineEmits(['update:registrationStep'])

async function verifyUser(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect) return
    await axios
        .post(
            `user-verification/${props.verificationId}`,
            verificationCodeRequest
        )
        .then(({ data }) => {
            emit('update:registrationStep', 'userDetails')
        })
        .catch(({ response }) => {
            console.log(response)
            alert.content = t(response.data.type)
        })
}
</script>
