import { useComponent } from "widgetsjs";
import { SquiglyLine } from "./components/squigly";
import { BoxElement } from "./components/box";
import { HeadlineElement } from "./components/headline";
import { ColumnsElement } from "./components/columns";
import { TextElement } from "./components/text";
import { ExperienceElement } from "./components/experience";

useComponent(SquiglyLine).as("squigly-line");
useComponent(BoxElement).as("info-box");
useComponent(HeadlineElement).as("info-headline");
useComponent(ColumnsElement).as("box-columns");
useComponent(TextElement).as("info-text");
useComponent(ExperienceElement).as("info-experience");