<template>
    <NoNavLayout>
        <!-- =======================
Main Content START -->
        <section class="vh-xxl-100">
            <div class="container h-100 d-flex px-0 px-sm-4">
                <div
                    class="row justify-content-center align-items-center m-auto"
                >
                    <div class="col-12">
                        <div class="bg-mode shadow rounded-3 overflow-hidden">
                            <div class="row g-0">
                                <!-- Vector Image -->
                                <div
                                    class="col-lg-6 d-flex align-items-center order-2 order-lg-1"
                                >
                                    <div class="p-3 p-lg-5">
                                        <img
                                            src="https://booking.webestica.com/assets/images/element/signin.svg"
                                            alt=""
                                        />
                                    </div>
                                    <!-- Divider -->
                                    <div
                                        class="vr opacity-1 d-none d-lg-block"
                                    ></div>
                                </div>

                                <!-- Information -->
                                <div class="col-lg-6 order-1">
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
                                        <h1 class="mb-2 h3">
                                            {{ $t('login.welcome') }}
                                        </h1>
                                        <p class="mb-0">
                                            {{ $t('login.newHere') }}
                                            <router-link
                                                :to="{
                                                    path: 'register',
                                                    query: route.query
                                                }"
                                            >
                                                {{
                                                    $t('login.createAnAccount')
                                                }}
                                            </router-link>
                                        </p>

                                        <!-- Form START -->
                                        <form
                                            @submit="login"
                                            class="mt-4 text-start"
                                        >
                                            <AlertBox
                                                :icon="alert.icon"
                                                :type="alert.type"
                                                v-if="alert.content"
                                            >
                                                <div>{{ alert.content }}</div>
                                            </AlertBox>
                                            <!-- Email -->
                                            <BaseInput
                                                type="email"
                                                :label="
                                                    $t(
                                                        'login.enterEmailAddress'
                                                    )
                                                "
                                                v-model="signIn.email"
                                                :class="{
                                                    'is-invalid':
                                                        v$.email.$invalid
                                                }"
                                                @blur="v$.email.$touch"
                                            >
                                                <div
                                                    v-if="v$.email.$invalid"
                                                    class="invalid-feedback"
                                                >
                                                    {{
                                                        $t(
                                                            'login.invalidEmailFeedback'
                                                        )
                                                    }}
                                                </div>
                                            </BaseInput>

                                            <!-- Password -->
                                            <PasswordInput
                                                :label="
                                                    $t('login.enterPassword')
                                                "
                                                v-model="signIn.password"
                                                :class="{
                                                    'is-invalid':
                                                        v$.password.$invalid
                                                }"
                                                @blur="v$.password.$touch"
                                            >
                                                <div
                                                    v-if="v$.password.$invalid"
                                                    class="invalid-feedback"
                                                >
                                                    {{
                                                        $t(
                                                            'login.invalidPasswordFeedback'
                                                        )
                                                    }}
                                                </div>
                                            </PasswordInput>
                                            <!-- Remember me -->
                                            <div
                                                class="mb-3 d-sm-flex justify-content-between"
                                            >
                                                <!-- Terms and Conditions -->
                                                <CheckboxInput
                                                    :label="
                                                        $t('login.rememberMe')
                                                    "
                                                    v-model="signIn.rememberMe"
                                                    id="rememberCheck"
                                                >
                                                </CheckboxInput>
                                                <router-link
                                                    :to="{
                                                        path: 'forgot-password',
                                                        query: route.query
                                                    }"
                                                >
                                                    {{
                                                        $t(
                                                            'login.forgotPassword'
                                                        )
                                                    }}
                                                </router-link>
                                            </div>
                                            <!-- Button -->
                                            <div>
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary w-100 mb-0"
                                                    :disabled="
                                                        v$.$invalid ||
                                                        submitting
                                                    "
                                                >
                                                    <font-awesome-icon
                                                        v-if="submitting"
                                                        :icon="[
                                                            'fas',
                                                            'circle-notch'
                                                        ]"
                                                        spin
                                                    />
                                                    {{ $t('login.login') }}
                                                </button>
                                            </div>

                                            <SignInWith />

                                            <!-- Copyright -->
                                            <FormFooterCopyRights />
                                        </form>
                                        <!-- Form END -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </NoNavLayout>
</template>
<script setup>
// @ is an alias to /src
import { useRoute } from 'vue-router'
import axios from '@/axios'
import { ref, reactive, unref } from 'vue'
import NoNavLayout from '@/layouts/NoNavLayout.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import SignInWith from '@/components/layout/SignInWith.vue'
import FormFooterCopyRights from '@/components/layout/FormFooterCopyRights.vue'
import AlertBox from '@/components/layout/AlertBox.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import CheckboxInput from '@/components/inputs/CheckboxInput.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const alert = reactive({
    type: 'warning',
    icon: 'warning',
    content: null
})
const route = useRoute()
const signIn = reactive({
    email: '',
    password: '',
    returnUrl: route.query['ReturnUrl'],
    rememberMe: false
})
const validationRules = {
    email: {
        required,
        email,
        $lazy: true
    },
    password: {
        required,
        $lazy: true
    },
    returnUrl: {
        required
    }
}

const $externalResults = ref({})
const v$ = useVuelidate(validationRules, signIn, {
    $externalResults
})
const submitting = ref(false)

async function login(event) {
    event.preventDefault()
    alert.content = null
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect || submitting.value) return
    submitting.value = true
    await axios
        .post('auth/login', signIn)
        .then(({ data }) => {
            submitting.value = false
            window.location.href = data
        })
        .catch(error => {
            submitting.value = false
            console.log(error.response.data)
            alert.content = t(error.response.data.type)
        })
}
</script>
<style lang="scss">
.vh-xxl-100 {
    height: 100vh !important;
}
img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
}
.opacity-1 {
    opacity: 0.1 !important;
}
h3,
.h3 {
    font-size: 2.3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    line-height: 1.25;
}
.form-label {
    color: #85878a;
    margin-bottom: 0.5rem;
    font-weight: 400;
}
.bg-mode {
    --bs-bg-opacity: 1;
    background-color: white;
}
</style>
