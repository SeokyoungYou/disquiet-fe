"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OptionItem from "./_components/OptionItem";
import { Plus, X } from "lucide-react";

const formSchema = z.object({
  question: z.string().min(2).max(50),
  options: z.array(z.string()),
  period: z.string(),
  isSingle: z.boolean(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: ["", "", ""],
      period: "1주",
      isSingle: true,
    },
  });

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...form.getValues("options")];
    newOptions[index] = value;
    form.setValue("options", newOptions); // Update the options in the form state
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="p-8">
      <span>투표 생성하기</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>질문</FormLabel>
                <FormControl>
                  <Input
                    placeholder="예시) 어떤 개발 언어를 사용하시나요?"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="flex flex-col gap-4">
            <label>답변</label>
            {form.watch("options").map((option, index) => (
              <li key={index} className="flex items-center gap-4">
                <span>{`옵션 ${index + 1}`}</span>
                <OptionItem
                  option={option}
                  index={index}
                  onChange={handleOptionChange} // Pass the handler to each OptionItem
                />
                <X width={16} height={16} />
              </li>
            ))}
            <Button type="submit">
              <Plus width={16} height={16} className=" text-white" />
              옵션 추가하기
            </Button>
          </ul>
          <Button type="submit">투표 생성하기</Button>
        </form>
      </Form>
      <section>
        <span>질문</span>
      </section>
    </main>
  );
}
