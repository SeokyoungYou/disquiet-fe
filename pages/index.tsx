"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const SELECTOR_ITEMS = ["1주", "2주", "3주", "1달"];

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
    form.setValue("options", newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...form.getValues("options"), ""];
    form.setValue("options", newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = form.getValues("options").filter((_, i) => i !== index);
    form.setValue("options", newOptions);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <main className="p-8 flex flex-col gap-8">
      <span className="font-bold text-2xl">투표 생성하기</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={subtitle}>질문</FormLabel>
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
          <ul className="flex flex-col gap-4 ">
            <label className={subtitle}>답변</label>
            {form.watch("options").map((option, index) => (
              <li key={index} className="flex items-center gap-4">
                <span>{`옵션 ${index + 1}`}</span>
                <OptionItem
                  option={option}
                  index={index}
                  onChange={handleOptionChange}
                />
                <button
                  onClick={() => handleRemoveOption(index)}
                  aria-label="Remove option"
                >
                  <X width={16} height={16} />{" "}
                </button>
              </li>
            ))}
            <Button onClick={handleAddOption} type="button">
              <Plus width={16} height={16} className="text-white" /> 옵션
              추가하기
            </Button>
          </ul>
          <section>
            <span className={subtitle}>세부 설정</span>
            <div>
              <Controller
                name="period"
                control={form.control}
                render={({ field }) => (
                  <Select {...field} defaultValue={form.getValues("period")}>
                    <SelectTrigger>
                      <SelectValue placeholder="기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {SELECTOR_ITEMS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </section>
          <Button type="submit" className="w-full">
            투표 생성하기
          </Button>
        </form>
      </Form>
    </main>
  );
}

const subtitle = "text-gray-500";
