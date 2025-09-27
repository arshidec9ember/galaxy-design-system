<template>
  <z-layout-footer
    bordered
    class="footer"
    :class="{
      ['footer--centered']: centered
    }"
  >
    <div class="footer-links">
      <div class="footer-links-col">
        <z-text depth="1" class="col-header">
          {{ t('resources') }}
        </z-text>
        <z-button
          tag="a"
          variant="text"
          @click="navigateToUrl(t('sketchLink'))"
        >
          {{ t('designResources') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          @click="
            navigateToUrl(
              `https://zeta-icons-docs0zetaapps.mum1-pp.zetaapps.in/#/`
            )
          "
        >
          {{ t('icons') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          @click="
            navigateToUrl(
              `https://bitbucket.org/zetaengg/galaxy-design-system/src/main/CONTRIBUTING.md`
            )
          "
        >
          {{ t('contribution') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          download
          @click="push('/getting-started/installation')"
        >
          {{ t('installation') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          @click="navigateToUrl(`https://icones.js.org`)"
        >
          {{ t('icones') }}
        </z-button>
      </div>
      <div class="footer-links-col">
        <z-text depth="1" class="col-header">
          {{ t('help') }}
        </z-text>
        <z-button
          tag="a"
          variant="text"
          @click="push('/getting-started/common-issues')"
        >
          {{ t('commonIssues') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          @click="push('/getting-started/changelog')"
        >
          {{ t('changelog') }}
        </z-button>
      </div>
      <div class="footer-links-col">
        <z-text depth="1" class="col-header">
          {{ t('community') }}
        </z-text>
        <z-button tag="a" variant="text" @click="navigateToUrl(repoUrl)">
          {{ t('bitbucket') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          @click="
            navigateToUrl(
              `https://www.zetadiscourse.com/c/gds-galaxy-design-system/149`
            )
          "
        >
          {{ t('discourse') }}
        </z-button>
      </div>
      <div class="footer-links-col footer-links-col--last">
        <z-text depth="1" class="col-header">
          {{ t('contact') }}
        </z-text>
        <z-button
          tag="a"
          variant="text"
          @click="navigateToUrl(`mailto:web-infra-internal@zeta.tech`)"
        >
          {{ t('mailToText') }}
        </z-button>
        <z-button
          tag="a"
          variant="text"
          @click="
            navigateToUrl(
              `https://web.flock.com/channel/?chat_jid=a0beb049b09f4ae2a7949decce41ef2a@groups.go.to&teamId=10`
            )
          "
        >
          {{ t('flock') }}
        </z-button>
      </div>
    </div>
    <z-divider class="footer-divider" />
    <div style="text-align: center; padding: 20px">
      <z-text depth="3">
        Galaxy Design Components {{ version }} · Made by Web Infra
      </z-text>
    </div>
  </z-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { version } from '@zeta-gds/components'
import { i18n } from '../../utils/composables'
import { push } from '../../store'
import { repoUrl } from '../../utils/bitbucket-url'

export default defineComponent({
  props: {
    centered: Boolean
  },
  setup () {
    return {
      version,
      repoUrl,
      push,
      navigateToUrl (url: string) {
        window.open(url, '_blank')
      },
      ...i18n({
        'en-US': {
          resources: 'Resources',
          designResources: 'Design Resources',
          installation: 'Installation',
          help: 'Help',
          community: 'Community',
          contact: 'Contact Us',
          changelog: 'Change Log',
          commonIssues: 'Common Issues',
          aphrodite: 'Aphrodite',
          joinUs: 'Join Us',
          icons: 'Zeta Icon Library',
          discourse: 'Discourse',
          icones: 'Icones Library',
          flock: 'Flock',
          bitbucket: 'Bitbucket',
          libraries: 'Third-Party Libraries',
          contribution: 'Contribution',
          mailToText: 'Web Infra',
          reportBug: 'Report Bug',
          sketchLink:
            'https://www.figma.com/file/t4dWFndlBl46TnLIH2n1dJ/%F0%9F%94%AE-GDS-v2.11.0---Foundation-%2B-Components?type=design&node-id=16500-926&mode=design&t=XvZXIUzT6Jgm65Tf-0'
        }
      })
    }
  }
})
</script>

<style scoped>
.footer {
  --x-padding: 56px;
  margin-top: auto;
}

.footer.footer--centered .footer-links {
  margin: auto;
  max-width: 960px;
  --x-padding: 36px;
}

.footer-links {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: var(--x-padding);
  padding-bottom: 0;
  padding-top: 32px;
}

.footer-links-col {
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 24px;
  padding-bottom: 24px;
}

.col-header {
  white-space: nowrap;
}

@media only screen and (min-width: 1024px) {
  .footer.footer--centered .footer-links-col.footer-links-col--last {
    flex: 0 0 0;
  }
}

.footer.footer--centered .footer-links-col {
  width: initial;
}

.footer-divider {
  margin: 0;
  padding: 0 var(--x-padding);
}

.footer-links-col > * {
  line-height: 2;
}

.col-header {
  font-weight: 500;
}

.link {
  text-decoration: none;
}
</style>
