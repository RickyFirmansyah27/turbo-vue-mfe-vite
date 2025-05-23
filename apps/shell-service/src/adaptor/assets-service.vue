// src/components/RemoteAssetAdaptor.vue
<template>
  <div ref="remoteRoot"></div>
</template>

<script>
export default {
  name: 'RemoteAssetAdaptor',
  props: {
    vueQueryClient: { // contoh prop yang kamu mau passing
      type: Object,
      required: true
    }
  },
  data() {
    return {
      unlistenRemoteNav: null,
    }
  },
  mounted() {
    // Import mount function dari remote secara dinamis
    import('assetsService/bootstrap').then(({ mount }) => {
      const el = this.$refs.remoteRoot
      const initialPath = this.$router.currentRoute.fullPath

      // Panggil mount dengan elemen dan opsi
      const { onParentNavigation } = mount(el, {
        initialPath,
        vueQueryClient: this.vueQueryClient,
        onParentNavigation: ({ pathname: nextPathname }) => {
          const currentPath = this.$router.currentRoute.fullPath
          if (currentPath !== nextPathname) {
            this.$router.push(nextPathname)
          }
        },
      })

      // Pasang listener agar kalau shell navigasi, remote juga bisa update
      if (onParentNavigation) {
        this.unlistenRemoteNav = this.$router.afterEach((to) => {
          onParentNavigation({ pathname: to.fullPath })
        })
      }
    })
  },
  beforeDestroy() {
    // Bersihkan listener router jika ada
    if (this.unlistenRemoteNav) {
      this.unlistenRemoteNav()
      this.unlistenRemoteNav = null
    }
  },
}
</script>
