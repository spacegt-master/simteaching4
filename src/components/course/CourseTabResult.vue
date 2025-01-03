<template>
  <div>
    <v-data-table-virtual :headers="headers" :items="items" item-key="name" :mobile="$vuetify.display.smAndDown">
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.name="{ item }">
        <v-avatar-pro :avatar="item.avatar" :name="item.name" size="32" class="mr-2"></v-avatar-pro>
        {{ item.name }}
      </template>
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template v-slot:[`item.id_${cr.id}`]="{ item, index }" v-for="(cr, crIndex) in crs" :key="cr.id">
        <div class="d-flex" v-if="items[index].resource[crIndex].crlid">
          <v-text-field v-model="items[index].resource[crIndex].score" type="number" :min="0" :max="cr.score"
            hide-details density="compact" variant="underlined" single-line :suffix="`/ ${cr.score} 分`" class="mr-2"
            max-width="120px" @change="handleResultUpdateScore(items[index].resource[crIndex])">
          </v-text-field>
          <CourseTabResultOptions @deleted="handleResultDeleted(items[index].resource[crIndex])"
            @view="courseTabResultViewRef.open(items[index].resource[crIndex])">
          </CourseTabResultOptions>
        </div>
      </template>
    </v-data-table-virtual>
    <CourseTabResultView ref="courseTabResultViewRef"></CourseTabResultView>
  </div>
</template>

<script setup>
import { CourseApi } from '@/api/course/course';
import { CourseResourceApi } from '@/api/course/course-resource';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const headers = ref([{ title: '用户', value: 'name', fixed: true, nowrap: true }])
const items = ref([])
const crs = ref([]) // CourseResources
const courseTabResultViewRef = ref()

watch(() => route.params.id, () => {
  loadItems()
  loadResources()
})

const handleResultDeleted = (item) => {
  CourseResourceApi.logDel(item.crlid)
  item.crlid = null
}
const handleResultUpdateScore = (item) => {
  CourseResourceApi.logUpdateScore(item.score, item.crlid)
}

const loadResources = async () => {
  headers.value.splice(1, headers.value.length)
  const coursework = { title: '课业', value: 'coursework', children: [] }
  const res = await CourseResourceApi.list(route.params.id)
  crs.value = res.filter(item => ['questions', 'testpaper', 'simulation'].includes(item.type))
  crs.value.forEach(item => {
    const title = `${item.resource.name} ( 满分:${item.score} )`
    coursework.children.push({ title, value: `id_${item.id}`, nowrap: true })
  })
  headers.value.push(coursework)
}

const loadItems = async () => {
  items.value = []
  const res = await CourseApi.transcript(route.params.id)
  res.forEach(item => {
    const findItem = items.value.find(user => user.id == item.id)
    if (findItem) {
      findItem.resource.push({
        crid: item.crid,
        rid: item.rid,
        crlid: item.crlid,
        type: item.type,
        order: item.order,
        score: item.score,
        createTime: item.create_time
      })
    } else {
      items.value.push({
        id: item.id,
        name: item.name,
        post: item.post,
        avatar: item.avatar,
        account: item.account,
        resource: [{
          crid: item.crid,
          rid: item.rid,
          crlid: item.crlid,
          type: item.type,
          order: item.order,
          score: item.score,
          createTime: item.create_time
        }]
      })
    }
  })
}

onMounted(() => {
  loadItems()
  loadResources()
})
</script>

<style lang="scss" scoped></style>
