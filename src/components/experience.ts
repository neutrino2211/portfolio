import { FunctionalWidget, StatelessWidget, statelessFunctionWidget } from "widgetsjs";

type ExperienceState = {
  company: string;
  company_url: string;

  role: string;
  duration: string;

  last: boolean;
}

const Experience: FunctionalWidget<StatelessWidget> = function () {
  return (state: ExperienceState) => `
    <div style="${!state.last ? "border-bottom: 5px solid black;" : ""}padding: 10px 0;" class="list">
      <info-text align_center="false" font="1rem bold 'Poppins', sans-serif;"><a style="text-align: initial; color: initial;" href="${state.company_url}">${state.company.toUpperCase()}</a></info-text>
      <br>
      <div class="list-item">
        <p>${state.role.toUpperCase()}</p>
        <p>${state.duration.toUpperCase()}</p>
      </div>

      <p>
        ${this.widgetChildren}
      </p>
    </div>
  `
}

export const ExperienceElement = statelessFunctionWidget(Experience);