<template>
  <div class="home-page">
    <section class="gds-home__hero">
      <div
        v-motion
        :initial="{ top: -900, opacity: 1 }"
        :enter="{
          top: 0,
          opacity: 1,
          transition: { easing: 'ease-in', delay: 500, duration: 2000 }
        }"
        class="gds-home__hero-bg-element"
      />
      <vue-particles
        id="heroParticles"
        class="gds-particles-bg"
        :options="options"
      />
      <div class="gds-home__hero-bg">
        <div
          v-for="(blob, index) in blobs"
          :key="index"
          :ref="(el) => (blobsRef[index] = el)"
          class="hero-bg-blob"
        />
      </div>
      <div class="content-wrapper">
        <div
          v-motion
          :initial="{ opacity: 0, y: 150 }"
          :enter="{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              damping: 20,
              stiffness: 100,
              duration: 2000,
              delay: 1600,
              easing: 'ease-in'
            }
          }"
          class="gds-home__hero-content"
        >
          <z-h1> Galaxy <br>Design System </z-h1>
          <z-text>{{ t('intro1') }}</z-text>
        </div>
      </div>
    </section>
    <section class="gds-home__about">
      <div
        v-motion
        :initial="{ top: -750, opacity: 1 }"
        :enter="{
          top: -100,
          opacity: 1,
          transition: { easing: 'ease-in', delay: 500, duration: 1000 }
        }"
        class="before-element"
      />
      <div class="content-wrapper">
        <div class="gds-home__about--left">
          <z-h6>{{ t('aboutMain') }}</z-h6>
          <z-text>{{ t('aboutSub') }}</z-text>
          <z-link href="/en-US/os-theme/getting-started/introduction">
            {{ t('aboutGds') }}
          </z-link>
        </div>
        <div class="gds-home__about--right">
          <z-image
            preview-disabled
            loading="lazy"
            :img-props="imgProps"
            src="/assets/images/about-banner.png"
            alt="About Home"
          />
        </div>
      </div>
    </section>
    <section
      v-motion
      :initial="{ opacity: 0, y: 110 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { duration: 250, easing: 'ease-in-out' }
      }"
      class="gds-home__basics"
    >
      <div class="content-wrapper">
        <z-h4 class="heading-4">
          {{ t('gdsLibrary') }}
        </z-h4>
        <div class="gds-home__basics--cards">
          <div class="gds-home__basics--card-item">
            <z-image
              preview-disabled
              loading="lazy"
              :img-props="imgProps"
              src="/assets/images/home-basics-foundation.png"
              alt="Foundation"
            />
            <div class="gds-home__basics--card-item--content">
              <z-text>{{ t('foundationMain') }}</z-text>
              <z-p>{{ t('foundationSub') }}</z-p>
              <z-link href="/en-US/os-theme/foundation/color">{{
                t('exploreFoundation')
              }}</z-link>
            </div>
          </div>

          <div class="gds-home__basics--card-item">
            <z-image
              preview-disabled
              loading="lazy"
              :img-props="imgProps"
              src="/assets/images/home-basics-components.png"
              alt="Components"
            />
            <div class="gds-home__basics--card-item--content">
              <z-text>{{ t('componentsMain') }}</z-text>
              <z-p>{{ t('componentsSub') }}</z-p>
              <z-link href="/en-US/os-theme/components/button">
                {{ t('viewComponents') }}
              </z-link>
            </div>
          </div>

          <div class="gds-home__basics--card-item">
            <z-image
              preview-disabled
              loading="lazy"
              :img-props="imgProps"
              src="/assets/images/home-basics-patterns.png"
              alt="Patterns"
            />
            <div class="gds-home__basics--card-item--content">
              <z-text>{{ t('patternsMain') }}</z-text>
              <z-p>{{ t('patternsSub') }}</z-p>
              <z-link href="/en-US/os-theme/pattern/empty-states">{{
                t('viewPatterns')
              }}</z-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      v-motion
      :initial="{
        opacity: 0,
        y: 110
      }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { duration: 250, easing: 'ease-in-out' }
      }"
      class="gds-home__status"
    >
      <div class="content-wrapper">
        <z-image
          preview-disabled
          loading="lazy"
          style="height: 200px"
          src="/assets/images/feature-status.png"
          alt="GDS Status"
        />
        <z-h4 class="heading-4">
          {{ t('gdsStatus') }}
        </z-h4>
        <z-link href="/en-US/os-theme/status">
          {{ t('viewStatus') }}
        </z-link>
      </div>
    </section>
    <section
      v-motion
      :initial="{
        opacity: 0,
        y: 110
      }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { duration: 250, easing: 'ease-in-out' }
      }"
      class="gds-home__get-started"
    >
      <div class="content-wrapper">
        <div class="gds-home__get-started--intro">
          <div class="gds-home__get-started--intro-left">
            <z-h4 class="heading-4">
              {{ t('getStarted') }}
            </z-h4>
          </div>
          <div class="gds-home__get-started--intro-right">
            <z-image
              preview-disabled
              loading="lazy"
              :img-props="imgProps"
              src="/assets/images/get-started-bg.png"
              alt="Getting Started"
            />
          </div>
        </div>

        <div class="gds-home__get-started--cards">
          <div class="gds-home__get-started--card-item">
            <div
              class="get-started-card"
              @click="
                router.push('/en-US/os-theme/getting-started/for-designers')
              "
            >
              <z-text>{{ t('startDesigning') }}</z-text>
            </div>
            <z-text>{{ t('startDesigningSub') }}</z-text>
          </div>

          <div class="gds-home__get-started--card-item">
            <div
              class="get-started-card"
              @click="
                router.push('/en-US/os-theme/getting-started/for-developers')
              "
            >
              <z-text>{{ t('startDeveloping') }}</z-text>
            </div>
            <z-text>{{ t('startDevelopingSub') }}</z-text>
          </div>
        </div>
      </div>
    </section>
    <section
      v-motion
      :initial="{ opacity: 0, y: 110 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { duration: 250, easing: 'ease-in-out' }
      }"
      class="gds-home__features"
    >
      <div class="content-wrapper">
        <z-h4 class="heading-4">
          {{ t('gdsFeatureMain') }}
        </z-h4>

        <div class="gds-home__features--container">
          <div class="gds-home__features--left">
            <z-image
              preview-disabled
              loading="lazy"
              :img-props="imgProps"
              src="/assets/images/features-bg.png"
              alt="Features Background"
            />
            <img
              class="features-bg-outer"
              src="/assets/images/feature-bg-outer.png"
            >

            <div class="gds-home__feature--item">
              <div class="gds-home__feature--item-left">
                <z-image
                  preview-disabled
                  loading="lazy"
                  :img-props="imgProps"
                  src="/assets/images/feature-efficiency.png"
                  alt="Efficiency"
                />
              </div>
              <div class="gds-home__feature--item-right">
                <z-text>{{ t('efficiency') }}</z-text>
                <z-p>{{ t('gdsFeature1') }}</z-p>
              </div>
            </div>

            <div class="gds-home__feature--item">
              <div class="gds-home__feature--item-left">
                <z-image
                  preview-disabled
                  loading="lazy"
                  :img-props="imgProps"
                  src="/assets/images/feature-flexibility.png"
                  alt="Flexibility"
                />
              </div>
              <div class="gds-home__feature--item-right">
                <z-text>{{ t('flexibility') }}</z-text>
                <p>{{ t('gdsFeature2') }}</p>
              </div>
            </div>

            <div class="gds-home__feature--item">
              <div class="gds-home__feature--item-left">
                <z-image
                  preview-disabled
                  loading="lazy"
                  :img-props="imgProps"
                  src="/assets/images/feature-consistency.png"
                  alt="Consistency"
                />
              </div>
              <div class="gds-home__feature--item-right">
                <z-text>{{ t('consistency') }}</z-text>
                <p>{{ t('gdsFeature3') }}</p>
              </div>
            </div>

            <div class="gds-home__feature--item">
              <div class="gds-home__feature--item-left">
                <z-image
                  preview-disabled
                  loading="lazy"
                  :img-props="imgProps"
                  src="/assets/images/feature-focus.png"
                  alt="Focus"
                />
              </div>
              <div class="gds-home__feature--item-right">
                <z-text>{{ t('focus') }}</z-text>
                <p>{{ t('gdsFeature4') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      v-motion
      :initial="{ opacity: 0, y: 110 }"
      :visibleOnce="{
        opacity: 1,
        y: 0,
        transition: { duration: 250, easing: 'ease-in-out' }
      }"
      class="gds-home__contributions"
    >
      <div class="content-wrapper">
        <div class="gds-home__contributions--left">
          <vue-particles
            id="contributionParticles"
            class="gds-particles-bg"
            :options="options"
          />
          <img
            v-motion
            :initial="{ opacity: 1, y: 10 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1200,
                easing: 'ease-in-out',
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }"
            src="/assets/images/contributions-bg.png"
          >
        </div>

        <div class="gds-home__contributions--right">
          <h4 class="heading-4">
            {{ t('contributionsMain') }}
          </h4>
          <p>{{ t('contributionsSub') }}</p>
          <z-link href="/en-US/os-theme/getting-started/for-developers">{{ t('contribute') }}
          </z-link>
        </div>
      </div>
    </section>
    <section class="gds-home__resources">
      <div class="content-wrapper">
        <h4 class="heading-4">
          {{ t('resources') }}
        </h4>
        <div class="gds-home__resources--container">
          <div class="gds-home__resources--link">
            <z-link
              href="https://zeta-tm.atlassian.net/jira/software/c/projects/TCH/boards/1865"
              target="_blank"
            >
              <div class="gds-home__resources--flex">
                <div class="home-resources--text">
                  <div class="home-resources--title-wrapper">
                    <z-image
                      preview-disabled
                      loading="lazy"
                      :img-props="imgProps"
                      src="/assets/images/jira-logo.svg"
                    />
                    <z-text class="gds-home__resources--link-title">
                      {{ t('issueTracker') }}
                    </z-text>
                  </div>
                  <z-text class="gds-home__resources--link-content">
                    {{ t('issueTracker1') }}
                  </z-text>
                </div>
              </div>
            </z-link>
          </div>

          <div class="gds-home__resources--link">
            <z-link
              href="https://teams.microsoft.com/l/channel/19%3AnxOzg6tP0p3WuOPd8PZpg5u6VBS7kCGJpRX6KD_Yggc1%40thread.tacv2/GDS%20(Design%2C%20Product%2C%20Devs)?groupId=ef9690bc-1333-42e3-a734-bbd61ee7c6aa&tenantId=b25c2f79-a125-4c52-8ec7-b732cb121171&ngc=true&allowXTenantAccess=true"
              target="_blank"
            >
              <div class="gds-home__resources--flex">
                <div class="home-resources--text">
                  <div class="home-resources--title-wrapper">
                    <z-image
                      preview-disabled
                      loading="lazy"
                      :img-props="imgProps"
                      src="/assets/images/teams-logo.svg"
                    />
                    <z-text class="gds-home__resources--link-title">{{
                      t('teamsChannel')
                    }}</z-text>
                  </div>
                  <z-text class="gds-home__resources--link-content">{{
                    t('teamsChannelDesc')
                  }}</z-text>
                </div>
              </div>
            </z-link>
          </div>

          <div class="gds-home__resources--link">
            <z-link
              href="https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/GDS-v2.0---Tokens-%2B-Components?node-id=0%3A1"
              target="_blank"
            >
              <div class="gds-home__resources--flex">
                <div class="home-resources--text">
                  <div class="home-resources--title-wrapper">
                    <z-image
                      preview-disabled
                      loading="lazy"
                      :img-props="imgProps"
                      src="/assets/images/figma-logo.svg"
                    />

                    <z-text class="gds-home__resources--link-title">{{
                      t('figmaLibrary')
                    }}</z-text>
                  </div>
                  <z-text class="gds-home__resources--link-content">{{
                    t('figmaLibrary1')
                  }}</z-text>
                </div>
              </div>
            </z-link>
          </div>
        </div>
      </div>
    </section>
    <section class="footer">
      <div class="grid content-wrapper">
        <div class="col-6">
          <z-p>{{ t('bwt') }}</z-p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, nextTick, onBeforeUnmount } from 'vue'
