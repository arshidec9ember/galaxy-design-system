<markdown>
  # Card Media background mode

The background mode in Card media takes this behaviour.
</markdown>

<template>
  <div
    :style="boxStyle"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <z-card variant="outlined" :style="cardStyle">
      <z-h2 style="color: #000; margin: 10px">
        Card
      </z-h2>
      <z-card-media :style="cardCoverStyle" background>
        <z-h2
          style="
            color: #fff;
            margin: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          "
        >
          Card Media (bg)
        </z-h2>
      </z-card-media>
      <z-card-content :style="cardContentStyle">
        <z-h2 style="color: #fff; margin: 10px">
          Card Content
        </z-h2>
      </z-card-content>
    </z-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const boxStyle = ref({
      perspective: '1000px',
      transition: 'transform 0.4s',
      marginBottom: '80px',
      display: 'inline-block'
    })

    const cardStyle = ref({
      overflow: 'initial',
      minHeight: '280px',
      width: '320px',
      backgroundColor: '#fff',
      borderColor: '#000',
      transition: 'inherit'
    })

    const cardCoverStyle = ref({
      background:
        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
      border: '1px solid',
      borderColor: '#777',
      backdropFilter: 'blur(1px)',
      transition: 'inherit'
    })

    const cardContentStyle = ref({
      display: 'flex',
      'align-items': 'center',
      width: '100%',
      height: '100%',
      'object-fit': 'cover',
      'box-sizing': 'border-box',
      alignItems: 'self-end',
      justifyContent: 'flex-end',
      background: 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0.3)',
      border: '1px solid',
      borderColor: '#000',
      backdropFilter: 'blur(1px)',
      transition: 'inherit'
    })

    const handleMouseOver = () => {
      boxStyle.value.transform = 'rotateY(30deg)'
      cardCoverStyle.value.transform =
        'scaleY(0.9) translate3d(20px, 30px, 40px)'
      cardContentStyle.value.transform = 'translate3d(45px, 50px, 40px)'
    }
    const handleMouseLeave = () => {
      boxStyle.value.transform = 'rotateY(0deg)'
      cardCoverStyle.value.transform = ''
      cardContentStyle.value.transform = ''
    }

    return {
      boxStyle,
      cardStyle,
      cardCoverStyle,
      cardContentStyle,
      handleMouseOver,
      handleMouseLeave
    }
  }
}
</script>
