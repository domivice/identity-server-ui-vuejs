<template>
    <!-- Complete registration -->
    <div class="p-4 p-sm-7">
        <!-- Logo -->
        <!-- <a href="index.html">
            <img
                class="h-50px mb-4"
                src="assets/images/logo-icon.svg"
                alt="logo"
            />
        </a> -->
        <!-- Title -->
        <h1 class="mb-2 h3">{{ $t('headings.createNewAccount') }}</h1>
        <p class="mb-0">
            {{ $t('body.alreadyAMember') }}
            <router-link to="/login">{{ $t('body.login') }}</router-link>
        </p>

        <!-- Form START -->
        <form @submit="createUser" class="mt-4 text-start">
            <AlertBox
                :icon="alert.icon"
                :type="alert.type"
                v-if="alert.content"
            >
                <div>{{ alert.content }}</div>
            </AlertBox>
            <!-- First Name -->
            <BaseInput
                :label="$t('forms.firstNameLabel')"
                v-model="registrationRequest.firstName"
                :class="{
                    'is-invalid': v$.firstName.$invalid
                }"
                @blur="v$.firstName.$touch"
            >
                <div v-if="v$.firstName.$invalid" class="invalid-feedback">
                    {{ $t('forms.firstNameErrorMessage') }}
                </div>
            </BaseInput>
            <!-- Last Name -->
            <BaseInput
                :label="$t('forms.lastNameLabel')"
                v-model="registrationRequest.lastName"
                :class="{
                    'is-invalid': v$.lastName.$invalid
                }"
                @blur="v$.lastName.$touch"
            >
                <div v-if="v$.lastName.$invalid" class="invalid-feedback">
                    {{ $t('forms.lastNameErrorMessage') }}
                </div>
            </BaseInput>
            <!-- Email -->
            <BaseInput
                type="email"
                :label="$t('forms.emailLabel')"
                v-model="registrationRequest.email"
                :class="{
                    'is-invalid': v$.email.$invalid
                }"
                @blur="v$.email.$touch"
                disabled="true"
            >
                <div v-if="v$.email.$invalid" class="invalid-feedback">
                    {{ $t('forms.emailErrorMessage') }}
                </div>
            </BaseInput>
            <PhoneInput
                :label="$t('forms.phoneNumberLabel')"
                v-model:phoneNumber="registrationRequest.phoneNumber"
                v-model:phoneCountryCode="registrationRequest.phoneCountryCode"
                :class="{
                    'is-invalid':
                        v$.phoneNumber.$invalid || v$.phoneCountryCode.$invalid
                }"
                @blur="v$.phoneNumber.$touch"
                @change="v$.phoneCountryCode.$touch"
            >
                <div
                    v-if="
                        v$.phoneNumber.$invalid || v$.phoneCountryCode.$invalid
                    "
                    class="invalid-feedback"
                >
                    {{ $t('forms.phoneNumberErrorMessage') }}
                </div>
            </PhoneInput>
            <!-- Password -->
            <PasswordInput
                :label="$t('forms.passwordLabel')"
                v-model="registrationRequest.password"
                :class="{
                    'is-invalid': v$.password.$invalid
                }"
                @blur="v$.password.$touch"
            >
                <div v-if="v$.password.$invalid" class="invalid-feedback">
                    {{
                        $t('forms.passwordErrorMessage', [
                            passwordMinLength,
                            passwordMaxLength
                        ])
                    }}
                </div>
            </PasswordInput>
            <!-- Button -->
            <div>
                <button
                    :disabled="v$.$invalid"
                    type="submit"
                    class="btn btn-primary w-100 mb-0"
                >
                    {{ $t('forms.buttonRegister') }}
                </button>
            </div>

            <SignInWith />

            <!-- Copyright -->
            <FormFooterCopyRights />
        </form>
        <!-- Form END -->
    </div>
</template>
<script setup>
import axios from '@/axios'
import BaseInput from '@/components/inputs/BaseInput.vue'
import PhoneInput from '@/components/inputs/PhoneInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import SignInWith from '@/components/layout/SignInWith.vue'
import FormFooterCopyRights from '@/components/layout/FormFooterCopyRights.vue'
import AlertBox from '@/components/layout/AlertBox.vue'
import { unref, toRef, reactive, ref } from 'vue'
import {
    required,
    email,
    minLength,
    maxLength,
    numeric,
    sameAs,
    helpers
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    registrationEmail: String,
    verificationId: String,
    registrationStep: {
        type: String,
        default: 'gettingStarted'
    }
})

let emit = defineEmits(['update:registrationStep'])

const registrationRequest = reactive({
    email: toRef(props, 'registrationEmail'),
    password: 'Test1234567890!',
    termsAndConditions: true,
    phoneNumber: '4389000000',
    phoneCountryCode: 'CA',
    firstName: 'Nelson',
    lastName: 'Kana',
    userVerificationId: toRef(props, 'verificationId')
})
const passwordMinLength = ref(12)
const passwordMaxLength = ref(64)
const validName = helpers.regex(
    /^(?<firstchar>(?=[A-Za-z]))((?<alphachars>[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸåÅæÆœŒçÇðÐøØß])|(?<specialchars>[A-Za-z]['-](?=[A-Za-z]))|(?<spaces> (?=[A-Za-z])))*$/
)
const validationRules = {
    email: { required, email },
    password: {
        required,
        minLengthRef: minLength(passwordMinLength),
        maxLengthRef: maxLength(passwordMaxLength),
        $lazy: true
    },
    termsAndConditions: {
        required,
        sameAsRawValue: sameAs(true),
        $lazy: true
    },
    phoneNumber: { required, numeric, $lazy: true },
    phoneCountryCode: { required, $lazy: true },
    firstName: { required, validName, $lazy: true },
    lastName: { required, validName, $lazy: true },
    userVerificationId: { required }
}
const $externalResults = ref({})
const v$ = useVuelidate(validationRules, registrationRequest, {
    $externalResults
})
const { t } = useI18n({ useScope: 'global' })
const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})

async function createUser(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect) return
    await axios
        .post('users', registrationRequest)
        .then(({ data }) => {
            emit('update:registrationStep', 'registrationSuccess')
        })
        .catch(({ response }) => {
            console.log(response)
            if (
                response.data.type ==
                'https://domivice.com/probs/validation-error'
            ) {
                $externalResults.value = response.data.errors
            }
            alert.content = t(response.data.type)
        })
}
</script>
