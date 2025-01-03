<template>
  <v-dialog v-model="dialog" max-width="900" scrollable :fullscreen="fullscreen || $vuetify.display.smAndDown">
    <v-card :title="item.name">
      <template #append v-if="!$vuetify.display.smAndDown">
        <v-btn :icon="fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'" @click="fullscreen = !fullscreen"></v-btn>
      </template>
      <template v-slot:text>
        <div v-if="item.type == 'questions'">
          <QuestionsOptions disabled :type="questions.qtype" :options="questions.options.map(item => item.name)"
            :answer="questions.answer">
          </QuestionsOptions>
        </div>
        <div v-else-if="item.type == 'testpaper'">
          <v-card class="pa-4 ma-1 mb-4" v-for="(question, index) in testpaper.questions" :key="index">
            <div class="mb-2">
              {{ question.name }}
              <span class="text-caption	text-medium-emphasis float-right">{{ question.score }} 分</span>
            </div>
            <QuestionsOptions disabled :type="question.type" v-model:answer="question.answer"
              v-model:options="question.options">
            </QuestionsOptions>
          </v-card>
        </div>
        <div v-else-if="item.type == 'simulation'">
          <v-responsive min-height="500">
            <v-container class="pa-6 pa-md-12 h-100 flex-column" fluid>
              <h1 class="font-weight-bold mb-4 text-h5 text-sm-h4 text-center">
                仿真实验结果
              </h1>
              <p class="text-subtitle-1 text-medium-emphasis mb-10 text-center">
                仿真实验结果是多方面的，它可以帮助我们更好地理解、预测、优化和控制各种系统和过程。
              </p>
              <v-row dense justify="center">
                <v-col cols="6">
                  <v-sheet class="pa-6" rounded="lg" variant="flat">
                    <v-list-item class="text-center" subtitle="实验得分">
                      <template #title>
                        <p class="text-h4 font-weight-bold pb-2">
                          {{ simulation.score }}
                        </p>
                      </template>
                    </v-list-item>
                  </v-sheet>
                </v-col>
                <v-col cols="6">
                  <v-sheet class="pa-6" rounded="lg" variant="flat">
                    <v-list-item class="text-center" subtitle="实验用时">
                      <template #title>
                        <p class="text-h4 font-weight-bold pb-2">
                          {{ simulation.timeUsed }} 秒
                        </p>
                      </template>
                    </v-list-item>
                  </v-sheet>
                </v-col>
              </v-row>
              <section>
                <h3 class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold my-4">
                  仿真实验步骤
                </h3>
                <v-data-table class="bg-transparent" hide-default-footer :headers="simulationStepsHeaders"
                  :items="simulation.steps">
                </v-data-table>
              </section>
            </v-container>
          </v-responsive>
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
const simulationStepsHeaders = [
  { title: '步骤名', key: 'name', align: 'start', nowrap: true },
  { title: '是否完成', key: 'correct', nowrap: true },
  { title: '得分', key: 'score', nowrap: true },
  { title: '满分', key: 'fullscore', nowrap: true },
  { title: '赋分模型', key: 'scoringModel', nowrap: true },
]

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
      const res = await ResourceTestpaperApi.exam(value.rid)
      item.value.name = res.name
      testpaper.value.questions = res.questions
    } catch (e) { /* empty */ }
    try {
      const res = await CourseResourceApi.logDataInfo(value.crlid)
      testpaper.value.questions.forEach(question => {
        const selfAnswer = res.find(item => item.qid == question.id)
        question.answer = useAnswerFormat(selfAnswer.answer, question.type)
        question.options = question.options.map(item => item.name)
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
  dialog.value = true
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped></style>
