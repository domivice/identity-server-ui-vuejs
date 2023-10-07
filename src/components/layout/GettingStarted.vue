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
                v-model.lazy="v$.email.$model"
                :class="{
                    'is-invalid': v$.email.$invalid
                }"
            >
                <div
                    v-for="error of v$.email.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
            </BaseInput>
            <!-- Button -->
            <div>
                <button
                    :disabled="v$.$invalid || submitting"
                    type="submit"
                    class="btn btn-primary w-100 mb-0"
                >
                    <font-awesome-icon
                        v-if="submitting"
                        :icon="['fas', 'circle-notch']"
                        spin
                    />
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
import { reactive, watch, unref, ref } from 'vue'
import { required, email, helpers } from '@vuelidate/validators'
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
const { t } = useI18n({ useScope: 'global' })

const validationRules = {
    verificationType: { required, $lazy: true },
    email: {
        required: helpers.withMessage(
            t('validationErrors.emailRequired'),
            required
        ),
        email: helpers.withMessage(t('validationErrors.emailFormat'), email),
        $lazy: true
    },
    cultureCode: { required, $lazy: true }
}

const $externalResults = ref({})
const v$ = useVuelidate(validationRules, verificationRequest, {
    $externalResults
})

watch(verificationRequest, (request, _) => {
    emit('update:registrationEmail', request.email)
})

const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})
const submitting = ref(false)
async function sendVerificationCode(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect || submitting.value) return
    submitting.value = true
    await axios
        .post('user-verification', verificationRequest)
        .then(({ data }) => {
            emit('update:verificationId', data.id)
            emit('update:registrationStep', 'verificationCode')
        })
        .catch(({ response }) => {
            submitting.value = false
            console.log(response)
            if (
                response.data.type ==
                'https://domivice.com/probs/validation-error'
            ) {
                $externalResults.value = response.data.errors
            }
        })
}
</script>
