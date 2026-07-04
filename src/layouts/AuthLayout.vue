<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
    <img src="../../public/logo-grey.png" width="54px" class="absolute left-1/2 top-0 z-10 -translate-x-1/2 opacity-80" />
    <div class="absolute inset-x-6 top-24 h-px bg-gradient-to-r from-transparent via-stone-600/60 to-transparent"></div>
    <div class="relative z-10 flex w-full max-w-md flex-col items-center justify-center gap-5 border border-stone-700/70 bg-[#15130f]/88 p-8 text-center shadow-[0_24px_80px_rgb(0_0_0/0.38)] backdrop-blur rounded-[2rem] sm:p-10">
      <router-view />
    </div>
  </div>
</template>
