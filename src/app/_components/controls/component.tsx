import Matter from "matter-js";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { ComponentController } from "./componentController";
type ComponentProps = {
  component: ComponentController;
  onClick: (component: ComponentController) => void;
};

const Component = (props: ComponentProps) => {
  const { id } = props.component.body;
  return (
    <Card
      className="hover:cursor-pointer"
      onClick={() => props.onClick(props.component)}
    >
      <CardHeader>
        <CardTitle>{id}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Component;
