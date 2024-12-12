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

const Components = () => {
  const formSchema = z.object({
    // red green blue
    color: z.enum(["#FF0000", "#008000", "#0000FF"]),
    shape: z.enum(["rectangle"]),
    size: z
      .number()
      .max(5, { message: "Number must be between 1 and 5" })
      .min(1, { message: "Number must be between 1 and 5" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: "#0000FF",
      shape: "rectangle",
      size: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // we gotta make it into a Matter.Bodies thingy and put it in the simulation
    console.log(values);
  };

  return (
    <div>
      <h3>Add Elements</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <SelectItem value="#FF0000">Red</SelectItem>
                    <SelectItem value="#008000">Green</SelectItem>
                    <SelectItem value="#0000FF">Blue</SelectItem>
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default observer(Components);
