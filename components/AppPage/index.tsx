import { FC, useState } from "react";
import Header from "../AppUI/Header";
import { AppProcess, AppProcessProps } from "../AppProcess";
import { SectionHeader } from "../AppUI/SectionHeader";
import Link from "next/link";

interface AppPageProps extends AppProcessProps {
  onShowPdf?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const AppPage: FC<AppPageProps> = ({ onShowPdf, label }) => {
  const [process, setProcess] = useState<"init" | "selection">();

  const startProcess = () => {
    setProcess("init");
  };

  return (
    <>
      <Header />
      <div className="isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#14a7dc] to-[#cabf27] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-12 py-32 sm:py-48 lg:py-56">
          {process && <AppProcess type={process} />}
          {!process && (
            <>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-8 py-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/30">
                  {label}{" "}
                  <Link
                    href="#"
                    className="font-semibold text-blue-600"
                    onClick={startProcess}
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Adelante <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <SectionHeader
                title="Crea tu plantila de operaciones"
                description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua."
                // onLinkClick={onShowPdf}
              />
            </>
          )}
        </div>
    </>
  );
};

AppPage.defaultProps = {
  label: "Iniciar proceso",
};
