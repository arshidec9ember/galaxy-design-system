<markdown>
# Navigation Controls Slot

This demo showcases the `#toolbar-navigation-controls` slot for custom navigation functionality.
</markdown>

<template>
  <z-space vertical>
    <div style="height: 400px; border: 1px solid #e0e0e0; border-radius: 8px">
      <z-panel
        title="Navigation Controls Demo"
        description="Demonstrating custom navigation controls in the toolbar"
        :current-page="currentPage"
        :total-pages="totalPages"
        :open-in-new-tab="true"
        :closable="true"
        :expandable="true"
        :on-previous-btn-click="onPreviousPage"
        :on-next-btn-click="onNextPage"
      >
        <template v-if="showCustomNavigation" #toolbar-navigation-controls>
          <div class="custom-navigation-controls">
            <z-button
              style="border: 0px"
              size="small"
              variant="outlined"
              :disabled="currentPage <= 1"
              @click="onFirstPage"
            >
              <z-icon size="16">
                <FirstPageIcon />
              </z-icon>
            </z-button>

            <z-button
              style="border: 0px"
              size="small"
              variant="outlined"
              :disabled="currentPage <= 1"
              @click="onPreviousPage"
            >
              <z-icon size="16">
                <ChevronLeftIcon />
              </z-icon>
            </z-button>
            <z-button
              style="border: 0px"
              size="small"
              variant="outlined"
              :disabled="currentPage >= totalPages"
              @click="onNextPage"
            >
              <z-icon size="16">
                <ChevronRightIcon />
              </z-icon>
            </z-button>

            <z-button
              style="border: 0px"
              size="small"
              variant="outlined"
              :disabled="currentPage >= totalPages"
              @click="onLastPage"
            >
              <z-icon size="16">
                <LastPageIcon />
              </z-icon>
            </z-button>
          </div>
        </template>

        <div class="panel-content" style="padding: 16px">
          <z-title variant="5-m">
            Navigation Controls - Page {{ currentPage }} of {{ totalPages }}
          </z-title>
          <z-p>
            The navigation controls slot allows you to create custom navigation
            UI for paginated content. Use the navigation buttons to see
            different content.
          </z-p>

          <z-divider />
          <z-title variant="5-m">
            {{ currentPageData.title }}
          </z-title>
          <z-ul>
            <z-li v-for="item in currentPageData.items" :key="item.id">
              <strong>{{ item.name }}</strong> - {{ item.description }}
            </z-li>
          </z-ul>
        </div>
      </z-panel>
    </div>
  </z-space>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useMessage } from '@zeta-gds/components'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FirstPageIcon,
  LastPageIcon
} from '../../../_internal/icons'

export default defineComponent({
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    FirstPageIcon,
    LastPageIcon
  },
  setup () {
    const message = useMessage()
    const showCustomNavigation = ref(true)
    const showNavigationLabels = ref(true)
    const currentPage = ref(1)
    const totalPages = ref(3)

    // Sample data for each page
    const pageData = [
      {
        title: 'Documents - Page 1',
        items: [
          {
            id: 1,
            name: 'Project Proposal.docx',
            description: 'Initial project proposal and requirements'
          },
          {
            id: 2,
            name: 'Design Specifications.pdf',
            description: 'Detailed design specifications and wireframes'
          },
          {
            id: 3,
            name: 'User Research.xlsx',
            description: 'User research findings and survey results'
          },
          {
            id: 4,
            name: 'Marketing Plan.pptx',
            description: 'Q1 marketing strategy and campaign plans'
          },
          {
            id: 5,
            name: 'Budget Analysis.xlsx',
            description: 'Financial analysis and budget breakdown'
          }
        ]
      },
      {
        title: 'Images - Page 2',
        items: [
          {
            id: 6,
            name: 'hero-banner.jpg',
            description: 'Main website banner image (1920x1080)'
          },
          {
            id: 7,
            name: 'product-shot-1.png',
            description: 'Product photography for catalog'
          },
          {
            id: 8,
            name: 'team-photo.jpg',
            description: 'Company team photo for about page'
          },
          {
            id: 9,
            name: 'logo-variations.svg',
            description: 'Brand logo in multiple formats'
          },
          {
            id: 10,
            name: 'infographic.png',
            description: 'Data visualization infographic'
          }
        ]
      },
      {
        title: 'Videos - Page 3',
        items: [
          {
            id: 11,
            name: 'product-demo.mp4',
            description: 'Product demonstration video (5:30)'
          },
          {
            id: 12,
            name: 'company-intro.mov',
            description: 'Company introduction video (2:15)'
          },
          {
            id: 13,
            name: 'tutorial-series.mp4',
            description: 'Complete tutorial series (45:00)'
          },
          {
            id: 14,
            name: 'testimonials.mp4',
            description: 'Customer testimonial compilation'
          },
          {
            id: 15,
            name: 'behind-scenes.mp4',
            description: 'Behind the scenes development footage'
          }
        ]
      }
    ]

    const currentPageData = computed(() => {
      return pageData[currentPage.value - 1] || pageData[0]
    })

    function onFirstPage () {
      currentPage.value = 1
      message.success(`Navigated to first page - ${pageData[0].title}`)
    }

    function onPreviousPage () {
      if (currentPage.value > 1) {
        currentPage.value--
        message.info(
          `Navigated to page ${currentPage.value} - ${
            pageData[currentPage.value - 1].title
          }`
        )
      }
    }

    function onNextPage () {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
        message.info(
          `Navigated to page ${currentPage.value} - ${
            pageData[currentPage.value - 1].title
          }`
        )
      }
    }

    function onLastPage () {
      currentPage.value = totalPages.value
      message.success(
        `Navigated to last page - ${pageData[totalPages.value - 1].title}`
      )
    }

    return {
      showCustomNavigation,
      showNavigationLabels,
      currentPage,
      totalPages,
      currentPageData,
      onFirstPage,
      onPreviousPage,
      onNextPage,
      onLastPage,
      message
    }
  }
})
</script>

<style scoped>
.panel-content {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.custom-navigation-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.custom-navigation-controls button {
  border: 0px;
}
</style>
