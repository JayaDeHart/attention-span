import Matter from "matter-js";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
type ComponentProps = {
  component: Matter.Body;
  onClick: (component: Matter.Body) => void;
};

const Component = (props: ComponentProps) => {
  const { id } = props.component;
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
