<template>
  <v-dialog v-model="dialog" max-width="900" scrollable :fullscreen="fullscreen || $vuetify.display.smAndDown">
    <v-card :title="item.name">
      <template #append v-if="!$vuetify.display.smAndDown">
        <v-btn :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'" @click="fullscreen = !fullscreen"></v-btn>
      </template>
      <template v-slot:text>
        <div v-if="item.type == 'questions'">
          <div v-if="questions.qtype == '仿真题'">
            <VSimulationResultView :simulation="questions.answer"></VSimulationResultView>
          </div>
          <QuestionsOptions v-else disabled :type="questions.qtype" :options="questions.options.map(item => item.name)"
            :answer="questions.answer">
          </QuestionsOptions>
        </div>
        <div v-else-if="item.type == 'testpaper'">
          <v-card class="pa-4 ma-1 mb-4" v-for="(question, index) in testpaper.questions" :key="index">
            <div class="mb-2">
              {{ question.name }}
              <span class="text-caption	text-medium-emphasis float-right">{{ question.score }} 分</span>
            </div>

            <VSimulationResultView v-if="question.type == '仿真题'" :simulation="question.answer"></VSimulationResultView>

            <QuestionsOptions v-else disabled :type="question.type" v-model:answer="question.answer"
              v-model:options="question.options">
            </QuestionsOptions>
          </v-card>
        </div>
        <div v-else-if="item.type == 'simulation'">
          <VSimulationResultView :simulation="simulation"></VSimulationResultView>
        </div>
        <div v-else-if="item.type == 'report_template'" v-html="reportTemplate.content">
        </div>
      </template>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="关闭" variant="text" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { CourseResourceApi } from '@/api/course/course-resource';
import { ResourceApi } from '@/api/resource/resource';
import { ResourceTestpaperApi } from '@/api/resource/resource-paper';
import { ResourceQuestionsApi } from '@/api/resource/resource-questions';
import { useAnswerFormat } from '@/utils/answer-format';
import { ref } from 'vue';

const dialog = ref(false)
const fullscreen = ref(false)
const item = ref({
  type: null,
  name: null
})
const questions = ref({
  qtype: null,
  options: [],
  answer: null,
  simulation: null
})
const testpaper = ref({
  questions: []
})
const simulation = ref({
  startTime: null,
  stopTime: null,
  timeUsed: null,
  score: null,
  steps: []
})
const reportTemplate = ref({
  content: ''
})

const open = async (value) => {
  item.value.type = value.type
  if (value.type == 'questions') {
    try {
      const res = await ResourceApi.info(value.rid, value.type)
      item.value.name = res.name
      questions.value.options = res.options || []
      questions.value.qtype = res.type
    } catch (e) { /* empty */ }
    try {
      const res = await CourseResourceApi.logDataInfo(value.crlid)
      questions.value.answer = useAnswerFormat(res, questions.value.qtype)
    } catch (e) { /* empty */ }
  }
  if (value.type == "testpaper") {
    try {
      const res = await ResourceTestpaperApi.info(value.rid)
      item.value.name = res.name

      const logData = await CourseResourceApi.logDataInfo(value.crlid)

      const qids = logData.map(item => item.qid)

      const questions = await ResourceQuestionsApi.listByIds(qids.join(','))

      testpaper.value.questions = qids.map(qid => questions.find(question => question.id == qid))

      testpaper.value.questions.forEach(question => {
        const selfAnswer = logData.find(item => item.qid == question.id)
        question.answer = useAnswerFormat(selfAnswer.answer, question.type)
        question.options = question.options.map(options => options.name)
      })
    } catch (e) { /* empty */ }

  }
  if (value.type == 'simulation') {
    try {
      const res = await ResourceApi.info(value.rid, value.type)
      item.value.name = res.name
    } catch (e) { /* empty */ }
    try {
      const res = await CourseResourceApi.logDataInfo(value.crlid)
      simulation.value.startTime = res.startTime
      simulation.value.stopTime = res.stopTime
      simulation.value.timeUsed = res.timeUsed
      simulation.value.score = res.score
      simulation.value.steps = res.steps.map(item => {
        return {
          ...item,
          correct: item.correct == 1 ? '完成' : '未完成',
        }
      })
    } catch (e) { /* empty */ }
  }
  if (value.type == 'report_template') {
    try {
      const res = await ResourceApi.info(value.rid, value.type)
      item.value.name = res.title
    } catch (e) { /* empty */ }
    try {
      const res = await CourseResourceApi.logDataInfo(value.crlid)
      reportTemplate.value.content = res
    } catch (e) { /* empty */ }
  }
  dialog.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>
