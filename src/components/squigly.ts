import { FunctionalWidget, StatelessWidget, statelessFunctionWidget } from "widgetsjs";
const startTime = new Date().getTime();

function getPath(width: number, height: number) {
  var width = width;
  var spacing = 0.08;
  var loopNum = 0;
  var i = 0;
  const pointList: number[][] = [];

  for (i = 0; i < width / 2; i++) {
    pointList[loopNum] = [loopNum, Math.sin(loopNum * spacing) * (i * height) + 100];
    loopNum++;
  }

  for (i = width / 2; i > 0; i--) {
    pointList[loopNum] = [loopNum, Math.sin(loopNum * spacing) * (i * height) + 100];
    loopNum++;
  }

  return pointList;
}

type SquiglyLineState = {
  width: number,
  height: number
};

const squiglyLine: FunctionalWidget<StatelessWidget> = function () {

  const genDivs = (width: number) => {
    let r = ""
    while (width > 0) {
      r += "<div class='squigly-element'></div>"
      width--;
    }

    return r;
  }

  this.onMount = () => {
    const holder = this.$child<HTMLDivElement>(".squigly-holder");
    console.log(holder)
    Array.from(holder.children).forEach((e, i) => {
      const m = Math.sin((360/this.state.height/2) * i)
      e.animate([
        {transform: `translateY(${m * this.state.height}px)`},
        {transform: `translateY(-${this.state.height/2}px)`}
      ], {
        duration: 200,
        iterations: Infinity
      })
    })
  }
  
  return (state: SquiglyLineState) => `
    <style>
      .squigly-element {
        height: ${state.height}px;
        width: ${state.height}px;
        background-color: black;
        border-radius: 50%;
        display: inline-block;
        margin-left: -${state.height * 0.75}px;
      }

      .squigly-holder {
        margin-left: ${state.height}px;
      }
    </style>
    <div class="squigly-holder">
      ${genDivs(state.width)}
    </div>
  `
}

export const SquiglyLine = statelessFunctionWidget(squiglyLine);
