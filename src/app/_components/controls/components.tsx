"use client";
import { observer } from "mobx-react-lite";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Input } from "~/components/ui/input";
import Matter, { Bodies } from "matter-js";
import { useContext, useState } from "react";
import { EngineContext } from "~/app/_context/engineContext";
import Component from "./component";

const Components = () => {
  const controller = useContext(EngineContext);
  const [component, setComponent] = useState<Matter.Body | null>(null);
  const [editing, setEditing] = useState(false);

  const formSchema = z.object({
    // red green blue
    color: z.string(),
    shape: z.enum(["rectangle"]),
    size: z
      .number()
      .max(5, { message: "Number must be between 1 and 5" })
      .min(1, { message: "Number must be between 1 and 5" }),
  });

  //pro of zod is that we can define custom messages
  //pro of using a type is that we can have 1 source of truth for the component types shared with everything

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "#0000FF",
      shape: "rectangle",
      size: 1,
    },
  });

  const addComponent = (values: z.infer<typeof formSchema>) => {
    // we gotta make it into a Matter.Bodies thingy and put it in the simulation
    const [x, y] = controller.getRandomPosition();
    const body = Bodies.rectangle(x!, y!, 50, 50, {
      ...controller.defaultOptions,
      render: {
        fillStyle: values.color,
      },
    });

    controller.addComponent(body);
    console.log(values);
  };

  const updateComponent = (values: z.infer<typeof formSchema>) => {
    if (component) {
      controller.updateComponent(component.id, values);
    }
    form.reset();
    setEditing(false);
  };

  console.log(component);

  const setFormComponent = (component: Matter.Body) => {
    setEditing(true);
    setComponent(component);
    const color = component.render.fillStyle;

    form.reset({
      color: color ?? "#0000FF",
    });
  };

  const colorSelectMap = new Map([
    ["Red", "#FF0000"],
    ["Green", "#008000"],
    ["Blue", "#0000FF"],
  ]);

  return (
    <div>
      <h3>Add Elements</h3>
      <Form {...form}>
        <form
          onSubmit={
            editing
              ? form.handleSubmit(updateComponent)
              : form.handleSubmit(addComponent)
          }
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from(colorSelectMap.entries()).map(
                      ([name, value]) => (
                        <SelectItem key={value} value={value}>
                          {name}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shape"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shape</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="rectangle">Rectangle</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="5" {...field} />
                </FormControl>
                <FormDescription>Enter a size between 1 and 5.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{editing ? "Update" : "Add"}</Button>
        </form>
      </Form>
      {controller.components.map((component) => (
        <Component
          component={component}
          key={component.id}
          onClick={setFormComponent}
        />
      ))}
    </div>
  );
};

export default observer(Components);
