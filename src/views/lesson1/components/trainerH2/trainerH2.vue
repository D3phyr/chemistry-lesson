<template>
<div :class="[$style.wrapper, dragging && $style.nonCursor]">
    <div :class="$style.elementContainer">
        <vElemDescGraphite :class="[tabletStageEnd && $style.elementAmimation]" :status="graphiteStatus"/>
        <vElemDescVitriol :class="[tabletStageEnd && $style.elementAmimation]" :status="vitriolStatus" />
        <vElemDescHydroxide :class="[tabletStageEnd && $style.elementAmimation]" :status="hydroxideStatus" />
        <vElemDescSand :class="[tabletStageEnd && $style.elementAmimation]" :status="sandStatus" />
        <vElemDescAcid :class="[tabletStageEnd && $style.elementAmimation]" :status="acidStatus" />
    </div>
    <div :class="$style.cupboard">
        <div :class="$style.itemContainer">
            <div :class="$style.elementItemContainer">
                <div v-if="graphiteStatus !== 2" :class="$style.elementGraphit">
                    <div :class="$style.elementGraphitPlate"></div>
                </div>
                <div v-if="graphiteStatus !== 2" :class="[$style.elementHelp,!graphiteHelp && $style.disableHelp]"></div>
                <div v-if="!graphiteStatus" :class="[$style.elementTrigger, 'elementTriggerGraphite']"></div>
            </div>
            <div :class="$style.elementItemContainer">
                <div v-if="vitriolStatus !== 2" :class="$style.elementVitriol">
                    <div :class="$style.elementVitriolPlate"></div>
                </div>
                <div v-if="vitriolStatus !== 2" :class="[$style.elementHelp,!vitriolHelp && $style.disableHelp]"></div>
                <div v-if="!vitriolStatus" :class="[$style.elementTrigger, 'elementTriggerVitriol']"></div>
            </div>
            <div :class="$style.elementItemContainer">
                <div v-if="hydroxideStatus !== 2" :class="$style.elementHydroxide">
                    <div :class="$style.elementHydroxidePlate"></div>
                </div>
                <div v-if="hydroxideStatus !== 2" :class="[$style.elementHelp,!hydroxideHelp && $style.disableHelp]"></div>
                <div v-if="!hydroxideStatus" :class="[$style.elementTrigger, 'elementTriggerHydroxide']"></div>
            </div>
            <div :class="$style.elementItemContainer">
                <div v-if="sandStatus !== 2" :class="$style.elementSand">
                    <div :class="$style.elementSandPlate"></div>
                </div>
                <div v-if="sandStatus !== 2" :class="[$style.elementHelp,!sandHelp && $style.disableHelp]"></div>
                <div v-if="!sandStatus" :class="[$style.elementTrigger, 'elementTriggerSand']"></div>
            </div>
            <div :class="$style.elementItemContainer">
                <div v-if="acidStatus !== 2" :class="$style.elementAcid">
                    <div :class="$style.elementAcidPlate"></div>
                </div>
                <div v-if="acidStatus !== 2" :class="[$style.elementHelp,!acidHelp && $style.disableHelp]"></div>
                <div v-if="!acidStatus" :class="[$style.elementTrigger, 'elementTriggerAcid']"></div>
            </div>
        </div>
    </div>
    <div :class="$style.tableBackground"></div>

    <div :class="$style.computerContainer">
        <div :class="[$style.computerInputHelp,!computerHelp && $style.disableHelp]">
            <div v-if="stage === 2" :class="[$style.computerInput, $style[tubeFixed]]">
                <div :class="$style.computerInputHolderLeft"></div>
                <div :class="$style.computerInputHolderRight"></div>
            </div>
        </div>
        <div :class="[$style.computerTrigger, 'computerTrigger']" ></div>
        <div :class="[$style.computerOutput, $style[computerStatus]]"></div>
        <div :class="$style.computerElementName">{{computerElementName}}</div>
    </div>

    <div :class="[$style.tripodHelp,!tripodHelp && $style.disableHelp]">
        <div :class="[$style.tripodTrigger, 'tripodTrigger', tripodFixed && $style.triggerExtension]" ></div>
        <div :class="$style.tripod">
            <div v-if="stage === 4 || stage === 5 || stage === 5.7" :class="[$style.tubeFixedContainer, $style[tubeFixed]]"></div>
        </div>
    </div>

    <div :class="$style.hanger">
        <div v-if="stage === -1 || stage === 7 || stage === 7.5" :class="[$style.hangerHelp, hangerHelp === 1 && $style.hangerHelpDimly, hangerHelp === 2 && $style.disableHelp, hangerHelp === 0 && $style.shakeHelp]"></div>
        <div @click="changeStage(-0.5)"
            v-if="stage === -1 || stage === 7 || stage === 7.5"
            :class="[$style.hangerTrigger,
            hangerHelp !== 1 && $style.hangerImg,
            hangerHelp === 1 && $style.hangerTriggerExtend]">
        </div>
        <div :class="$style.hangerUpper"></div>
    </div>

    <div :class="[$style.flaskHelp,!flaskHelp && $style.disableHelp]">
        <div :class="[$style.flaskTrigger, 'flaskTrigger']" ></div>
        <div :class="$style.flask"></div>
    </div>

    <Tablet width="53.2rem" height="77.9rem" profBottom="12rem" profRight="-1.4rem" :class="$style.tablet">
        <tablet-test
        :changeStage="tabletStage"
        :changeStageToEnd="tabletStageEnd"
        :tabletReset="tabletReset"
        :experimentNumber="experimentNumber"
        @nextSlide="nextSlide"
        @changeStage="changeStage"
        @reset="resetExperiment"
        @success="$emit('success')"
        :currentElement="currentElement"/>
    </Tablet>

    <VueDragResize
    v-if="stage === 3"
    :class="[$style.vueDrag,
    !dragging && $style.upperBlock,
    !dragging && $style.shake,
    drag2Hidden && $style.dragHidden]"
    :parentLimitation="false"
    :w="'auto'"
    :h="'auto'"
    :x="x2Position"
    :y="y2Position"
    :isResizable="false"
    :isDraggable="drag2Active"
    @dragging="onDragging"
    @dragstop="onDragstop">
        <div :class="[$style.tubeBlock, $style[status]]">
        </div>
    </VueDragResize>
    <VueDragResize
    v-if="stage !== -0.5 && stage !== -0.2 && stage !== 1.5 && stage !== 5.5 && !resizeEvent"
    :class="[$style.vueDrag,
    !dragging && $style.upperBlock,
    !drag3Active && $style.cursorPointer]"
    :parentLimitation="false"
    :w="'auto'"
    :h="'auto'"
    :x="x3Position"
    :y="y3Position"
    :isResizable="false"
    :isDraggable="drag3Active"
    @dragging="onDragging"
    @dragstop="onDragstop">
        <div :class="[$style.tubeFlaskHelp,!tubeFlaskHelp && $style.disableHelp]">
            <div :class="[$style.flaskTubeBlock, 'tubeFlaskAnimation']"></div>
        </div>
    </VueDragResize>
    <VueDragResize
    v-if="stage === 6  && !resizeEvent"
    :class="[$style.vueDrag,
    !dragging && $style.upperBlock,
    !dragging && $style.shake,
    drag4Hidden && $style.dragHidden]"
    :parentLimitation="true"
    :w="'auto'"
    :h="'auto'"
    :x="x4Position"
    :y="y4Position"
    :isResizable="false"
    :isDraggable="drag4Active"
    @dragging="onDragging"
    @dragstop="onDragstop">
        <div :class="[$style.tubeBlock, $style[status], 'flaskAnimation']">
        </div>
    </VueDragResize>
    <VueDragResize
    v-if="stage === 7"
    :class="[$style.vueDrag,
    !dragging && $style.upperBlock,
    !dragging && $style.shake,
    drag4Hidden && $style.dragHidden]"
    :parentLimitation="true"
    :w="'auto'"
    :h="'auto'"
    :x="x4Position"
    :y="y4Position"
    :isResizable="false"
    :isDraggable="drag4Active"
    @dragging="onDragging"
    @dragstop="onDragstop">
        <div :class="[$style.tubeBlock, $style[status]]">
        </div>
    </VueDragResize>
        <VueDragResize
    v-if="(stage === -0.2 || stage === 0 || stage === 1) && !resizeEvent"
    :class="[$style.vueDrag,
    !dragging && $style.upperBlock,
    !dragging && $style.shake,
    drag1Hidden && $style.dragHidden]"
    :parentLimitation="false"
    :w="'auto'"
    :h="'auto'"
    :x="xPosition"
    :y="yPosition"
    :isResizable="false"
    :isDraggable="drag1Active"
    @dragging="(e) => onDragging(e)"
    @dragstop="onDragstop">
        <div :class="[$style.tubeBlock, $style[status]]">
        </div>
    </VueDragResize>
