import { FunctionalWidget, StatelessWidget, statelessFunctionWidget } from "widgetsjs";

type BoxElementState = {
  padding: string;
  color: string;
  outline: 'shadow' | 'outline'
  outline_size: string;
  margin: string;
}

const Box: FunctionalWidget<StatelessWidget> = function() {
  return (state: BoxElementState) => {
    return `
      <div style="
      padding: ${state.padding || "20px"};
      background-color: ${state.color || "red"};
      ${state.outline == 'shadow' ? 'box-shadow: ' + state.outline_size +  ' ' + state.outline_size +  ' black' : ""};
      ${state.outline == 'outline' ? 'border: ' + state.outline_size +  ' solid black' : ""};
      ${state.margin ? "margin: " + state.margin : ""};
      ">
        ${this.widgetChildren}
      </div>

  `
  }
}

export const BoxElement = statelessFunctionWidget(Box, {outline_size: "10px"});