<script setup lang="ts">
interface EducationItem {
  year: string
  school: string
  degree: string
}

const educationData: EducationItem[] = [
  {
    year: '2010 - 2014',
    school: '西北民族大学',
    degree: '学士学位'
  },
  {
    year: '2014 - 2020',
    school: '上海理工大学/丹麦科技大学',
    degree: '硕士/博士学位'
  },
  {
    year: '2020 - 2023',
    school: '中山大学',
    degree: '博士后'
  },
  {
    year: '2023 - 至今',
    school: '扬州大学',
    degree: '特聘教授、江苏省科技副司、省青年托举人才'
  }
]
</script>

<template>
  <div class="self-intro-container" flex="~ row justify-between" h="full" w="full" bg="gradient-to-r from-blue-400 to-blue-900">
    <!-- 左侧个人信息 -->
    <div class="left-section" flex="~ col justify-center" p="l-0 y-0" relative v-motion :initial="{ x: -80 }"
      :enter="{ x: 0, y: 0 }" transition="ease-out" duration="1000">
      <!-- 个人照片占位 -->
      <div class="photo-placeholder" dark:bg="#4f71be" overflow="hidden" light:bg="lightblue" h="full" rounded="lg"
        flex="~ items-center justify-center">
        <!-- <div text="gray-500 lg" font="bold"> -->
        <img src="/tina.png" alt="Slidev Logo" class=" h-full" />
        <!-- </div> -->
      </div>

      <!-- 姓名 -->
      <div class="name-section" mb="4" absolute top="20" left="6" font="italic">
        <h4 text="2xl" font="bold" mb="2">田甜</h4>
        <h5 text="2xl" opacity-50 font="light">Tian Tian</h5>
      </div>
    </div>


    <!-- 右侧教育经历时间轴 -->
    <div class="right-section" flex="~ col justify-center" w="50%" p="l-8 y-0">
      <div class="timeline-container" relative>
        <!-- 时间轴线条 -->
        <div class="timeline-line" absolute left="4" top="0" bottom="0" w="1" dark:bg="gray" light:bg="blue-300"></div>

        <!-- 教育经历项目 -->
        <div class="education-items" space="y-8">
          <div v-for="(item, index) in educationData" :key="index" class="education-item" flex="~ items-center"
            relative>
            <!-- 时间轴圆点 -->
            <div class="timeline-dot" w="3" h="3" rounded="full" absolute left="3" z="10" dark:bg="gray"
              light:bg="blue-300"></div>

            <!-- 年份 -->
            <div class="year-label" text="sm" font="mono" w="24" ml="12" italic>
              {{ item.year }}
            </div>

            <!-- 学校信息卡片 -->
            <div class="school-card" backdrop="blur-sm" rounded="xl" p="x-2" ml="8" flex="1">
              <div>
                <span text="sm">{{ item.school }}</span>
                <br>
                <span text="xs" dark:text="gray" light:text="gray-500">{{ item.degree }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部研究信息 -->
    <div class="research-info" absolute bottom="0" right="-10" p="x-8 y-4">
      <p text="xs" leading="relaxed">
        主要研究方向为光电纳米材料，团队目前现有杨德芳、李文广和雷昌盛教师4名，博士后1名，博士生2名，研究生22名
      </p>
    </div>
  </div>
</template>

<style scoped>
.self-intro-container {
  min-height: 500px;
  position: relative;
}

.photo-placeholder {
  ;
  box-shadow: 0 8px 32px rgba(93, 140, 202, 0.3);
  display: block;
  /* width: 126px; */
  /* height: 180px; */
  /* background-color: red; */
  border-radius: 90% 50% 90% 50% / 60% 80% 40% 60%;
  transition: all 1s ease;
}

.school-card {
  transition: all 0.3s ease;
}

.school-card:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.3);
}

.timeline-dot {
  /* box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3); */
}

.education-item {
  transition: all 0.3s ease;
}

.education-item:hover .timeline-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.4);
}
</style>