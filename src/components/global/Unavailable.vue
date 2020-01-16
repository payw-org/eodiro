<template>
  <div class="unavailable">
    <div class="item-wrapper">
      <h1>
        <div class="icon">
          {{ icon }}
        </div>
        {{ unavailableHeadline }}
      </h1>
      <p v-if="!postData" class="sub">
        포스트가 삭제되었거나 잘못된 URL입니다.
      </p>
      <NuxtLink v-if="!isSignedIn" :to="localePath('sign-in')" class="login">
        {{ $t('auth.signIn') + ' →' }}
      </NuxtLink>
    </div>
  </div>
</template>
