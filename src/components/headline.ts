import { FunctionalWidget, StatelessWidget, statelessFunctionWidget } from "widgetsjs";

const elementToSizeMap = {
  's': "h4",
  'm': "h3",
  'l': "h1"
}

const subElementToSizeMap = {
  's': "h6",
  'm': "h5",
  'l': "h2"
}

const elementToThicknessMap = {
  's': "1px",
  'm': "2px",
  'l': "5px"
}

const elementToPaddingMap = {
  's': "5px",
  'm': "10px",
  'l': "20px",
}

type HeadlineState = {
  size: 's' | 'm' | 'l';
  underline: boolean;
  font: string;
  space: string;
  subtitle: boolean;
  align_center: boolean;
}

const Headline: FunctionalWidget<StatelessWidget> = function () {
  return (state: HeadlineState) => {
    const map = state.subtitle ? subElementToSizeMap: elementToSizeMap;
    const elem = map[state.size]

    return `
    <div style="${state.align_center ? "text-align: center;" : ""};padding: ${elementToPaddingMap[state.size]};" class="headline">
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

export const HeadlineElement = statelessFunctionWidget(Headline, {size: 'l', space: '5px'}, {underline: Boolean, subtitle: Boolean});