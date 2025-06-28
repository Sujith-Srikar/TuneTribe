import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../utils/cn";

const Slider = React.forwardRef(
  (
    {
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const _values = React.useMemo(
      () =>
        Array.isArray(value)
          ? value
          : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
      [value, defaultValue, min]
    );

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-neutral-800">
          <SliderPrimitive.Range className="absolute h-full bg-amber-800 rounded-full" />
        </SliderPrimitive.Track>
        {_values.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-3 w-3 rounded-full border border-amber-500 bg-amber-500 shadow-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
