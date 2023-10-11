<template>
    <!-- Request Verification -->
    <div class="p-4 p-sm-7">
        <h1 class="mb-2 h3">{{ $t('headings.createNewAccount') }}</h1>
        <p>
            {{ $t('body.alreadyAMember') }}
            <router-link
                :to="{
                    path: 'login',
                    query: route.query
                }"
                >{{ $t('body.login') }}</router-link
            >
        </p>
        <p>
            {{ $t('body.problemWithCode') }}
            <router-link
                :to="{
                    path: 'register',
                    query: route.query
                }"
                @click="requestNewCode"
                >{{ $t('body.requestNewCode') }}</router-link
            >
        </p>
        <p>{{ $t('body.enterVerificationCode') }}</p>
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
                v-model.lazy="v$.code.$model"
                :class="{
                    'is-invalid': v$.code.$invalid
                }"
            >
                <div
                    v-for="error of v$.code.$errors"
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
                    {{ $t('forms.verifyCode') }}
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
import { reactive, unref, ref } from 'vue'
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
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
const { t } = useI18n({ useScope: 'global' })
const validationRules = {
    code: {
        required: helpers.withMessage(
            t('validationErrors.verificationCodeRequired'),
            required
        ),
        $lazy: true
    }
}

const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})

const $externalResults = ref({})
const v$ = useVuelidate(validationRules, verificationCodeRequest, {
    $externalResults
})

let emit = defineEmits(['update:registrationStep'])
const submitting = ref(false)
async function verifyUser(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect || submitting.value) return
    submitting.value = true
    await axios
        .post(
            `user-verification/${props.verificationId}`,
            verificationCodeRequest
        )
        .then(({ data }) => {
            emit('update:registrationStep', 'userDetails')
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
            // alert.content = t(response.data.type)
        })
}

function requestNewCode(event) {
    event.preventDefault()
    emit('update:registrationStep', 'gettingStarted')
}
</script>
