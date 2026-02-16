import { LogoCloud } from "@/components/ui/logo-cloud-2";

export function LogoSection() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24 border-b border-gray-200/50">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h2 className="mb-12 text-center font-normal text-4xl text-gray-900 tracking-tight md:text-5xl">
          Trusted by leading security teams
        </h2>

        <LogoCloud />
      </div>
    </section>
  );
}