</div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import gsap from 'gsap'
import vElemDescAcid from './components/elemDescAcid/elemDesc'
import vElemDescSand from './components/elemDescSand/elemDesc'
import vElemDescGraphite from './components/elemDescGraphite/elemDesc'
import vElemDescVitriol from './components/elemDescVitriol/elemDesc'
import vElemDescHydroxide from './components/elemDescHydroxide/elemDesc'
import Tablet from '../../../../components/@ui/tablet/Tablet.vue'
import TabletTest from './components/TabletTest/TabletTest'

export default {
    name: 'trainerH1',
        components: {
            VueDragResize, Tablet, vElemDescAcid, vElemDescSand, vElemDescGraphite, vElemDescHydroxide, vElemDescVitriol, TabletTest,
        },
    data: () => ({
        stage: -1,
        status: 'tube',
        element: 'none',
        tabletStage: 0,
        tabletStageEnd: 0,
        tabletReset: false,
        dragging: false,
        experimentNumber: 0,
        resizeEvent: false,
        timeEnable: false,

        graphiteStatus: 0,
        vitriolStatus: 0,
        hydroxideStatus: 0,
        sandStatus: 0,
        acidStatus: 0,

        currentElement: null,

        graphiteHelp: false,
        vitriolHelp: false,
        hydroxideHelp: false,
        sandHelp: false,
        acidHelp: false,
        tripodHelp: false,
        flaskHelp: false,
        tubeFlaskHelp: false,
        computerHelp: false,
        hangerHelp: 0,
        computerElementName: '',

        tubeFixed: 'none',
        computerStatus: 'none',
        tripodFixed: false,

        drag1Active: true,
        drag1Hidden: false,
        xPosition: 0,
        yPosition: 0,

        drag2Active: false,
        drag2Hidden: true,
        x2Position: 0,
        y2Position: 0,

        drag3Active: false,
        drag3Hidden: true,
        x3Position: 0,
        y3Position: 0,

        drag4Active: false,
        drag4Hidden: true,
        x4Position: 0,
        y4Position: 0,
    }),
    methods: {
        nextSlide() {
            if (this.tabletStage === 1) {
                this.changeStage(3)
                this.tabletStage = 3
            } else if (this.tabletStage === 5) {
                this.changeStage(5.5)
            } else {
                this.tabletStage += 1
            }
        },
        onDragging(e) {
            const target = document.elementFromPoint(e.left, e.top)
            if (this.stage === 1) {
                this.xPosition = e.left / 2
                this.yPosition = e.top / 3
            }
            if (target.className.includes('elementTriggerGraphite')) {
                this.xPosition = e.left
                this.yPosition = e.top
                this.changeStage(1)
            }
            if (target.className.includes('elementTriggerVitriol')) {
                this.xPosition = e.left
                this.yPosition = e.top
                this.changeStage(1.1)
            }
            if (target.className.includes('elementTriggerHydroxide')) {
                this.xPosition = e.left
                this.yPosition = e.top
                this.changeStage(1.2)
            }
            if (target.className.includes('elementTriggerSand')) {
                this.xPosition = e.left
                this.yPosition = e.top
                this.changeStage(1.3)
            }
            if (target.className.includes('elementTriggerAcid')) {
                this.xPosition = e.left
                this.yPosition = e.top
                this.changeStage(1.4)
            }
            if (target.className.includes('computerTrigger')) {
                this.changeStage(1.5)
            }
            if (target.className.includes('tripodTrigger') && this.stage === 3) {
                this.changeStage(3.5)
            }
            if (target.className.includes('tripodTrigger') && this.stage === 4) {
                this.changeStage(5)
            }
            if (target.className.includes('flaskTrigger')) {
                this.changeStage(7)
            }
            if (target.className.includes('hangerTrigger')) {
                this.changeStage(7.5)
            }
            if (this.drag1Active || this.drag2Active || this.drag3Active || this.drag4Active) {
                this.dragging = true
            }
            if (this.drag3Active) {
                this.tubeFlaskHelp = false
            }
        },
        onDragstop() {
            this.dragging = false
            if (this.stage === 5) {
                this.changeStage(5.5)
                this.drag3Active = false
                this.drag3Hidden = true
            }
        },
        resetExperiment() {
            this.stage = -1
            this.status = 'tube'
            this.tabletStage = 0
            this.timeEnable = false
        },
        async changeStage(val) {
            if (val === -0.5 && this.stage === -1) {
                this.stage = -0.5
                this.$nextTick(() => {
                    this.changeStage(-0.2)
                })
            }
            if (val === -0.2 && this.stage === -0.5) {
                this.stage = -0.2
                this.$nextTick(() => {
                    this.changeStage(0)
                })
            }
            if (val === 0 && this.stage === -0.2) {
                this.stage = 0
                this.drag1Active = true
                this.drag1Hidden = false
                this.graphiteHelp = true
                this.vitriolHelp = true
                this.hydroxideHelp = true
                this.sandHelp = true
                this.acidHelp = true
                this.tabletStage += 1
                if (this.graphiteStatus === 0) {
                    this.graphiteHelp = true
                }
                if (this.vitriolStatus === 0) {
                    this.vitriolHelp = true
                }
                if (this.hydroxideStatus === 0) {
                    this.hydroxideHelp = true
                }
                if (this.sandStatus === 0) {
                    this.sandHelp = true
                }
                if (this.acidStatus === 0) {
                    this.acidHelp = true
                }
                this.resize()
            }
            if (val === 1 && this.dragging === true && this.stage === 0) {
                this.stage = 1
                this.status = 'tubeGraphite'
                this.computerHelp = true
                this.graphiteStatus = 1
                this.currentElement = 0
                this.graphiteHelp = false
                this.vitriolHelp = false
                this.hydroxideHelp = false
                this.sandHelp = false
                this.acidHelp = false
            }
            if (val === 1.1 && this.dragging === true && this.stage === 0) {
                this.stage = 1
                this.status = 'tubeVitriol'
                this.computerHelp = true
                this.vitriolStatus = 1
                this.currentElement = 1
                this.graphiteHelp = false
                this.vitriolHelp = false
                this.hydroxideHelp = false
                this.sandHelp = false
                this.acidHelp = false
            }
            if (val === 1.2 && this.dragging === true && this.stage === 0) {
                this.stage = 1
                this.status = 'tubeHydroxide'
                this.computerHelp = true
                this.hydroxideStatus = 1
                this.currentElement = 2
                this.graphiteHelp = false
                this.vitriolHelp = false
                this.hydroxideHelp = false
                this.sandHelp = false
                this.acidHelp = false
            }
            if (val === 1.3 && this.dragging === true && this.stage === 0) {
                this.stage = 1
                this.status = 'tubeSand'
                this.computerHelp = true
                this.sandStatus = 1
                this.currentElement = 3
                this.graphiteHelp = false
                this.vitriolHelp = false
                this.hydroxideHelp = false
                this.sandHelp = false
                this.acidHelp = false
            }
            if (val === 1.4 && this.dragging === true && this.stage === 0) {
                this.stage = 1
                this.status = 'tubeAcid'
                this.computerHelp = true
                this.acidStatus = 1
                this.currentElement = 4
                this.graphiteHelp = false
                this.vitriolHelp = false
                this.hydroxideHelp = false
                this.sandHelp = false
                this.acidHelp = false
            }
            if (val === 1.5 && this.dragging === true && this.stage >= 1 && this.stage < 2) {
                this.stage = 1.5
                this.$nextTick(() => {
                    this.changeStage(2)
                })
            }
            if (val === 2 && this.stage === 1.5) {
                this.stage = 2
                this.tabletStage += 1
                this.dragging = false
                this.drag1Active = false
                if (this.graphiteStatus === 1) {
                    this.computerStatus = 'graphiteComp'
                    this.tubeFixed = 'tubeGraphiteFixed'
                    this.computerElementName = 'Графит'
                }
                if (this.vitriolStatus === 1) {
                    this.computerStatus = 'vitriolComp'
                    this.tubeFixed = 'tubeVitriolFixed'
                    this.computerElementName = 'Медный Купорос'
                }
                if (this.hydroxideStatus === 1) {
                    this.computerStatus = 'hydroxideComp'
                    this.tubeFixed = 'tubeHydroxideFixed'
                    this.computerElementName = 'Гидроксид Меди'
                }
                if (this.sandStatus === 1) {
                    this.computerStatus = 'sandComp'
                    this.tubeFixed = 'tubeSandFixed'
                    this.computerElementName = 'Песок'
                }
                if (this.acidStatus === 1) {
                    this.computerStatus = 'acidComp'
                    this.tubeFixed = 'tubeAcidFixed'
                    this.computerElementName = 'Серная кислота'
                }
                this.computerHelp = false
                this.drag1Hidden = true
            }
            if (val === 3 && this.stage === 2) {
                this.stage = 3
                // this.tabletStage += 1
                this.tubeFixed = 'none'
                this.computerStatus = 'none'
                this.computerElementName = ''
                this.drag2Hidden = false
                this.drag2Active = true
                this.tripodHelp = true
            }
            if (val === 3.5 && this.dragging === true && this.stage === 3) {
                this.stage = 3.5
                this.dragging = false
                this.drag2Active = false
                this.tripodHelp = false
                this.drag2Hidden = true
                this.tripodFixed = true
                if (this.graphiteStatus === 1) {
                    this.tubeFixed = 'tubeGraphiteFixedTripod'
                }
                if (this.vitriolStatus === 1) {
                    this.tubeFixed = 'tubeVitriolFixedTripod'
                }
                if (this.hydroxideStatus === 1) {
                    this.tubeFixed = 'tubeHydroxideFixedTripod'
                }
                if (this.sandStatus === 1) {
                    this.tubeFixed = 'tubeSandFixedTripod'
                }
                if (this.acidStatus === 1) {
                    this.tubeFixed = 'tubeAcidFixedTripod'
                }
                this.$nextTick(() => {
                    this.changeStage(4)
                })
            }
            if (val === 4 && this.stage === 3.5) {
                this.stage = 4
                if (this.acidStatus === 1) {
                    this.$nextTick(() => {
                        this.changeStage(5.7)
                        this.status = 'tubeAcidWater'
                    })
                } else {
                    this.tubeFlaskHelp = true
                    this.drag3Active = true
                    this.drag3Hidden = false
                }
            }

            if (val === 5 && this.dragging === true && this.stage < 5) {
                this.stage = 5
                await this.animateTubeFlask()
                this.tubeFlaskHelp = false
                if (this.graphiteStatus === 1) {
                    this.tubeFixed = 'tubeGraphiteFixedTripodWater'
                }
                if (this.vitriolStatus === 1) {
                    this.tubeFixed = 'tubeVitriolFixedTripodWater'
                }
                if (this.hydroxideStatus === 1) {
                    this.tubeFixed = 'tubeHydroxideFixedTripodWater'
                }
                if (this.sandStatus === 1) {
                    this.tubeFixed = 'tubeSandFixedTripodWater'
                }
                if (this.acidStatus === 1) {
                    this.tubeFixed = 'tubeAcidFixedTripodWater'
                }
            }
            if (val === 5.5 && this.stage === 5) {
                this.stage = 5.5
                this.drag3Active = false
                if (this.graphiteStatus === 1) {
                    this.status = 'tubeGraphiteWater'
                }
                if (this.vitriolStatus === 1) {
                    this.status = 'tubeVitriolWater'
                }
                if (this.hydroxideStatus === 1) {
                    this.status = 'tubeHydroxideWater'
                }
                if (this.sandStatus === 1) {
                    this.status = 'tubeSandWater'
                }
                if (this.acidStatus === 1) {
                    this.status = 'tubeAcidWater'
                }
                this.$nextTick(() => {
                    this.changeStage(5.7)
                })
            }
            if (val === 5.7 && (this.stage === 5.5 || this.stage === 4)) {
                this.stage = 5.7
                this.tabletStage = 6.5
            }
            if (val === 6 && this.stage === 5.7 && this.dragging === false) {
                this.stage = 6
                this.tubeFixed = 'none'
                this.tripodFixed = false
                this.drag4Active = true
                this.drag4Hidden = false
                this.flaskHelp = true
                this.tabletStage = 6.7
            }
            if (val === 7 && this.dragging === true && this.stage === 6 && !this.timeEnable) {
                await this.animateFlask()
                this.stage = 7
                this.flaskHelp = false
                this.hangerHelp = 1
                this.status = 'tube'
                if (this.graphiteStatus === 1) {
                    this.graphiteStatus = 2
                    this.experimentNumber = 1
                }
                if (this.vitriolStatus === 1) {
                    this.vitriolStatus = 2
                    this.experimentNumber = 1
                }
                if (this.hydroxideStatus === 1) {
                    this.hydroxideStatus = 2
                    this.experimentNumber = 1
                }
                if (this.sandStatus === 1) {
                    this.sandStatus = 2
                    this.experimentNumber = 1
                }
                if (this.acidStatus === 1) {
                    this.acidStatus = 2
                }
                this.tabletStage = 8
                setTimeout(() => {
                    this.timeEnable = true
                }, 1000)
            }
            if (val === 7.5 && this.dragging === true && this.stage === 7 && this.timeEnable) {
                this.stage = 7.5
                this.timeEnable = false
                this.tabletStage = 9
                this.hangerHelp = 2
                this.drag4Active = false
                this.drag4Hidden = true
                this.dragging = false
                if (this.graphiteStatus === 2 && this.vitriolStatus === 2 && this.hydroxideStatus === 2 && this.sandStatus === 2 && this.acidStatus === 2) {
                    this.$nextTick(() => {
                        this.tabletStageEnd = 1
                    })
                }
            }
            if (val === 8 && this.stage === 7.5) {
                this.stage = 8
                this.hangerHelp = 0
                this.tabletReset = !this.tabletReset
                this.resetExperiment()
            }
        },
        resize() {
            this.resizeEvent = true
            if (this.stage === 0) {
                this.xPosition = document.body.clientWidth / 2.5
                this.yPosition = document.body.clientHeight / 2.5
            } else {
                this.xPosition = document.body.clientWidth / 8
                this.yPosition = document.body.clientHeight / 2.5
            }
            this.x2Position = document.body.clientWidth / 11
            this.y2Position = document.body.clientHeight / 1.9
            this.x3Position = document.body.clientWidth / 3.2
            this.y3Position = document.body.clientHeight / 1.55
            this.x4Position = document.body.clientWidth / 6
            this.y4Position = document.body.clientHeight / 1.2
            this.$nextTick(() => {
                this.resizeEvent = false
            })
        },
        animateTubeFlask() {
            return new Promise((resolve) => {
                gsap.to('.tubeFlaskAnimation', {
                    rotation: 50,
                })
                setTimeout(() => {
                    resolve()
                }, 500)
            }).then(() => {
                gsap.to('.tubeFlaskAnimation', {
                    rotation: 0,
                })
            })
        },
        animateFlask() {
            return new Promise((resolve) => {
                gsap.to('.flaskAnimation', {
                    rotation: 120,
                })
                setTimeout(() => {
                    resolve()
                }, 500)
            }).then(() => {
                gsap.to('.flaskAnimation', {
                    rotation: 0,
                })
            })
        },
    },
    mounted() {
        this.resize()
        // this.x2Position = this.x2Position / 100 * window.innerWidth
        // this.y2Position = this.y2Position / 100 * window.innerHeight
        window.addEventListener('resize', this.resize)
        // console.log(this.x2Position, this.y2Position)
        // this.$refs.tubeFlask.style.left = this.x3Position
        // this.$refs.tubeFlask.style.top = this.y3Position
    },

}
</script>

<style lang="scss" module src="./trainerH2.scss"></style>
