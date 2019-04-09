<template>
  <div
    ref="container"
    :class="classes"
    :style="styleAttr"
    class="flex-container"
  >
    <div
      :is="component"
      v-for="({ component, id }, i) in widgetsDOM"
      :key="i"
      :widget-id="id"
      class="widget"
    />

    <slot />

    <CSS :value="customCSS" />
  </div>
</template>

<script lang="ts">
import AnimationManager from '@/lib/AnimationManager'
import CSS from './CSS.vue'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { commonModule } from '@/store'
import { widgetMap } from '@/options/widgetMetadata'

import ClockView from '@/components/clock/View.vue'
import DateView from '@/components/date/View.vue'
import MottoView from '@/components/motto/View.vue'
import SeparatorView from '@/components/separator/View.vue'

@Component({
  components: {
    CSS,
    ClockView,
    DateView,
    MottoView,
    SeparatorView
  }
})
export default class RootView extends Vue {
  @Prop({ default: false })
  shrink!: boolean

  @Prop({ required: true })
  widgets!: {
    type: string
    id: number
  }[]

  animationManager: AnimationManager | undefined

  get styleAttr () {
    return commonModule.styleAttr
  }
  get customCSS (): string {
    return commonModule.style
  }

  get widgetsDOM () {
    return this.widgets.map(({ type, id }) => ({
      component: widgetMap.get(type)!.componentName,
      id
    }))
  }

  get classes () {
    return {
      shrink: this.shrink !== false,
      [commonModule.fadeIn ? 'fade-in' : 'show-immediatelly']: true
    }
  }

  get animation () {
    return {
      colors: commonModule.styling.animationColors,
      duration: commonModule.styling.animationDuration,
      start: commonModule.styling.animationStart
    }
  }

  mounted () {
    this.setUpAnimation()
  }
  beforeDestroy () {
    if (this.animationManager) {
      this.animationManager.stop()
    }
  }

  @Watch('animation')
  setUpAnimation () {
    if (this.animationManager) {
      this.animationManager.stop()
    }

    this.animationManager = new AnimationManager(
      this.$refs.container as HTMLElement,
      this.animation
    )

    this.animationManager.start()
  }
}
</script>

<style scoped>
.flex-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  opacity: 0;
}
.flex-container:not(.shrink) {
  min-height: 100vh;
}

.flex-container > .widget {
  overflow: hidden;
}

.show-immediatelly {
  opacity: 1;
}
</style>