import { i18n } from '../../utils/composables'
import { locales } from '../../locales'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GdsHomePage',
  setup () {
    const options = {
      preset: 'stars',
      particles: {
        number: {
          value: 1500
        },
        size: {
          value: 2
        }
      },
      fullScreen: { enable: false }
    }
    const blobs = ref<(HTMLElement | null)[]>(new Array(4).fill(null))
    const blobsRef = ref<(HTMLElement | null)[]>([])
    const directions = ref(['right', 'right', 'right', 'right'])

    const router = useRouter()

    const moveBlobs = () => {
      blobsRef.value.forEach((item: HTMLElement | null, index: number) => {
        if (!item) return

        const left = parseFloat(
          window.getComputedStyle(item).getPropertyValue('left')
        )
        const bottom = parseFloat(
          window.getComputedStyle(item).getPropertyValue('bottom')
        )

        if (left > window.innerWidth - 100) {
          directions.value[index] = 'left'
        } else if (left < 0) {
          directions.value[index] = 'right'
        }

        if (directions.value[index] === 'left') {
          item.style.left = `${left - 2}px`
          item.style.bottom = `${bottom + (Math.random() * 2 - 1)}px`
        } else if (directions.value[index] === 'right') {
          item.style.left = `${left + 2}px`
          item.style.bottom = `${bottom + (Math.random() * 2 - 1)}px`
        }
      })
      requestAnimationFrame(moveBlobs)
    }

    onMounted(async () => {
      await nextTick()
      requestAnimationFrame(moveBlobs)
    })

    onBeforeUnmount(() => {
      window.onbeforeunload = null
    })

    const imgProps = {
      'object-fit': 'fill',
      width: '100%',
      height: '100%'
    }

    return {
      blobs,
      router,
      blobsRef,
      options,
      ...i18n({ 'en-US': locales.enUS }),
      imgProps
    }
  }
})
</script>

