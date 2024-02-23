"use client";
import { Input } from "@/components/ui/input";
import React from "react";

type OptionItemProps = {
  option: string;
  index: number;
  onChange: (index: number, value: string) => void;
};

const OptionItem: React.FC<OptionItemProps> = ({ option, index, onChange }) => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={option}
        placeholder="옵션을 입력하세요"
        onChange={(e) => onChange(index, e.target.value)}
      />
    </div>
  );
};

export default OptionItem;
