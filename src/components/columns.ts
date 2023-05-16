import { FunctionalWidget, StatelessWidget, statelessFunctionWidget } from "widgetsjs";

type ColumnsState = {
  one: string;
  two: string;
}

const Columns: FunctionalWidget<StatelessWidget> = function() {
  this.onMount = () => {
    const elemOne = this.$ref<HTMLDivElement>(this.state.one);
    const elemTwo = this.$ref<HTMLDivElement>(this.state.two);

    elemOne.style.gridArea = "1 / 1 / 2 / 2"
    elemTwo.style.gridArea = "1 / 2 / 2 / 3"

    elemOne.setAttribute("style", "")
  }

  return (state: ColumnsState) => {
    const elemId = Math.random().toString().replace(".", "")
    return `
    
    <style>
      div.column_${elemId} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
      }
    </style>

    <div class="column_${elemId}">
      ${this.widgetChildren}
    </div>
    `
  }
}

export const ColumnsElement = statelessFunctionWidget(Columns);