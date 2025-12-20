/**
 * TVA (Tailwind Variant Authority) - Local implementation
 * A utility for creating type-safe variant-based class names
 */

type ClassValue = string | undefined | null | false;

interface VariantConfig {
  [key: string]: string;
}

interface VariantsConfig {
  [key: string]: VariantConfig;
}

interface CompoundVariant {
  [key: string]: string | boolean;
  class: string;
}

interface TvaConfig {
  base?: string;
  variants?: VariantsConfig;
  compoundVariants?: CompoundVariant[];
  defaultVariants?: { [key: string]: string | boolean };
}

type VariantProps<T extends TvaConfig> = T["variants"] extends VariantsConfig
  ? {
      [K in keyof T["variants"]]?: keyof T["variants"][K] | boolean;
    } & { className?: string }
  : { className?: string };

function clsx(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export function tva<T extends TvaConfig>(config: T) {
  return (props?: VariantProps<T>): string => {
    const { base = "", variants = {}, compoundVariants = [], defaultVariants = {} } = config;
    const mergedProps = { ...defaultVariants, ...props };
    const { className, ...variantProps } = mergedProps as any;

    // Get variant classes
    const variantClasses: string[] = [];
    for (const [variantKey, variantValue] of Object.entries(variantProps)) {
      if (variantValue !== undefined && variants[variantKey]) {
        const variantClass = variants[variantKey][String(variantValue)];
        if (variantClass) {
          variantClasses.push(variantClass);
        }
      }
    }

    // Get compound variant classes
    const compoundClasses: string[] = [];
    for (const compound of compoundVariants) {
      const { class: compoundClass, ...conditions } = compound;
      const matches = Object.entries(conditions).every(([key, value]) => {
        return (mergedProps as Record<string, unknown>)[key] === value;
      });
      if (matches && compoundClass) {
        compoundClasses.push(compoundClass);
      }
    }

    return clsx(base, ...variantClasses, ...compoundClasses, className);
  };
}

export default tva;
