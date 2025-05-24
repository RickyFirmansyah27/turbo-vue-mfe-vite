<template>
  <div ref="remoteRoot"></div>
</template>

<script>
export default {
  name: 'RemoteAssetAdaptor',
  props: {
    vueQueryClient: {
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
    
    import('assetsService/bootstrap').then(({ mount }) => {
      const el = this.$refs.remoteRoot
      const initialPath = this.$router.currentRoute.fullPath
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

      if (onParentNavigation) {
        this.unlistenRemoteNav = this.$router.afterEach((to) => {
          onParentNavigation({ pathname: to.fullPath })
        })
      }
    })
  },
  beforeDestroy() {
    if (this.unlistenRemoteNav) {
      this.unlistenRemoteNav()
      this.unlistenRemoteNav = null
    }
  },
}
</script>
