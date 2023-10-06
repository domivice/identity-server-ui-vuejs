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
                v-model="v$.firstName.$model"
                :class="{
                    'is-invalid': v$.firstName.$invalid
                }"
            >
                <div
                    v-for="error of v$.firstName.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
            </BaseInput>
            <!-- Last Name -->
            <BaseInput
                :label="$t('forms.lastNameLabel')"
                v-model="v$.lastName.$model"
                :class="{
                    'is-invalid': v$.lastName.$invalid
                }"
            >
                <div
                    v-for="error of v$.lastName.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
            </BaseInput>
            <!-- Email -->
            <BaseInput
                type="email"
                :label="$t('forms.emailLabel')"
                v-model="v$.email.$model"
                :class="{
                    'is-invalid': v$.email.$invalid
                }"
                disabled="true"
            >
                <div
                    v-for="error of v$.email.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
            </BaseInput>
            <PhoneInput
                :label="$t('forms.phoneNumberLabel')"
                v-model:phoneNumber="v$.phoneNumber.$model"
                v-model:phoneCountryCode="v$.phoneCountryCode.$model"
                :class="{
                    'is-invalid':
                        v$.phoneNumber.$invalid || v$.phoneCountryCode.$invalid
                }"
            >
                <div
                    v-for="error of v$.phoneNumber.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
                <div
                    v-for="error of v$.phoneCountryCode.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
            </PhoneInput>
            <!-- Password -->
            <PasswordInput
                :label="$t('forms.passwordLabel')"
                v-model="v$.password.$model"
                :class="{
                    'is-invalid': v$.password.$invalid
                }"
            >
                <div
                    v-for="error of v$.password.$errors"
                    :key="error.$uid"
                    class="invalid-feedback"
                >
                    {{ error.$message }}
                </div>
            </PasswordInput>
            <!-- Button -->
            <div>
                <button
                    :disabled="v$.$invalid || submitting"
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
const { t } = useI18n({ useScope: 'global' })
const validationRules = {
    email: {
        required: helpers.withMessage(
            t('validationErrors.emailRequired'),
            required
        ),
        email: helpers.withMessage(t('validationErrors.emailFormat'), email),
        $lazy: true
    },
    password: {
        required: helpers.withMessage(
            t('validationErrors.passwordRequired'),
            required
        ),
        minLengthRef: helpers.withMessage(
            t('validationErrors.passwordStrength', [
                passwordMinLength.value,
                passwordMaxLength.value
            ]),
            minLength(passwordMinLength)
        ),
        maxLengthRef: helpers.withMessage(
            t('validationErrors.passwordStrength', [
                passwordMinLength.value,
                passwordMaxLength.value
            ]),
            maxLength(passwordMaxLength)
        ),
        $lazy: true
    },
    termsAndConditions: {
        required: helpers.withMessage(
            t('validationErrors.termsAndConditions'),
            required
        ),
        sameAsRawValue: sameAs(true),
        $lazy: true
    },
    phoneNumber: {
        required: helpers.withMessage(
            t('validationErrors.phoneNumberRequired'),
            required
        ),
        numeric: helpers.withMessage(
            t('validationErrors.phoneNumberNumeric'),
            numeric
        ),
        $lazy: true
    },
    phoneCountryCode: {
        required: helpers.withMessage(
            t('validationErrors.phoneCountryCodeRequired'),
            required
        ),
        $lazy: true
    },
    firstName: {
        required: helpers.withMessage(
            t('validationErrors.firstNameRequired'),
            required
        ),
        validName: helpers.withMessage(
            t('validationErrors.alphaCharectersRequired'),
            validName
        ),
        $lazy: true
    },
    lastName: {
        required: helpers.withMessage(
            t('validationErrors.lastNameRequired'),
            required
        ),
        validName: helpers.withMessage(
            t('validationErrors.alphaCharectersRequired'),
            validName
        ),
        $lazy: true
    },
    userVerificationId: { required }
}
const $externalResults = ref({})
const v$ = useVuelidate(validationRules, registrationRequest, {
    $externalResults
})

const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})

const submitting = ref(false)

async function createUser(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect || submitting.value) return
    submitting.value = true
    await axios
        .post('users', registrationRequest)
        .then(({ data }) => {
            emit('update:registrationStep', 'registrationSuccess')
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
</script>
