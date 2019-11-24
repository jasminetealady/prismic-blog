<template>
  <font-awesome-icon @click="$emit('close')" id="Times" size="md" :icon="['fas', 'times']" />
</template>

<style lang="scss" scoped>
#Times {
  path {
    fill: #fff;
  }
}
</style>