<style scoped lang="scss">
.home-page {
  font-family: 'Inter', sans-serif;
  color: #fff;
  background-color: #040718;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  min-width: 20rem;
  background: #040718;
  letter-spacing: 0.33px;
  font-weight: 400;

  a {
    background: #fff;
    border-radius: 20px;
    display: block;
    width: fit-content;
    text-decoration: none;
    border: 1px solid transparent;
    color: #272e47;
    cursor: pointer;

    &:hover {
      background: none;
      border: 1px solid #fff;
      color: #fff;
    }
  }
}

/* Common */

.heading-4 {
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: #fff;
}

.full-image {
  object-fit: fill;
  width: 100%;
  height: 100%;
}

.gds-particles-bg {
  height: 100%;
  width: 100%;
  z-index: 0;
  opacity: 0.2;
  position: absolute;
  top: 0;
  overflow: hidden;
}

.gds-home__hero {
  height: 680px;
  position: relative;

  &-bg-element {
    position: relative;
    background: url(/assets/images/hero-planet-bg.png) no-repeat;
    width: 200px;
    height: 200px;
    background-size: contain;
    display: block;
    top: 9%;
    left: 24%;
    z-index: 1;
  }

  & .gds-home__hero-bg {
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 0;
    top: 0;
    min-height: 820px;
    background-attachment: fixed;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

.hero-bg-blob {
  position: sticky;
  display: block;
  width: 280px;
  height: 280px;
  border-radius: 57% 44% 64% 36% / 54% 44% 56% 47%;
  filter: blur(200px);

  &:nth-child(1) {
    background: linear-gradient(180deg, #0ebde3 0%, #0ebde3 100%);
    left: 10vw;
    bottom: 0;
  }

  &:nth-child(2) {
    background: linear-gradient(180deg, #7a38d0 0%, #fc36ae 100%);
    bottom: calc(50vw - 100px);
    left: 25vw;
  }

  &:nth-child(3) {
    background: radial-gradient(50% 50% at 50% 50%, #fc36ae 0%, #f0832a 100%);
    bottom: 200px;
    left: 75vw;
  }

  &:nth-child(4) {
    left: -25vw;
    bottom: 200px;
    background: linear-gradient(180deg, #3c23d7 0%, #fc36ae 100%);
  }
}

.content-wrapper {
  max-width: 1144px;
  margin: 0 auto;
}

.gds-home__hero .gds-home__hero-content {
  position: sticky;
  top: 60px;
  margin-bottom: -100px;
  z-index: 2;
}

.gds-home__hero h1 {
  font-size: 94px;
  font-weight: 900;
  color: #fff;
  text-align: center;
  line-height: 96px;
  padding: 44px 0 24px;
  margin: 0;
  z-index: 2;
}

.gds-home__hero span {
  color: #e9e9e9;
  text-align: center;
  display: block;
  position: relative;
}

.gds-home__about {
  padding-top: 160px;
  display: flex;
  z-index: 3;
  position: relative;

  .content-wrapper {
    display: flex;
  }

  &--left,
  &--right {
    width: 50%;
    z-index: 999;
  }

  &--left {
    h6 {
      font-size: 24px;
      font-weight: 600;
      line-height: 36px;
      color: #fff;
      margin: 16px 0;
      max-width: 564px;
    }

    span {
      color: #a3a8c0;
      font-size: 16px;
      line-height: 24px;
      max-width: 447px;
      display: block;
    }

    a {
      font-weight: 500;
      padding: 12px 46px;
      margin-top: 48px;
    }
  }
}

.before-element {
  background-image: url(/assets/images/parallax-bg1.png);
  width: 100vw;
  background-size: cover;
  height: 150%;
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 10;
}

.gds-home__basics {
  margin-top: 100px;
  z-index: 99999;
  position: relative;

  & .gds-home__basics--cards {
    display: flex;
  }

  &--card-item {
    background: #0b1340;
    margin-right: 16px;
    width: 33%;

    &--content {
      padding: 32px 24px;

      span {
        font-size: 21px;
        font-weight: 600;
        color: #fff;
        cursor: default;
      }

      p {
        font-size: 16px;
        color: #a3a8c0;
        line-height: 24px;
        cursor: default;
        min-height: 72px;
      }

      .status,
      a {
        background: #fff;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 600;
        color: #272e47;
        border-radius: 20px;
        display: block;
        width: fit-content;
        margin-top: 48px;
        border: 1px solid transparent;
      }
    }

    &:hover {
      background: linear-gradient(180deg, #000000 0%, #0b1340 100%);
    }
  }

  .heading-4 {
    max-width: 520px;
    font-weight: 600;
  }
}

.gds-home__status {
  .content-wrapper {
    display: flex;
    margin-top: 124px;
    background: #070707;
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
    background-size: cover !important;
    background: url(/assets/images/feature-bg-status.png);
  }

  img {
    height: 200px;
    margin-left: -4%;
  }

  .heading-4 {
    text-align: left;
    max-width: 420px;
    font-weight: 800;
  }

  a {
    padding: 8px 38px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
    box-shadow: 0 8px 11px 0 rgba(0, 0, 0, 0.09);
  }
}

.gds-home__get-started {
  .content-wrapper {
    padding: 60px 116px;
    border: 1px solid #333d72;
    margin-top: 184px;
    position: relative;
    background: linear-gradient(
      356.57deg,
      rgba(33, 49, 107, 0.5) -14.12%,
      rgba(4, 7, 24, 0.5) 97.57%
    );
    background-image: url(/assets/images/get-started-bg-fallback.png);
    background-size: cover;

    &:before {
      content: '';
      background-image: url(/assets/images/GetStarted-before.png);
      width: 216px;
      height: 216px;
      background-position: 50%;
      background-size: contain;
      position: absolute;
      left: -108px;
      top: -108px;
    }
  }

  &--intro {
    display: flex;

    &-left {
      width: 50%;
    }

    &-right {
      width: 50%;
      margin-top: -17%;
    }
  }

  &--cards {
    display: flex;
    margin-top: 40px;
  }

  &--card-item {
    width: 50%;

    .get-started-card {
      border: 1px solid transparent;
      position: relative;

      &:before {
        content: '';
        background-image: url(/assets/images/right-arrow.svg);
        width: 26px;
        height: 16px;
        right: 32px;
        position: absolute;
        top: 16px;
        visibility: hidden;
      }

      &:hover:before {
        visibility: visible;
        right: 22px;
        transition: right 0.1s linear;
      }

      span {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 21px;
        font-weight: 600;
        width: 100%;
        text-align: end;
        color: #fff;
        padding: 0 22px 16px 0;
      }

      &:hover {
        border: 1px solid #333d72;
        box-shadow: 0 0 1px rgba(11, 19, 64, 0.31),
          0 18px 16px -4px rgba(0, 0, 0, 0.25);
      }
    }

    span {
      color: #a3a8c0;
      font-size: 16px;
      font-weight: 500;
      width: 93%;
      display: block;
      margin-top: 26px;
      line-height: 24px;
    }
  }
}

.get-started-card {
  display: block;
  height: 225px;
  background: url(/assets/images/getstarted_design.png) -50px 32px, #0b1340;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 18px;
  width: auto;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: url(/assets/images/getstarted_design.png) -50px 32px,
      radial-gradient(88.17% 142.57% at 88.17% 100%, #0b1340 0%, #000000 100%);
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.gds-home__features {
  margin-top: 120px;
  position: relative;
  display: block;
  z-index: 9999999;

  .heading-4 {
    text-align: center;
    font-weight: 900;
    max-width: 520px;
    margin: auto;
  }

  &--container {
    position: relative;
    display: block;
    margin-top: 80px;

    &:after {
      content: '';
      background: url(/assets/images/feature-bg-shadow.png) no-repeat;
      background-size: contain;
      display: block;
      position: absolute;
      width: 580px;
      height: 120px;
      right: 28%;
      margin-top: 24px;
    }
  }

  &--left {
    width: 60%;
  }
}

.features-bg-outer {
  width: 60%;
  height: auto;
  display: block !important;
  position: absolute !important;
  left: 0;
  z-index: 9;
  top: 0;
  animation: rotateImg 8s linear infinite;
}

.gds-home__feature--item {
  position: absolute;
  display: flex;
  z-index: 9999;

  &:nth-child(3) {
    top: 8%;
    left: 48%;
  }

  &:nth-child(4) {
    top: 33%;
    left: 56.9%;
  }

  &:nth-child(5) {
    top: 57.5%;
    left: 56%;
  }

  &:nth-child(6) {
    bottom: 4%;
    left: 46.5%;
  }

  &-left {
    width: 120px;
  }

  &-right {
    padding-left: 20px;

    span {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
    }

    p {
      color: #a3a8c0;
    }
  }
}

.gds-home__contributions {
  .content-wrapper {
    display: flex;
    height: 520px;
    margin-top: 240px;
  }

  &--left {
    flex: 50%;
    position: relative;
    display: block;

    img {
      left: 96px;
      top: -40px;
      width: 100%;
      max-width: 560px;
      max-height: 611px;
      position: absolute;
    }
  }

  &--right {
    flex: 50%;
    background: #0b1340;
    padding: 111px 72px;

    p {
      color: #a3a8c0;
      font-size: 16px;
      margin: 0;
      line-height: 24px;
    }

    a {
      padding: 12px 36px;
      font-size: 14px;
      font-weight: 600;
      margin-top: 48px;
    }
  }
}

.gds-home__resources {
  margin-top: 160px;

  &--container {
    display: flex;
    margin-top: 24px;
    flex-wrap: wrap;
    position: relative;
    margin-bottom: 40px;
    justify-content: space-between;
  }

  &--link {
    width: calc(33% - 50px);
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }

    a {
      background: transparent;
      border-radius: 4px;

      &:hover {
        border-color: transparent;
        opacity: 0.8;
      }
    }

    .gds-home__resources--flex {
      display: flex;
      gap: 10px;
    }
  }

  &--link-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 150%;
    color: #f1f2f9;
    margin-left: 8px;
  }

  &--link-content {
    font-size: 14px;
    display: block;
    line-height: 24px;
    color: #a3a8c0;
    margin-top: 4px;
    margin-left: 26px;
  }
}

.footer {
  border-top: 1px solid #333d72;
  background: transparent;
  p {
    color: #fff;
    font-size: 12px;
  }
}
.grid {
  display: flex;
  flex-wrap: wrap;
}

@keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<style lang="scss">
.gds-home__resources {
  &--link {
    a {
      i.z-base-icon {
        display: none;
      }
    }
  }
}
</style>
