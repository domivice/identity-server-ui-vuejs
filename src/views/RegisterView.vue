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

                                <!-- Registration steps -->
                                <div class="col-lg-6 order-1">
                                    <!-- Request Verification -->
                                    <Transition mode="out-in">
                                        <GettingStarted
                                            v-if="
                                                registration.step ==
                                                'gettingStarted'
                                            "
                                            v-model:verification-id="
                                                registration.verificationId
                                            "
                                            v-model:registration-email="
                                                registration.email
                                            "
                                            v-model:registration-step="
                                                registration.step
                                            "
                                        />
                                    </Transition>
                                    <Transition mode="out-in">
                                        <VerificationCode
                                            v-if="
                                                registration.step ==
                                                'verificationCode'
                                            "
                                            v-model:verification-id="
                                                registration.verificationId
                                            "
                                            v-model:registration-step="
                                                registration.step
                                            "
                                        />
                                    </Transition>
                                    <Transition mode="out-in">
                                        <UserDetails
                                            v-if="
                                                registration.step ==
                                                'userDetails'
                                            "
                                            v-model:verification-id="
                                                registration.verificationId
                                            "
                                            v-model:registration-email="
                                                registration.email
                                            "
                                            v-model:registration-step="
                                                registration.step
                                            "
                                        />
                                    </Transition>
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
import { ref } from 'vue'

import NoNavLayout from '@/layouts/NoNavLayout.vue'
import GettingStarted from '@/components/layout/GettingStarted.vue'
import VerificationCode from '@/components/layout/VerificationCode.vue'
import UserDetails from '@/components/layout/UserDetails.vue'

const registration = ref({
    email: null,
    verificationId: null,
    step: 'gettingStarted'
})
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
