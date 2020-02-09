<template>
  <div>
    <Grid>
      <Button>hi</Button>
      <Accordion>
        <template v-slot:face>
          <h3>Accordion</h3>
          <p>This is accordion component.</p>
          <p>This is accordion component.</p>
          <p>This is accordion component.</p>
        </template>

        <template v-slot:content>
          <p>Accordion content</p>
        </template>
      </Accordion>
      <ArrowBlock>
        <template v-slot:content>
          <p>Menu Block</p>
        </template>
      </ArrowBlock>
    </Grid>
    <Button>
      Test Dialog
    </Button>

    <div class="parent">
      <div class="child" />
    </div>
  </div>
</template>

<script>
import { Accordion, ArrowBlock, Button, Grid } from '~/components/ui'

export default {
  components: { Accordion, ArrowBlock, Button, Grid },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
@import '~/assets/styles/scss/main';

.parent {
  width: 100px;
  height: 100px;
  background: black;
  padding: 10px;

  .child {
    width: 100%;
    height: 100%;
    background: red;
  }
}
</style>
