<template>
    <!-- Request Verification -->
    <div class="p-4 p-sm-7">
        <h1 class="mb-2 h3">{{ $t('headings.gettingStarted') }}</h1>
        <form @submit="sendVerificationCode" class="mt-4 text-start">
            <AlertBox
                :icon="alert.icon"
                :type="alert.type"
                v-if="alert.content"
            >
                <div>{{ alert.content }}</div>
            </AlertBox>
            <BaseInput
                type="email"
                :label="$t('forms.emailLabel')"
                v-model="verificationRequest.email"
                :class="{
                    'is-invalid': v$.email.$invalid
                }"
                @blur="v$.email.$touch"
            >
                <div v-if="v$.email.$invalid" class="invalid-feedback">
                    {{ $t('forms.emailErrorMessage') }}
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
import { reactive, watch, unref } from 'vue'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import AlertBox from '@/components/layout/AlertBox.vue'
import { useI18n } from 'vue-i18n'

defineProps({
    registrationEmail: String,
    verificationId: String,
    registrationStep: {
        type: String,
        default: 'gettingStarted'
    }
})

let emit = defineEmits([
    'update:registrationEmail',
    'update:verificationId',
    'update:registrationStep'
])

const verificationRequest = reactive({
    verificationType: 'email',
    email: null,
    cultureCode: 'en-CA'
})

const validationRules = {
    verificationType: { required, $lazy: true },
    email: { required, email, $lazy: true },
    cultureCode: { required, $lazy: true }
}

const v$ = useVuelidate(validationRules, verificationRequest)
const { t } = useI18n({ useScope: 'global' })

watch(verificationRequest, (request, _) => {
    emit('update:registrationEmail', request.email)
})

const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})

async function sendVerificationCode(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect) return
    await axios
        .post('user-verification', verificationRequest)
        .then(({ data }) => {
            emit('update:verificationId', data.id)
            emit('update:registrationStep', 'verificationCode')
        })
        .catch(({ response }) => {
            console.log(response)
            alert.content = t(response.data.type)
        })
}
</script>
