import { FunctionalWidget, StatelessWidget, statelessFunctionWidget } from "widgetsjs";

const elementToSizeMap = {
  's': "p",
  'm': "p",
  'l': "p"
}

const titleElementToSizeMap = {
  's': "h6",
  'm': "h5",
  'l': "h4"
}

const elementToThicknessMap = {
  's': "1px",
  'm': "2px",
  'l': "2px"
}

const elementToPaddingMap = {
  's': "2px",
  'm': "3px",
  'l': "5px",
}

type TextState = {
  size: 's' | 'm' | 'l';
  underline: boolean;
  font: string;
  space: string;
  title: boolean;
  align_center: boolean;
}

const Text: FunctionalWidget<StatelessWidget> = function () {
  return (state: TextState) => {
    const map = state.title ? titleElementToSizeMap: elementToSizeMap;
    const elem = map[state.size]

    console.log(this, state)

    return `
    <div style="${state.align_center ? "text-align: center;" : ""}padding: ${elementToPaddingMap[state.size]} 0;" class="Text">
      <${elem} style="
      ${state.underline ? "border-bottom: " + elementToThicknessMap[state.size] + " solid #000" : ""};
      ${state.font ? "font: " + state.font : ""};
      ${state.space ? "padding-bottom: " + state.space : ""};
      display: inline;
      ">${this.widgetChildren}</${elem}>
    </div>
    `
  }
}

export const TextElement = statelessFunctionWidget(Text, {size: 'l', space: '5px', align_center: true}, {underline: Boolean, subtitle: Boolean, align_center: (i: string) => i == "false" ? false : "true"});