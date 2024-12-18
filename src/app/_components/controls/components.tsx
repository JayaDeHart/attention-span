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
import { Color, ComponentValues, Shape } from "../types";
import Component from "./component";
import { ComponentController } from "./componentController";

const Components = () => {
  const controller = useContext(EngineContext);
  const [component, setComponent] = useState<ComponentController | null>(null);
  const [editing, setEditing] = useState(false);

  const form = useForm<ComponentValues>({
    defaultValues: {
      color: Color.Green,
      shape: Shape.Square,
      size: 50,
    },
  });

  const addComponent = (values: ComponentValues) => {
    controller.addComponent(values);
    form.reset();
    setEditing(false);
  };

  const updateComponent = (values: ComponentValues) => {
    if (component) {
      controller.updateComponent(component.body.id, values);
    }
    form.reset();
    setEditing(false);
  };

  const setFormComponent = (component: ComponentController) => {
    setEditing(true);
    setComponent(component);
    const values = component.values;
    form.reset(values);
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
          key={component.body.id}
          onClick={setFormComponent}
        />
      ))}
    </div>
  );
};

export default observer(Components);

//TODO:
// fix the errors in this component
// fix the updatecomponent method in enginecontroller
//test out the behavior
