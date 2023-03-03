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
                                            Create new account
                                        </h1>
                                        <p class="mb-0">
                                            Already a member?
                                            <router-link to="/login">
                                                Log in
                                            </router-link>
                                        </p>

                                        <!-- Form START -->
                                        <form class="mt-4 text-start">
                                            <!-- First Name -->
                                            <BaseInput
                                                label="Enter first name"
                                                v-model="registration.firstName"
                                            />
                                            <!-- Last Name -->
                                            <BaseInput
                                                label="Enter last name"
                                                v-model="registration.lastName"
                                            />
                                            <!-- Email -->
                                            <BaseInput
                                                type="email"
                                                label="Enter email"
                                                v-model="registration.email"
                                            />
                                            <!-- PhoneNumber -->
                                            <BaseInput
                                                label="Enter phone number"
                                                v-model="
                                                    registration.phoneNumber
                                                "
                                            />
                                            <!-- Password -->
                                            <PasswordInput
                                                label="Enter password"
                                                v-model="registration.password"
                                            />
                                            <!-- Button -->
                                            <div>
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary w-100 mb-0"
                                                >
                                                    Sign up
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
        return {
            registration: {
                email: 'nelsonkana@gmail.com',
                password: 'Test1234567890!',
                termsAndConditions: true,
                phoneNumber: '4389000000',
                firstName: 'Nelson',
                lastName: 'Kana',
                userVerificationId: '0797742a-14b0-4225-fd07-08db0aa04659'
            }
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
