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
                                        <h1 class="mb-2 h3">Welcome back</h1>
                                        <p class="mb-0">
                                            New here?
                                            <router-link to="/register">
                                                Create an account
                                            </router-link>
                                        </p>

                                        <!-- Form START -->
                                        <form
                                            @submit="submit"
                                            class="mt-4 text-start"
                                        >
                                            <!-- Email -->
                                            <BaseInput
                                                type="email"
                                                label="Enter email id"
                                                v-model="signIn.email"
                                            />
                                            <!-- Password -->
                                            <PasswordInput
                                                label="Enter password"
                                                v-model="signIn.password"
                                            />
                                            <!-- Remember me -->
                                            <div
                                                class="mb-3 d-sm-flex justify-content-between"
                                            >
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        class="form-check-input"
                                                        id="rememberCheck"
                                                    />
                                                    <label
                                                        class="form-check-label"
                                                        for="rememberCheck"
                                                        >Remember me?</label
                                                    >
                                                </div>
                                                <router-link
                                                    to="/forgot-password"
                                                >
                                                    Forgot password?
                                                </router-link>
                                            </div>
                                            <!-- Button -->
                                            <div>
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary w-100 mb-0"
                                                >
                                                    Login
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
<script>
// @ is an alias to /src
import { useRoute } from 'vue-router'
import axios from '@/axios'

import NoNavLayout from '@/layouts/NoNavLayout.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import PasswordInput from '@/components/inputs/PasswordInput.vue'
import SignInWith from '@/components/layout/SignInWith.vue'
import FormFooterCopyRights from '@/components/layout/FormFooterCopyRights.vue'

export default {
    name: 'HomeView',
    components: {
        NoNavLayout,
        BaseInput,
        PasswordInput,
        SignInWith,
        FormFooterCopyRights
    },
    data() {
        const route = useRoute()
        return {
            signIn: {
                email: 'nelsonkana@gmail.com',
                password: 'Test1234567890!',
                returnUrl: route.query['ReturnUrl']
            }
        }
    },
    methods: {
        submit: async function (event) {
            event.preventDefault()
            await axios
                .post('auth/login', this.signIn)
                .then(({ data }) => {
                    window.location.href = data
                })
                .catch(error => console.log(error))
        }
    }
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
