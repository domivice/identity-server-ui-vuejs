<template>
    <!-- Divider -->
    <div class="position-relative my-4">
        <hr />
        <p
            class="small bg-mode position-absolute top-50 start-50 translate-middle px-2"
        >
            {{ $t('login.orSignInWith') }}
        </p>
    </div>

    <!-- Google and facebook button -->
    <div class="vstack gap-3">
        <a href="#" class="btn btn-light mb-0">
            <font-awesome-icon
                :icon="['fab', 'google']"
                class="text-google-icon me-2"
            />
            {{ $t('login.signInWithGoogle') }}
        </a>
        <a href="#" class="btn btn-light mb-0">
            <font-awesome-icon
                :icon="['fab', 'facebook-f']"
                class="text-facebook me-2"
            />
            {{ $t('login.signInWithFaceBook') }}
        </a>
    </div>
</template>
<style lang="scss">
.text-facebook {
    color: #5d82d1;
}
.text-google-icon {
    background: conic-gradient(
            from -45deg,
            #ea4335 110deg,
            #4285f4 90deg 180deg,
            #34a853 180deg 270deg,
            #fbbc05 270deg
        )
        73% 55%/150% 150% no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    //  color: transparent;
    -webkit-text-fill-color: transparent;
}
.btn-light {
    background: #f5f5f6;
    border-color: #f5f5f6;
    color: #0b0a12;
}
</style>
